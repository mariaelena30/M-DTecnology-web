// pages/api/contacts.js
// Guarda cada contacto en Firestore Y manda el aviso por email vía Brevo.
// IMPORTANTE: el remitente (sender) tiene que ser un email verificado en tu
// cuenta de Brevo -- NUNCA el email que escribe el visitante, porque Brevo
// rechaza envíos "desde" direcciones no verificadas (por seguridad anti-spam).
// El email del visitante va en replyTo, así al contestar el aviso le llega a él.

import admin, { db } from '../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // 1. Guardar en Firestore (no bloqueante: si falla, seguimos con el email igual)
  let contactId = null;
  try {
    const docRef = await db.collection('contacts').add({
      name,
      email,
      message,
      status: 'pendiente',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    contactId = docRef.id;
  } catch (dbError) {
    console.error('Error guardando el contacto en Firestore:', dbError);
  }

  // 2. Enviar el email vía Brevo, con remitente FIJO y verificado
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: 'M&D Solutions - Web', email: process.env.ADMIN_EMAIL },
        to: [{ email: process.env.ADMIN_EMAIL, name: 'M&D Solutions' }],
        replyTo: { email: email, name: name },
        subject: `Nuevo mensaje de contacto de ${name}`,
        htmlContent: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong> ${message}</p>`,
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true, message: 'Mensaje enviado con éxito', contactId });
    } else {
      const errorData = await response.json();
      console.error('Error de Brevo:', errorData);
      return res.status(400).json({ success: false, error: errorData, contactId });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message, contactId });
  }
}
