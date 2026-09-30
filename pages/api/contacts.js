// pages/api/contacts.js
// Guarda cada contacto en Firestore Y manda el aviso por email vía Brevo.
// Los nombres de campo coinciden con el formulario real de pages/index.jsx
// (nombre, alojamiento, email, telefono, tipo_negocio, mensaje).

import admin, { db } from '../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { nombre, alojamiento, email, telefono, tipo_negocio, mensaje } = req.body;

  if (!nombre || !alojamiento || !email || !tipo_negocio || !mensaje) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben completarse' });
  }

  // 1. Guardar en Firestore (no bloqueante: si falla, seguimos con el email igual)
  let contactId = null;
  try {
    const docRef = await db.collection('contacts').add({
      nombre,
      alojamiento,
      email,
      telefono: telefono || '',
      tipo_negocio,
      mensaje,
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
        replyTo: { email: email, name: nombre },
        subject: `Nuevo mensaje de contacto de ${nombre} (${alojamiento})`,
        htmlContent: `
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Alojamiento/Empresa:</strong> ${alojamiento}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${telefono || 'No indicado'}</p>
          <p><strong>Tipo de establecimiento:</strong> ${tipo_negocio}</p>
          <p><strong>Mensaje:</strong> ${mensaje}</p>
        `,
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
    console.error('Error al llamar a Brevo:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message, contactId });
  }
}
