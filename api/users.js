import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (if not already initialized globally)
const app = initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(
            /\\n/g,
           '\n',
        ),
    }),
});

const db = getFirestore(app);

const owner1 = "derekGou";
const repo1 = "omnivim";
const url1 = `https://api.github.com/repos/${owner1}/${repo1}`;

const owner2 = "Omnivim";
const repo2 = "omnivim";
const url2 = `https://api.github.com/repos/${owner2}/${repo2}`;

export default async function handler(req, res) {

    // Verify request origin
  
    if (req.method !== 'GET') {
        return res.status(405).json({ error: `${req.method} not allowed` });
    }
  
    try {
        var currentVal1 = []
        const docRef1 = db.collection('analytics').doc('download');
        await db.runTransaction(async (transaction) => {
            const doc1 = await transaction.get(docRef1);
            if (doc1.exists){
                currentVal1 = doc1?.data()?.val || [];
            }
        });
        console.log(currentVal1)
        currentVal1 = Object.values(currentVal1)
        console.log(currentVal1)
        currentVal1 = currentVal1.reduce((partialSum, a) => partialSum + a, 0);
        console.log(currentVal1)

        const response1 = await fetch(url1);
        if (!response1.ok) throw new Error(`HTTP error! Status: ${response1.status}`);
        const data1 = await response1.json();

        const response2 = await fetch(url2);
        if (!response2.ok) throw new Error(`HTTP error! Status: ${response2.status}`);
        const data2 = await response2.json();
    
        return res.status(200).json({ message: data1.forks_count + data2.forks_count + currentVal1 });
    } catch (error) {
        console.error("Error fetching repo data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}