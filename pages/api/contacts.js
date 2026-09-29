// api/contacts.js - Endpoint para procesar formularios y guardar en Brevo

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: name, email: email },
        to: [{ email: process.env.ADMIN_EMAIL || 'mdsolutionstecnology@gmail.com', name: 'M&D Solutions' }],
        subject: `Nuevo mensaje de contacto de ${name}`,
        htmlContent: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong> ${message}</p>`,
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true, message: 'Mensaje enviado con éxito' });
    } else {
      const errorData = await response.json();
      return res.status(400).json({ success: false, error: errorData });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
  }
}
