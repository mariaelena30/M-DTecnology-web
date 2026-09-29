import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ loading: false, success: '¡Mensaje enviado con éxito!', error: null });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ loading: false, success: null, error: data.message || 'Error al enviar' });
      }
    } catch (err) {
      setStatus({ loading: false, success: null, error: 'Ocurrió un error inesperado' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Mensaje</label>
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status.loading}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {status.loading ? 'Enviando...' : 'Enviar Mensaje'}
      </button>

      {status.success && <p className="text-green-600 font-medium mt-2">{status.success}</p>}
      {status.error && <p className="text-red-600 font-medium mt-2">{status.error}</p>}
    </form>
  );
}
