
import "dotenv/config";

import {
  initializeApp,
  getApps,
  cert,
} from "firebase-admin/app";

import { getAuth } from "firebase-admin/auth";

// Firebase Service Account
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,

  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

// Validate credentials
if (
  !serviceAccount.projectId ||
  !serviceAccount.clientEmail ||
  !serviceAccount.privateKey
) {
  throw new Error("Firebase Admin credentials are missing");
}

// Initialize Firebase Admin
const firebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(serviceAccount),
    });

// Export Firebase Auth
export const firebaseAdmin = firebaseApp;
export const firebaseAuth = getAuth(firebaseApp);
