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

export default async function handler(req, res) {
    const date = new Date()
    // Verify request origin

    if (req.method != 'POST') {
        return res.status(405).json({ error: `${req.method} not allowed` });
    }

    try {
        const docRef = db.collection('analytics').doc('download');
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            const key = [("0" + date.getFullYear()).slice(-4), ("0" + date.getMonth()).slice(-2), ("0" + date.getDate()).slice(-2)].join("-")
            if (!doc.exists) {
                transaction.set(docRef, { [key]: 1 });
            } else {
                const currentVal = doc?.data()?.[key] || 0;
                transaction.update(docRef, { [key]: currentVal + 1 });
            }
        });

        return res.status(200).json({ message: "Visits incremented successfully" });
    } catch (error) {
        console.error("Error incrementing clicks:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}