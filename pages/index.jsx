import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  // Estado para el menú mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulador interactivo del Hero
  const [roomCount, setRoomCount] = useState('11-50');

  // Estado para el filtro de módulos
  const [moduleFilter, setModuleFilter] = useState('todos');

  // Estados para acordeones de Módulos y FAQ
  const [openModules, setOpenModules] = useState({});
  const [openFaqs, setOpenFaqs] = useState({});

  // Estado del Carrusel de imágenes
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Formulario de contacto
  const [formData, setFormData] = useState({
    nombre: '',
    alojamiento: '',
    email: '',
    telefono: '',
    tipo_negocio: '',
    mensaje: ''
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  // Galería de imágenes
  const gallerySlides = [
    { id: 1, label: 'Reservas', tagBg: 'rgb(22, 37, 42)', tagColor: 'rgb(37, 214, 232)', img: 'https://images.pexels.com/photos/5371683/pexels-photo-5371683.jpeg', alt: 'Recepción de hotel' },
    { id: 2, label: 'Habitaciones', tagBg: 'rgb(37, 37, 26)', tagColor: 'rgb(197, 243, 76)', img: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Habitación moderna' },
    { id: 3, label: 'Experiencias', tagBg: 'rgb(42, 33, 69)', tagColor: 'rgb(203, 183, 255)', img: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Piscina rooftop' },
    { id: 4, label: 'Servicios', tagBg: 'rgb(42, 29, 28)', tagColor: 'rgb(255, 156, 141)', img: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Restaurante' },
    { id: 5, label: 'Bienestar', tagBg: 'rgb(22, 37, 42)', tagColor: 'rgb(37, 214, 232)', img: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=800', alt: 'Spa' }
  ];

  // Datos para la grilla filtrable de Módulos ERP
  const modulesData = [
    { id: 'm1', category: 'recepcion', icon: '💻', title: 'Reservas y CRM', text: 'La recepción se transforma en una vista clara de llegadas, estancias y conversaciones.', detail: 'Conecta el recorrido de consulta, reserva y bienvenida sin perder el contexto de cada estancia.', color: '#25d6e8' },
    { id: 'm2', category: 'housekeeping', icon: '🔌', title: 'Habitaciones y housekeeping', text: 'Estados de habitación, preparación y coordinación visual para el equipo de limpieza.', detail: 'Una lectura compartida para que recepción y housekeeping trabajen sobre la misma escena operativa.', color: '#c5f34c' },
    { id: 'm3', category: 'facturacion', icon: '🧾', title: 'Facturación y servicios', text: 'Relaciona consumos, experiencias y servicios del hotel con una gestión más ordenada.', detail: 'Restaurante, bar, spa o experiencias aparecen como parte natural de la estancia del huésped.', color: '#ff765e' },
    { id: 'm4', category: 'operaciones', icon: '📊', title: 'Analítica y operaciones', text: 'Una lectura conceptual de ocupación, actividad y coordinación para detectar el ritmo.', detail: 'Organiza señales operativas para que el equipo pueda decidir con contexto.', color: '#9a6cff' }
  ];

  // Autoplay para el carrusel
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % gallerySlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, gallerySlides.length]);

  // Handlers para acordeones
  const toggleModule = (id) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFaq = (id) => {
    setOpenFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Handler de formulario
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

      if (res.ok) {
        setStatus({ loading: false, success: 'Gracias. Tu solicitud se ha enviado correctamente.', error: null });
        setFormData({ nombre: '', alojamiento: '', email: '', telefono: '', tipo_negocio: '', mensaje: '' });
      } else {
        setStatus({ loading: false, success: null, error: 'No pudimos confirmar el envío. Inténtalo nuevamente.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: null, error: 'Error al procesar la solicitud.' });
    }
  };

  const filteredModules = moduleFilter === 'todos' 
    ? modulesData 
    : modulesData.filter(m => m.category === moduleFilter);

  return (
    <div className="w-full overflow-x-hidden bg-[#0a0c10] text-[#f6f8fb] font-sans selection:bg-[#25d6e8] selection:text-[#071014]">
      <Head>
        <title>M&D Solutions Technology | Soluciones Digitales para Turismo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Work+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Línea de acento animada superior */}
      <div className="h-1 w-full bg-gradient-to-r from-[#25d6e8] via-[#9a6cff] via-[#ff765e] to-[#c5f34c] bg-[length:200%_100%] animate-pulse"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#34404e] bg-[#0a0c10]/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a href="#inicio" className="rounded focus:outline-none focus:ring-2 focus:ring-[#c5f34c]">
            <span className="font-extrabold text-[#f6f8fb] hover:text-[#25d6e8] transition-colors">
              M&D Solutions Technology
            </span>
          </a>

          <div className="hidden items-center gap-6 md:flex text-sm font-semibold text-slate-300">
            <a href="#inicio" className="hover:text-[#25d6e8] transition-colors">Inicio</a>
            <a href="#plataforma" className="hover:text-[#25d6e8] transition-colors">Plataforma</a>
            <a href="#modulos" className="hover:text-[#25d6e8] transition-colors">Módulos</a>
            <a href="#compromiso" className="hover:text-[#25d6e8] transition-colors">Compromiso</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contacto"
              className="hidden sm:block rounded-full bg-[#25d6e8] px-4 py-2 text-sm font-bold text-[#071014] hover:bg-[#1fbecf] transition-all"
            >
              Solicitar diagnóstico
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 md:hidden text-white text-xl"
            >
              ☰
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="border-t border-[#34404e] bg-[#12161d] px-5 py-5 md:hidden flex flex-col gap-4 text-sm font-semibold">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
            <a href="#plataforma" onClick={() => setMobileMenuOpen(false)}>Plataforma</a>
            <a href="#modulos" onClick={() => setMobileMenuOpen(false)}>Módulos</a>
            <a href="#compromiso" onClick={() => setMobileMenuOpen(false)}>Compromiso</a>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>Contacto</a>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section + Simulador Interactivo */}
        <section id="inicio" className="relative isolate overflow-hidden border-b border-[#34404e] py-12">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[.92fr_1.08fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#25d6e8]">
                ERP HOTELERO · OPERACIÓN CONECTADA
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl text-[#f6f8fb]">
                La operación de tu hotel, en una sola escena.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-7 text-[#c7d0da]">
                Una plataforma ERP pensada para hoteles, resorts, hostales y alojamientos que quieren coordinar cada momento del huésped sin perder la visión vanguardista.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contacto"
                  className="rounded-full bg-[#ff765e] px-6 py-3 text-center font-bold text-[#17100e] hover:opacity-90 transition-opacity"
                >
                  Solicitar diagnóstico gratuito
                </a>
                <a
                  href="#modulos"
                  className="rounded-full border border-[#51606e] bg-[#181e27] px-6 py-3 text-center font-bold text-[#f6f8fb] hover:bg-[#202834] transition-colors"
                >
                  Explorar módulos
                </a>
              </div>

              <div className="mt-9 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#25d6e8]/30 bg-[#16252a] px-3 py-2 text-sm font-bold text-[#25d6e8]">Reservas</span>
                <span className="rounded-full border border-[#c5f34c]/30 bg-[#25251a] px-3 py-2 text-sm font-bold text-[#c5f34c]">Habitaciones</span>
                <span className="rounded-full border border-[#ff9c8d]/30 bg-[#2a1d1c] px-3 py-2 text-sm font-bold text-[#ff9c8d]">Operaciones</span>
              </div>
            </div>

            {/* Simulador de Diagnóstico Interactivo */}
            <div className="relative bg-[#181e27] border border-[#34404e] rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-[#34404e] pb-4">
                  <span className="font-bold text-white text-base">Simulador Operativo en Vivo</span>
                  <span className="h-3 w-3 rounded-full bg-[#c5f34c] shadow-[0_0_12px_#c5f34c]"></span>
                </div>

                <p className="mt-4 text-xs font-semibold text-[#a9b5c3] uppercase tracking-wider">
                  ¿Cuántas habitaciones gestionás?
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {['1-10', '11-50', '50+'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setRoomCount(range)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        roomCount === range
                          ? 'bg-[#25d6e8] text-[#071014] border-[#25d6e8]'
                          : 'bg-[#0e131a] text-slate-300 border-[#34404e] hover:border-[#25d6e8]'
                      }`}
                    >
                      {range} hab.
                    </button>
                  ))}
                </div>

                <div className="mt-6 border-t border-[#34404e] pt-4">
                  <p className="text-xs font-bold text-[#25d6e8] uppercase">Módulos sugeridos para tu escala:</p>
                  <ul className="mt-2 space-y-1 text-sm text-[#f6f8fb]">
                    <li className="flex items-center gap-2">✔ Recepción y CRM de reservas</li>
                    <li className="flex items-center gap-2">✔ Housekeeping y estado de habitaciones</li>
                    {roomCount !== '1-10' && <li className="flex items-center gap-2 text-[#c5f34c]">✔ Facturación y consumos unificados</li>}
                    {roomCount === '50+' && <li className="flex items-center gap-2 text-[#9a6cff]">✔ Analítica avanzada multi-propiedad</li>}
                  </ul>
                </div>
              </div>

              <div className="mt-6 border border-[#34404e] bg-[#0e131a] p-3 rounded-lg text-xs flex justify-between items-center">
                <span className="text-[#a9b5c3]">Ahorro estimado de gestión:</span>
                <span className="font-bold text-[#c5f34c]">
                  {roomCount === '1-10' ? '~8 hs / semana' : roomCount === '11-50' ? '~18 hs / semana' : '~35 hs / semana'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Galería Carrusel Dinámica */}
        <section className="border-b border-[#34404e] bg-[#0a0c10] py-14">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-5 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#25d6e8]">EL HOTEL EN MOVIMIENTO</p>
                <h2 className="mt-2 text-3xl font-extrabold text-[#f6f8fb]">Cada módulo nace de una escena real de hospitalidad.</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setGalleryIndex((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length)}
                  className="rounded-full border border-[#475565] p-3 text-white hover:bg-[#181e27]"
                >
                  ←
                </button>
                <button
                  onClick={() => setIsAutoplay(!isAutoplay)}
                  className="rounded-full border border-[#475565] p-3 text-white hover:bg-[#181e27]"
                >
                  {isAutoplay ? '⏸' : '▶'}
                </button>
                <button
                  onClick={() => setGalleryIndex((prev) => (prev + 1) % gallerySlides.length)}
                  className="rounded-full border border-[#475565] p-3 text-white hover:bg-[#181e27]"
                >
                  →
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden border border-[#40505f] bg-[#181e27] rounded-xl h-72 sm:h-96">
              <img
                src={gallerySlides[galleryIndex].img}
                alt={gallerySlides[galleryIndex].alt}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <span
                className="absolute top-4 left-4 px-3 py-1 rounded text-sm font-bold shadow-md"
                style={{ backgroundColor: gallerySlides[galleryIndex].tagBg, color: gallerySlides[galleryIndex].tagColor }}
              >
                {gallerySlides[galleryIndex].label}
              </span>
            </div>

            <div className="mt-4 flex gap-2 justify-center">
              {gallerySlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setGalleryIndex(idx)}
                  className={`h-2 rounded-full transition-all ${idx === galleryIndex ? 'w-8 bg-[#25d6e8]' : 'w-2 bg-[#56616f]'}`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de Módulos ERP con Filtro por Pestañas */}
        <section id="modulos" className="bg-[#12161d] py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#ff9c8d]">MÓDULOS ERP</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-[#f6f8fb]">Tecnología hotelera conectada a cada espacio.</h2>

            {/* Pestañas de Filtro */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { key: 'todos', label: 'Todos' },
                { key: 'recepcion', label: 'Recepción' },
                { key: 'housekeeping', label: 'Housekeeping' },
                { key: 'facturacion', label: 'Facturación' },
                { key: 'operaciones', label: 'Operaciones' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setModuleFilter(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    moduleFilter === tab.key
                      ? 'bg-[#25d6e8] text-[#071014]'
                      : 'bg-[#181e27] text-slate-300 border border-[#34404e] hover:border-[#25d6e8]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {filteredModules.map((m) => (
                <article key={m.id} className="border border-[#34404e] bg-[#181e27] p-6 rounded-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{m.icon}</span>
                      <h3 className="text-xl font-bold text-white">{m.title}</h3>
                    </div>
                    <button
                      onClick={() => toggleModule(m.id)}
                      className="text-2xl font-bold transition-transform"
                      style={{ color: m.color }}
                    >
                      {openModules[m.id] ? '−' : '+'}
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-[#a9b5c3]">{m.text}</p>
                  {openModules[m.id] && (
                    <p className="mt-4 pt-4 border-t border-[#34404e] text-sm text-[#c7d0da]">{m.detail}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Acordeón */}
        <section id="preguntas" className="bg-[#12161d] py-16 border-t border-[#34404e]">
          <div className="mx-auto max-w-4xl px-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#25d6e8] text-center">PREGUNTAS FRECUENTES</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#f6f8fb] text-center">Claridad para elegir la siguiente evolución de tu hotel.</h2>

            <div className="mt-8 space-y-3">
              {[
                { id: 'q1', q: '¿Está pensada solo para hoteles grandes?', a: 'La propuesta contempla hoteles, resorts, hostales, apartamentos turísticos y otros alojamientos.' },
                { id: 'q2', q: '¿Qué áreas conecta la plataforma?', a: 'Conecta reservas, huéspedes, habitaciones, housekeeping, servicios, facturación y operación.' },
                { id: 'q3', q: '¿Cómo empieza una implementación?', a: 'Se comienza con un diagnóstico de la operación actual, los canales utilizados y los puntos a mejorar.' },
              ].map((faq) => (
                <article key={faq.id} className="border border-[#34404e] bg-[#181e27] p-5 rounded-lg">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="flex w-full items-center justify-between text-left font-bold text-white"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#25d6e8] text-xl">{openFaqs[faq.id] ? '−' : '+'}</span>
                  </button>
                  {openFaqs[faq.id] && (
                    <p className="mt-3 pt-3 border-t border-[#34404e] text-sm text-[#a9b5c3]">{faq.a}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de Compromiso y Garantía Operativa */}
        <section id="compromiso" className="bg-[#0a0c10] py-16 border-t border-[#34404e]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[#c5f34c]">NUESTRO COMPROMISO OPERATIVO</p>
              <h2 className="mt-2 text-3xl font-extrabold text-white">Garantías de nivel profesional para tu alojamiento.</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-[#181e27] border border-[#34404e] p-6 rounded-xl">
                <span className="text-3xl mb-4 block">🔒</span>
                <h3 className="text-xl font-bold text-[#25d6e8] mb-2">Confidencialidad y Protección 100%</h3>
                <p className="text-sm text-[#a9b5c3] leading-relaxed">
                  Todos tus datos operativos, reservas e información de huéspedes están protegidos bajo estrictos protocolos de cifrado y acuerdos de confidencialidad (NDA).
                </p>
              </div>

              <div className="bg-[#181e27] border border-[#34404e] p-6 rounded-xl">
                <span className="text-3xl mb-4 block">🛠️</span>
                <h3 className="text-xl font-bold text-[#c5f34c] mb-2">Soporte Técnico Integrado 24/7</h3>
                <p className="text-sm text-[#a9b5c3] leading-relaxed">
                  Un equipo técnico especializado activo las 24 horas del día, los 7 días de la semana, para garantizar que tu operación y tus canales jamás se detengan.
                </p>
              </div>

              <div className="bg-[#181e27] border border-[#34404e] p-6 rounded-xl">
                <span className="text-3xl mb-4 block">⚡</span>
                <h3 className="text-xl font-bold text-[#ff765e] mb-2">Respuestas & Mensajes Automatizados</h3>
                <p className="text-sm text-[#a9b5c3] leading-relaxed">
                  Agiliza la atención enviando confirmaciones de reserva, datos de check-in e información clave por WhatsApp y Email sin intervención manual constante.
                </p>
              </div>

              <div className="bg-[#181e27] border border-[#34404e] p-6 rounded-xl">
                <span className="text-3xl mb-4 block">📈</span>
                <h3 className="text-xl font-bold text-[#9a6cff] mb-2">Escalabilidad de Software a Medida</h3>
                <p className="text-sm text-[#a9b5c3] leading-relaxed">
                  Diseñado para crecer con vos: desde una propiedad hasta redes multi-alojamiento, sin perder rendimiento ni requerir migraciones complejas.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-[#181e27] border border-[#34404e] p-6 rounded-xl text-center">
              <span className="text-3xl mb-2 block">🧠</span>
              <h3 className="text-xl font-bold text-white mb-2">Organización Personal & Centralización Operativa</h3>
              <p className="text-sm text-[#a9b5c3] max-w-3xl mx-auto leading-relaxed">
                Despejá tu cabeza y centralizá tareas, turnos del personal y pendientes en un solo tablero visual. Ordená tu rutina diaria y mantené el control total de tu negocio sin depender de anotaciones o planillas dispersas.
              </p>
            </div>
          </div>
        </section>

        {/* Sección de Contacto */}
        <section id="contacto" className="bg-[#12161d] py-16 border-t border-[#34404e]">
          <div className="mx-auto grid max-w-7xl gap-9 px-5 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#25d6e8]">CONTACTO DIRECTO</p>
              <h2 className="mt-4 text-3xl font-extrabold text-[#f6f8fb]">Hablemos de tu próxima estancia operativa.</h2>
              <p className="mt-4 text-sm text-[#a9b5c3]">Comparte el contexto de tu hotel o alojamiento. Te ayudaremos a identificar una dirección digital adecuada.</p>

              <div className="mt-6 space-y-3 bg-[#181e27] border border-[#34404e] p-5 rounded-xl">
                <p className="text-sm text-white font-bold">Atención Personalizada:</p>
                <p className="text-sm text-[#25d6e8]">📞 Daniel: <span className="text-white font-mono">34647564733</span></p>
                <p className="text-sm text-[#c5f34c]">📞 María Elena Álvarez: <span className="text-white font-mono">3625391283</span></p>
                <p className="text-sm text-[#ff765e]">✉️ Email: <span className="text-white font-mono">mdsolutionstecnology@gmail.com</span></p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="border border-[#40505f] bg-[#181e27] p-6 sm:p-8 rounded-xl flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold text-white">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0e131a] border border-[#40505f] p-3 rounded text-white focus:outline-none focus:border-[#25d6e8]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold text-white">Alojamiento o empresa</label>
                  <input
                    type="text"
                    name="alojamiento"
                    value={formData.alojamiento}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0e131a] border border-[#40505f] p-3 rounded text-white focus:outline-none focus:border-[#25d6e8]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold text-white">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0e131a] border border-[#40505f] p-3 rounded text-white focus:outline-none focus:border-[#25d6e8]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold text-white">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full bg-[#0e131a] border border-[#40505f] p-3 rounded text-white focus:outline-none focus:border-[#25d6e8]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-white">Tipo de alojamiento</label>
                <select
                  name="tipo_negocio"
                  value={formData.tipo_negocio}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0e131a] border border-[#40505f] p-3 rounded text-white focus:outline-none focus:border-[#25d6e8]"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Resort">Resort</option>
                  <option value="Hostal">Hostal</option>
                  <option value="Apartamento">Apartamento turístico</option>
                  <option value="Otro">Otro alojamiento</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-white">¿Qué querés conectar o mejorar?</label>
                <textarea
                  name="mensaje"
                  rows="4"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0e131a] border border-[#40505f] p-3 rounded text-white focus:outline-none focus:border-[#25d6e8]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="mt-2 rounded-full bg-[#25d6e8] py-3 px-6 font-bold text-[#071014] hover:bg-[#1fbecf] transition-all disabled:opacity-50"
              >
                {status.loading ? 'Enviando...' : 'Enviar solicitud'}
              </button>

              {status.success && <p className="text-[#c5f34c] text-sm font-semibold">{status.success}</p>}
              {status.error && <p className="text-[#ff765e] text-sm font-semibold">{status.error}</p>}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#34404e] bg-[#0a0c10] py-9 px-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="font-bold text-white">M&D Solutions Technology</p>
            <p className="text-xs text-[#a9b5c3] mt-1">
              Contacto: Daniel (34647564733) | María Elena Álvarez (3625391283) · Email: mdsolutionstecnology@gmail.com
            </p>
            <p className="text-xs text-[#a9b5c3] mt-1">Tu confort es nuestro trabajo · Tecnología operativa para alojamientos.</p>
          </div>
          <p className="text-sm text-[#a9b5c3]">&copy; {new Date().getFullYear()} M&D Solutions Technology. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
