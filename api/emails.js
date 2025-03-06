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

  // Verify request origin

  if (req.method !== 'POST') {
      return res.status(405).json({ error: `${req.method} not allowed` });
  }

  try {
    const docRef = db.collection('omnivim').doc('emailList');
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);
      if (!doc.exists) {
        transaction.set(docRef, { val: [req.body] });
      } else {
        const currentVal = doc?.data()?.val || [];
        transaction.update(docRef, { val: [...currentVal, req.body] });
      }
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error adding email:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}