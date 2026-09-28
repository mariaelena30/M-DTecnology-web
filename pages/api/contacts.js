// api/contacts.js - Endpoint para procesar
formularios y guardar en Brevo
export default async function handler(req,
res) {
if (req.method !== 'POST') {
return res.status(405).json({ error:
'Método no permitido' });
}
const { name, email, phone, hotelType,
message } = req.body;
// Validar datos
if (!name || !email || !phone ||
!hotelType || !message) {
return res.status(400).json({ error:
'Faltan datos requeridos' });
}
try {
// 1. GUARDAR CONTACTO EN BREVO (CRM)
const brevoResponse = await
fetch('https://api.brevo.com/v3/contacts',
{
method: 'POST',
headers: {
'accept': 'application/json',
'content-type': 'application/json',
'api-key':
process.env.BREVO_API_KEY
},
body: JSON.stringify({
email: email,
updateEnabled: true,
attributes: {
NOMBRE: name,
TELEFONO: phone,
TIPO_ALOJAMIENTO: hotelType,
MENSAJE: message,
FECHA_CONTACTO: new
Date().toISOString()
}
})
});
if (!brevoResponse.ok) {
console.error('Error guardando en
Brevo:', brevoResponse.statusText);
}
// 2. ENVIAR EMAIL AUTOMÁTICO DE
CONFIRMACIÓN (Resend)
const resendResponse = await
fetch('https://api.resend.com/emails', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer
${process.env.RESEND_API_KEY}`
},
body: JSON.stringify({
from: 'contacto@mdsolutions.tech',
// Cambia a tu dominio
to: email,
subject: '✅ Hemos recibido tu
solicitud - M&D Solutions',
html: `
<div style="font-family: Arial,
sans-serif; max-width: 600px; margin: 0
auto;">
<h2 style="color:
#3b82f6;">¡Hola ${name}!</h2>
<p>Recibimos tu consulta sobre
<strong>${hotelType}</strong>.</p>
<p>Nuestro equipo analizará tu
situación y te contactará en las próximas
<strong>24 horas</strong> por teléfono al
<strong>${phone}</strong>.</p>
<h3 style="color: #3b82f6;
margin-top: 30px;">Lo que dijiste:</h3>
<p style="background-color:
#f3f4f6; padding: 15px; border-radius: 5px;
border-left: 4px solid #3b82f6;">
${message}
</p>
<h3 style="color: #3b82f6;
margin-top: 30px;">Mientras tanto:</h3>
<ul>
<li><a
href="https://wa.me/34657564733?
text=Hola%20tengo%20dudas" style="color:
#3b82f6; text-decoration: none;">💬
Escríbenos por WhatsApp</a></li>
<li><a
href="tel:+34657564733" style="color:
#3b82f6; text-decoration: none;">📞
Llamanos directamente</a></li>
<li>Responde este email si
tienes más preguntas</li>
</ul>
<hr style="margin: 40px 0;
border: none; border-top: 1px solid
#e5e7eb;">
<p style="color: #666; font-
size: 12px;">
M&D Solutions Technology<br>
Tu confort es nuestro
trabajo<br>
<a
href="https://mdsolutions.tech"
style="color: #3b82f6; text-decoration:
none;">www.mdsolutions.tech</a>
</p>
</div>
`
})
});
// 3. ENVIAR NOTIFICACIÓN AL ADMIN (Tu
email)
const adminResponse = await
fetch('https://api.resend.com/emails', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer
${process.env.RESEND_API_KEY}`
},
body: JSON.stringify({
from: 'contacto@mdsolutions.tech',
to: process.env.ADMIN_EMAIL, // Tu
email: mdsolutionstecnology@gmail.com
subject: `🔔 NUEVO CONTACTO:
${name} - ${hotelType}`,
html: `
<div style="font-family: Arial,
sans-serif;">
<h2 style="color: #3b82f6;">📩
Nuevo contacto desde la web</h2>
<p><strong>Nombre:</strong>
${name}</p>
<p><strong>Email:</strong> <a
href="mailto:${email}">${email}</a></p>
<p><strong>Teléfono:</strong>
<a href="tel:${phone}">${phone}</a></p>
<p><strong>Tipo alojamiento:
</strong> ${hotelType}</p>
<h3>Mensaje:</h3>
<p style="background-color:
#f3f4f6; padding: 15px; border-radius: 5px;
border-left: 4px solid #3b82f6;">
${message.replace(/\n/g,
'<br>')}
</p>
<p style="margin-top: 30px;">
✅ <strong>Acciones
recomendadas:</strong><br>
1. Llamar por teléfono
ASAP<br>
2. Verificar en dashboard de
Brevo<br>
3. Proponer reunión por
Calendly si es necesario
</p>
<hr style="margin: 30px 0;
border: none; border-top: 1px solid
#e5e7eb;">
<a
href="https://app.brevo.com/"
style="background-color: #3b82f6; color:
white; padding: 10px 20px; border-radius:
5px; text-decoration: none; display:
inline-block;">
Ver en Brevo CRM
</a>
</div>
`
})
});
return res.status(200).json({
success: true,
message: 'Contacto registrado
correctamente',
data: { name, email, hotelType }
});
} catch (error) {
console.error('Error procesando
contacto:', error);
return res.status(500).json({
error: 'Error al procesar la
solicitud',
details: error.message
});
}
}
