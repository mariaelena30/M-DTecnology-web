import React, { useState } from 'react';
import axios from 'axios';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hotelType: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Enviar a tu backend (que lo procesará con Brevo)
      const response = await axios.post('/api/contacts', {
        ...formData,
        timestamp: new Date().toISOString()
      });

      if (response.status === 200) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          hotelType: '',
          message: ''
        });
        
        // Limpiar mensaje de éxito después de 5 segundos
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      setError('Error al enviar. Por favor intenta de nuevo o contacta por WhatsApp');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 p-8 rounded-lg">
      {success ? (
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h4 className="text-2xl font-bold mb-2 text-green-400">¡Solicitud enviada!</h4>
          <p className="text-gray-300">
            Recibimos tu consulta. Te contactaremos en las próximas 24 horas por email y teléfono.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Nombre *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-blue-500/30 rounded px-4 py-3 focus:outline-none focus:border-blue-400"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-blue-500/30 rounded px-4 py-3 focus:outline-none focus:border-blue-400"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Teléfono *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-blue-500/30 rounded px-4 py-3 focus:outline-none focus:border-blue-400"
                placeholder="+34 XXX XXX XXX"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Tipo de alojamiento *</label>
              <select
                name="hotelType"
                value={formData.hotelType}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-blue-500/30 rounded px-4 py-3 focus:outline-none focus:border-blue-400"
              >
                <option value="">Selecciona una opción</option>
                <option value="hotel">Hotel</option>
                <option value="hotel_rural">Hotel rural</option>
                <option value="casa_rural">Casa rural</option>
                <option value="apartamento">Apartamento turístico</option>
                <option value="hostal">Hostal</option>
                <option value="camping">Camping</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">¿Qué querés mejorar? *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full bg-slate-800 border border-blue-500/30 rounded px-4 py-3 focus:outline-none focus:border-blue-400 resize-none"
              placeholder="Cuéntanos tu situación actual y qué necesitas..."
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded">
              {error}
            </div>
          )}

          <div className="text-sm text-gray-400">
            Al enviar este formulario aceptás que usemos tus datos únicamente para responder a tu consulta.
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-4 rounded font-bold transition transform hover:scale-105"
          >
            {loading ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      )}
    </div>
  );
}
