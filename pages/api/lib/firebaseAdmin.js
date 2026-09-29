// lib/firebaseAdmin.js
// Inicializa Firebase Admin UNA sola vez, usando variables de entorno.
// Nunca pongas la clave privada directamente en este archivo ni en el repo.

import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // La clave privada llega con "\n" como texto literal (2 caracteres:
      // barra invertida + n). Hay que convertirlos en saltos de línea reales
      // para que la librería pueda leer la clave correctamente.
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
  });
}

export const db = admin.firestore();
export default admin;
