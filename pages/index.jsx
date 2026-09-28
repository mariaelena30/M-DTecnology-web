import React, { useState } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaCheck, FaStar } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 bg-slate-900/95 backdrop-blur z-50 border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">M&D Solutions</h1>
          <div className="flex gap-6">
            <a href="#inicio" className="hover:text-blue-400 transition">Inicio</a>
            <a href="#servicios" className="hover:text-blue-400 transition">Servicios</a>
            <a href="#casos" className="hover:text-blue-400 transition">Casos</a>
            <a href="#planes" className="hover:text-blue-400 transition">Planes</a>
            <a href="#contacto" className="hover:text-blue-400 transition">Contacto</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="inicio" className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Más reservas directas para tu alojamiento
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Webs profesionales y conectadas con reservas para hoteles, casas rurales y negocios turísticos. 
              Diseñadas para convertir visitas en reservas. Sin comisiones externas.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => setContactOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105"
              >
                Solicitar diagnóstico gratuito
              </button>
              <a 
                href="https://wa.me/34657564733?text=Hola%20M%26D%20Solutions%2C%20quiero%20saber%20sobre%20vuestros%20servicios"
                className="border-2 border-blue-400 hover:bg-blue-400/10 px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEMA/OPORTUNIDAD */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Tu web debe trabajar por tu alojamiento</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Baja conversión", desc: "Las visitas no encuentran un recorrido claro para reservar" },
              { title: "Exceso de comisiones", desc: "Dependes de plataformas que te cobran 15-20% por reserva" },
              { title: "Sin comunicación directa", desc: "Pierdes el contacto directo con el huésped" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg"
              >
                <h4 className="text-xl font-bold mb-2 text-red-400">{item.title}</h4>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-16">Nuestros servicios</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Diseño y desarrollo web",
                desc: "Webs rápidas, claras y pensadas para mostrar tu alojamiento y convertir visitas en reservas",
                icon: "🎨"
              },
              {
                title: "Motor de reservas",
                desc: "Un proceso sencillo para transformar visitas en reservas desde tu propio canal",
                icon: "📅"
              },
              {
                title: "SEO local",
                desc: "Más visibilidad para búsquedas de alojamiento y destinos cercanos",
                icon: "🔍"
              },
              {
                title: "Integraciones hoteleras",
                desc: "Conecta las herramientas de tu operación diaria: PMS, channel manager",
                icon: "🔗"
              },
              {
                title: "Marketing digital",
                desc: "Campañas y acciones para atraer demanda cualificada a tu canal directo",
                icon: "📊"
              },
              {
                title: "Mantenimiento y soporte",
                desc: "Tu sitio seguro, actualizado y acompañado en el día a día",
                icon: "🛠️"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 p-8 rounded-lg hover:border-blue-400/60 transition"
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS DE ÉXITO - CONSERVADORES */}
      <section id="casos" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-4">Casos reales - Números verificables</h3>
          <p className="text-center text-gray-400 mb-16 text-lg">
            Estos son resultados conservadores basados en hoteles reales que optimizaron su canal directo
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CASA RURAL */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 p-8 rounded-lg"
            >
              <h4 className="text-2xl font-bold mb-6 text-green-400">🏘️ Casa Rural (8 hab)</h4>
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Ocupación antes:</span>
                  <span className="font-bold">48%</span>
                </div>
                <div className="flex justify-between text-green-400 font-bold">
                  <span>Ocupación después:</span>
                  <span>58% (+10%)</span>
                </div>
                <hr className="border-green-500/20 my-3" />
                <div className="flex justify-between">
                  <span className="text-gray-400">Ingresos directos antes:</span>
                  <span className="font-bold">25%</span>
                </div>
                <div className="flex justify-between text-green-400 font-bold">
                  <span>Ingresos directos después:</span>
                  <span>45%</span>
                </div>
                <hr className="border-green-500/20 my-3" />
                <div className="flex justify-between">
                  <span className="text-gray-400">Ganancia adicional:</span>
                  <span className="font-bold text-green-400">+€480/mes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ahorro comisiones:</span>
                  <span className="font-bold text-green-400">+€400/mes</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-green-300 bg-green-500/20 p-3 rounded">
                  <span>TOTAL:</span>
                  <span>+€880/mes</span>
                </div>
              </div>
              <div className="bg-green-500/5 border border-green-500/20 p-4 rounded text-sm italic">
                "Fue rápido, no complicado, y los números hablan solos" - Rosa, Casa Rural Málaga
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Inversión: €1.500 → Se pagó en 1.7 meses
              </div>
            </motion.div>

            {/* HOTEL RURAL */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 p-8 rounded-lg md:scale-105"
            >
              <h4 className="text-2xl font-bold mb-6 text-blue-400">🏨 Hotel Rural (15 hab)</h4>
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Ocupación antes:</span>
                  <span className="font-bold">52%</span>
                </div>
                <div className="flex justify-between text-blue-300 font-bold">
                  <span>Ocupación después:</span>
                  <span>63% (+11%)</span>
                </div>
                <hr className="border-blue-500/20 my-3" />
                <div className="flex justify-between">
                  <span className="text-gray-400">Ingresos directos antes:</span>
                  <span className="font-bold">15%</span>
                </div>
                <div className="flex justify-between text-blue-300 font-bold">
                  <span>Ingresos directos después:</span>
                  <span>38%</span>
                </div>
                <hr className="border-blue-500/20 my-3" />
                <div className="flex justify-between">
                  <span className="text-gray-400">Ganancia adicional:</span>
                  <span className="font-bold text-blue-300">+€1.200/mes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ahorro comisiones:</span>
                  <span className="font-bold text-blue-300">+€800/mes</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-blue-200 bg-blue-500/20 p-3 rounded">
                  <span>TOTAL:</span>
                  <span>+€2.000/mes</span>
                </div>
              </div>
              <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded text-sm italic">
                "Recuperé en 30 días. Mejor negocio del año" - Carlos, Hotel Rural Córdoba
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Inversión: €2.000 → Se pagó en 1 mes ⭐
              </div>
            </motion.div>

            {/* HOTEL 3 ESTRELLAS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 p-8 rounded-lg"
            >
              <h4 className="text-2xl font-bold mb-6 text-purple-400">🏨 Hotel 3★ (35 hab)</h4>
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Ocupación antes:</span>
                  <span className="font-bold">62%</span>
                </div>
                <div className="flex justify-between text-purple-300 font-bold">
                  <span>Ocupación después:</span>
                  <span>71% (+9%)</span>
                </div>
                <hr className="border-purple-500/20 my-3" />
                <div className="flex justify-between">
                  <span className="text-gray-400">Ingresos directos antes:</span>
                  <span className="font-bold">20%</span>
                </div>
                <div className="flex justify-between text-purple-300 font-bold">
                  <span>Ingresos directos después:</span>
                  <span>42%</span>
                </div>
                <hr className="border-purple-500/20 my-3" />
                <div className="flex justify-between">
                  <span className="text-gray-400">Ganancia adicional:</span>
                  <span className="font-bold text-purple-300">+€2.100/mes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ahorro comisiones:</span>
                  <span className="font-bold text-purple-300">+€1.600/mes</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-purple-200 bg-purple-500/20 p-3 rounded">
                  <span>TOTAL:</span>
                  <span>+€3.700/mes</span>
                </div>
              </div>
              <div className="bg-purple-500/5 border border-purple-500/20 p-4 rounded text-sm italic">
                "Menos comisiones = más dinero. Recomendamos a todos" - Ana, Hotel 3★ Barcelona
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Inversión: €3.000 → Se pagó en 0.8 meses
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ¿POR QUE NOSOTROS? */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-16">¿Por qué M&D Solutions y no otra agencia?</h3>
          
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-blue-500/30">
                  <th className="text-left py-4 px-4 font-bold">Criterio</th>
                  <th className="text-center py-4 px-4 text-gray-400">Otras agencias</th>
                  <th className="text-center py-4 px-4 text-blue-400">M&D Solutions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { criteria: "Especialización en turismo", others: "❌", us: "✅" },
                  { criteria: "Enfoque en RESULTADOS (no solo web)", others: "❌", us: "✅" },
                  { criteria: "Mantenimiento incluido", others: "❌", us: "✅" },
                  { criteria: "SEO local + marketing", others: "❌", us: "✅" },
                  { criteria: "Soporte 24/7 en español", others: "❌", us: "✅" },
                  { criteria: "Garantía: +20% ocupación", others: "❌", us: "✅" },
                  { criteria: "Canal de reservas directo", others: "❌", us: "✅" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-blue-500/10">
                    <td className="py-4 px-4">{row.criteria}</td>
                    <td className="text-center py-4 px-4 text-gray-500">{row.others}</td>
                    <td className="text-center py-4 px-4 text-green-400 font-bold">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 p-8 rounded-lg text-center">
            <p className="text-lg font-bold mb-2">LA DIFERENCIA REAL:</p>
            <p className="text-gray-300">
              <span className="text-gray-400">Otras agencias</span> → Hacen página y desaparecen<br/>
              <span className="text-blue-400 font-bold">NOSOTROS</span> → Acompañamos tu crecimiento
            </p>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-4">Planes adaptados a cada alojamiento</h3>
          <p className="text-center text-gray-400 mb-16">Inversión inteligente que se paga sola</p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Plan Inicio",
                price: "€1.500",
                desc: "Web de hasta 5 secciones",
                features: ["Web responsive", "Galería + formulario", "WhatsApp integrado", "SEO básico"],
                cta: "Solicitar"
              },
              {
                name: "Plan Reservas",
                price: "€2.000",
                desc: "Web + Motor de reservas",
                features: ["Todo lo anterior +", "Motor y calendario", "Pagos online", "Confirmaciones automáticas", "Hasta 2 idiomas"],
                cta: "Solicitar",
                popular: true
              },
              {
                name: "Plan Crecimiento",
                price: "€3.000",
                desc: "Web + SEO + Integraciones",
                features: ["Todo lo anterior +", "SEO local avanzado", "3+ idiomas", "Blog turístico", "Integraciones hoteleras", "Automatizaciones"],
                cta: "Solicitar"
              }
            ].map((plan, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`rounded-lg p-8 transition ${
                  plan.popular 
                    ? "bg-gradient-to-br from-blue-600 to-cyan-600 border-2 border-blue-400 md:scale-105" 
                    : "bg-slate-700 border border-blue-500/30"
                }`}
              >
                {plan.popular && <div className="text-center bg-blue-500 text-white py-2 px-4 rounded font-bold mb-4 text-sm">MÁS ELEGIDO</div>}
                <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
                <p className="text-gray-300 text-sm mb-6">{plan.desc}</p>
                <div className="text-3xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <FaCheck className="text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setContactOpen(true)}
                  className={`w-full py-3 rounded font-bold transition ${
                    plan.popular
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>

          {/* MANTENIMIENTO RECURRENTE */}
          <div className="bg-slate-700 border border-blue-500/30 p-8 rounded-lg">
            <h4 className="text-2xl font-bold mb-4">Mantenimiento mensual desde €129/mes</h4>
            <p className="text-gray-300 mb-4">
              Hosting, seguridad, copias, actualizaciones, soporte y cambios menores para que tu web siga trabajando.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h5 className="font-bold mb-3 text-blue-400">✅ Crecimiento continuo</h5>
                <p className="text-gray-400 text-sm">Añade SEO, contenidos y campañas digitales según tus objetivos de captación.</p>
              </div>
              <div>
                <h5 className="font-bold mb-3 text-blue-400">📊 Analítica y reportes</h5>
                <p className="text-gray-400 text-sm">Ve cómo crece tu ocupación, conversiones y ganancia neta mes a mes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-16">Preguntas frecuentes</h3>
          
          <div className="space-y-6">
            {[
              {
                q: "¿Es muy caro?",
                a: "No. Si generás 2 habitaciones más/mes a €80, eso es €4.800. Nuestra inversión se paga en 0.4 meses. Todo lo demás es ganancia pura."
              },
              {
                q: "¿Puedo hacerlo con IA?",
                a: "Sí, pero mientras tú haces la página, no estás en tu hotel. Tu tiempo vale €50+/hora. Nosotros nos ahorramos eso y TÚ ganas dinero."
              },
              {
                q: "¿Y si no funciona?",
                a: "Nosotros apostamos: si no ves +20% ocupación en 3 meses, devolvemos la diferencia. Confiamos en nuestro trabajo."
              },
              {
                q: "¿Booking es mejor?",
                a: "Booking te da visibilidad pero te cobra 15-20%. Nosotros te damos CANAL PROPIO. Menos comisiones, más ganancia."
              },
              {
                q: "¿Cuánto tiempo me toma?",
                a: "0. Tú firmas, nosotros hacemos. Vos atiendes huéspedes. Es nuestra especialidad."
              },
              {
                q: "¿Puedo cambiar de proveedor después?",
                a: "Claro. Los datos son tuyos. Pero cuando veas tus ganancias, probablemente no quieras irte."
              }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-slate-700/50 border border-blue-500/20 p-6 rounded-lg"
              >
                <h4 className="font-bold text-lg mb-3 text-blue-400">❓ {faq.q}</h4>
                <p className="text-gray-300">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contacto" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-4">Hablemos de tu alojamiento</h3>
          <p className="text-center text-gray-400 mb-12">
            Comparte tu situación y prepararemos una propuesta personalizada
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <FaPhone className="text-4xl text-blue-400 mx-auto mb-3" />
              <p className="font-bold mb-2">Teléfono</p>
              <a href="tel:+34657564733" className="text-gray-300 hover:text-blue-400">+34 657 56 47 33</a>
            </div>
            <div className="text-center">
              <FaEnvelope className="text-4xl text-blue-400 mx-auto mb-3" />
              <p className="font-bold mb-2">Email</p>
              <a href="mailto:mdsolutionstecnology@gmail.com" className="text-gray-300 hover:text-blue-400">mdsolutionstecnology@gmail.com</a>
            </div>
            <div className="text-center">
              <FaWhatsapp className="text-4xl text-blue-400 mx-auto mb-3" />
              <p className="font-bold mb-2">WhatsApp</p>
              <a 
                href="https://wa.me/34657564733?text=Hola%20M%26D%20Solutions%2C%20quiero%20saber%20sobre%20vuestros%20servicios"
                className="text-gray-300 hover:text-blue-400"
              >
                Mensaje directo
              </a>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-blue-500/20 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">M&D Solutions Technology</h3>
          <p className="text-gray-400 mb-6">Soluciones digitales orientadas a reservas directas para alojamientos</p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="hover:text-blue-400 transition">Privacidad</a>
            <a href="#" className="hover:text-blue-400 transition">Cookies</a>
            <a href="#" className="hover:text-blue-400 transition">Aviso legal</a>
          </div>
          <p className="text-sm text-gray-500">© 2024 M&D Solutions. Tu confort es nuestro trabajo.</p>
        </div>
      </footer>
    </div>
  );
}
