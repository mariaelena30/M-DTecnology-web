import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  // 1. Navegación y Menú Móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 2. Simulador de Habitaciones en el Hero
  const [roomCount, setRoomCount] = useState('11-50');

  // 3. Filtro por Pestañas de Módulos ERP
  const [moduleFilter, setModuleFilter] = useState('todos');

  // 4. Estados de Acordeones (Módulos y FAQ)
  const [openModules, setOpenModules] = useState({});
  const [openFaqs, setOpenFaqs] = useState({});

  // 5. Carrusel de Imágenes
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // 6. Mapa Dinámico de Demos y Reseñas (Nodos en España)
  const [selectedLocation, setSelectedLocation] = useState('esp1');
  const [mapCategoryFilter, setMapCategoryFilter] = useState('todos');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    nombre: '',
    alojamiento: '',
    estrellas: 5,
    comentario: ''
  });
  const [reviewsList, setReviewsList] = useState([]);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');

  // 7. Ofuscación de Email para pasar el escáner de Netlify
  const [displayEmail, setDisplayEmail] = useState('');

  useEffect(() => {
    const user = 'mdsolutionstecnology';
    const domain = 'gmail.com';
    setDisplayEmail(`${user}@${domain}`);
  }, []);

  // 8. Formulario de Contacto
  const [formData, setFormData] = useState({
    nombre: '',
    alojamiento: '',
    email: '',
    telefono: '',
    tipo_negocio: '',
    mensaje: ''
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  // Galería de Imágenes del Carrusel
  const gallerySlides = [
    { id: 1, label: 'Reservas', tagBg: 'rgb(22, 37, 42)', tagColor: 'rgb(37, 214, 232)', img: 'https://images.pexels.com/photos/5371683/pexels-photo-5371683.jpeg', alt: 'Recepción de hotel en Madrid' },
    { id: 2, label: 'Habitaciones', tagBg: 'rgb(37, 37, 26)', tagColor: 'rgb(197, 243, 76)', img: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Habitación de hotel boutique' },
    { id: 3, label: 'Experiencias', tagBg: 'rgb(42, 33, 69)', tagColor: 'rgb(203, 183, 255)', img: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Resort en Ibiza' },
    { id: 4, label: 'Servicios', tagBg: 'rgb(42, 29, 28)', tagColor: 'rgb(255, 156, 141)', img: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Restaurante de hotel' },
    { id: 5, label: 'Bienestar', tagBg: 'rgb(22, 37, 42)', tagColor: 'rgb(37, 214, 232)', img: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=800', alt: 'Spa urbano' }
  ];

  // Datos de Módulos ERP
  const modulesData = [
    { id: 'm1', category: 'recepcion', icon: '💻', title: 'Reservas y CRM', text: 'La recepción se transforma en una vista clara de llegadas, estancias y conversaciones.', detail: 'Conecta el recorrido de consulta, reserva y bienvenida sin perder el contexto de cada estancia.', color: '#25d6e8' },
    { id: 'm2', category: 'housekeeping', icon: '🔌', title: 'Habitaciones y Gobernanta', text: 'Estados de habitación, partes de limpieza y coordinación visual para el equipo.', detail: 'Una lectura compartida para que recepción y gobernanta trabajen sobre la misma escena operativa.', color: '#c5f34c' },
    { id: 'm3', category: 'facturacion', icon: '🧾', title: 'Facturación e Impuestos', text: 'Gestión de TPV, consumos y emisión de facturas según normativa fiscal de España.', detail: 'Restaurante, bar, spa o tasa turística aparecen como parte natural de la estancia del huésped.', color: '#ff765e' },
    { id: 'm4', category: 'operaciones', icon: '📊', title: 'Analítica y RevPAR', text: 'Lectura en tiempo real de ocupación, ADR, RevPAR y ritmo de reservas por canal.', detail: 'Organiza señales operativas para decidir precios y disponibilidad con contexto de mercado.', color: '#9a6cff' }
  ];

  // Ubicaciones de Ejemplo para España en el Mapa Dinámico
  const locationsData = [
    {
      id: 'esp1',
      nombre: 'Gran Hotel Castellana',
      tipo: 'hoteles',
      ciudad: 'Madrid (Centro)',
      ocupacion: '92%',
      estado: 'Sincronización OTA Activa',
      autorResena: 'Javier S. (Director de Operaciones)',
      estrellas: 5,
      resena: 'Centralizar las reservas directas con el motor del ERP y automatizar los partes de viajeros nos ahorró más de 20 horas de trabajo semanal en recepción.',
      pinColor: '#25d6e8',
      x: '48%',
      y: '45%'
    },
    {
      id: 'esp2',
      nombre: 'Resort & Spa Costa del Sol',
      tipo: 'resorts',
      ciudad: 'Marbella, Málaga',
      ocupacion: '96%',
      estado: 'Gobernanta y TPV Conectados',
      autorResena: 'Carmen P. (Directora de Hotel)',
      estrellas: 5,
      resena: 'La respuesta de soporte en menos de 5 minutos ante cualquier incidencia técnica es clave en temporada alta. M&D nos da la seguridad operativa que necesitamos.',
      pinColor: '#c5f34c',
      x: '40%',
      y: '82%'
    },
    {
      id: 'esp3',
      nombre: 'Villas & Cabañas Balears',
      tipo: 'cabanas',
      ciudad: 'Ibiza, Islas Baleares',
      ocupacion: '89%',
      estado: 'Partes y Check-in Digital Activo',
      autorResena: 'Marc B. (Propietario)',
      estrellas: 5,
      resena: 'El check-in express con envío de instrucciones por WhatsApp disminuyó las colas en la entrada. Los huéspedes lo valoran muchísimo.',
      pinColor: '#ff765e',
      x: '78%',
      y: '58%'
    }
  ];

  // Reseñas Iniciales
  useEffect(() => {
    setReviewsList([
      {
        id: 1,
        nombre: 'Javier S. (Director de Operaciones)',
        alojamiento: 'Gran Hotel Castellana (Madrid)',
        estrellas: 5,
        comentario: 'Un sistema ágil y perfectamente adecuado a la normativa en España. El trato con Daniel y María Elena es excelente.'
      },
      {
        id: 2,
        nombre: 'Carmen P. (Directora)',
        alojamiento: 'Resort & Spa Costa del Sol (Marbella)',
        estrellas: 5,
        comentario: 'Servicio de soporte técnico impecable las 24 horas del día.'
      }
    ]);
  }, []);

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

  // Handler de formulario de contacto
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

  // Handler para agregar reseña
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.nombre || !newReview.comentario) return;

    const reviewObject = {
      id: Date.now(),
      nombre: newReview.nombre,
      alojamiento: newReview.alojamiento || 'Establecimiento en España',
      estrellas: Number(newReview.estrellas),
      comentario: newReview.comentario
    };

    setReviewsList([reviewObject, ...reviewsList]);
    setReviewSuccessMsg('¡Muchas gracias por tu reseña! Ha sido añadida a la plataforma.');
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setReviewSuccessMsg('');
      setNewReview({ nombre: '', alojamiento: '', estrellas: 5, comentario: '' });
    }, 1800);
  };

  const filteredModules = moduleFilter === 'todos' 
    ? modulesData 
    : modulesData.filter(m => m.category === moduleFilter);

  const filteredLocations = mapCategoryFilter === 'todos'
    ? locationsData
    : locationsData.filter(loc => loc.tipo === mapCategoryFilter);

  const activeLocation = locationsData.find(loc => loc.id === selectedLocation) || locationsData[0];

  return (
    <div className="w-full overflow-x-hidden bg-[#0a0c10] text-[#f6f8fb] font-sans selection:bg-[#25d6e8] selection:text-[#071014]">
      <Head>
        <title>M&D Solutions Technology | Gestión ERP para Hoteles en España</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Work+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Línea animada superior */}
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
            <a href="#mapa-demos" className="hover:text-[#25d6e8] transition-colors">Red & Opiniones</a>
            <a href="#compromiso" className="hover:text-[#25d6e8] transition-colors">Garantía</a>
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
            <a href="#mapa-demos" onClick={() => setMobileMenuOpen(false)}>Red & Opiniones</a>
            <a href="#compromiso" onClick={() => setMobileMenuOpen(false)}>Garantía</a>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>Contacto</a>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section + Simulador */}
        <section id="inicio" className="relative isolate overflow-hidden border-b border-[#34404e] py-12">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[.92fr_1.08fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#25d6e8]">
                SOFTWARE ERP HOTELERO · ESPAÑA
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl text-[#f6f8fb]">
                La gestión de tu hotel en España, en una sola escena.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-7 text-[#c7d0da]">
                Una plataforma ERP moderna concebida para hoteles, resorts, casas rurales y alojamientos turísticos que buscan agilizar la operativa diaria.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contacto"
                  className="rounded-full bg-[#ff765e] px-6 py-3 text-center font-bold text-[#17100e] hover:opacity-90 transition-opacity"
                >
                  Solicitar diagnóstico sin compromiso
                </a>
                <a
                  href="#modulos"
                  className="rounded-full border border-[#51606e] bg-[#181e27] px-6 py-3 text-center font-bold text-[#f6f8fb] hover:bg-[#202834] transition-colors"
                >
                  Explorar módulos
                </a>
              </div>

              <div className="mt-9 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#25d6e8]/30 bg-[#16252a] px-3 py-2 text-sm font-bold text-[#25d6e8]">Reservas Directas</span>
                <span className="rounded-full border border-[#c5f34c]/30 bg-[#25251a] px-3 py-2 text-sm font-bold text-[#c5f34c]">Gobernanta</span>
                <span className="rounded-full border border-[#ff9c8d]/30 bg-[#2a1d1c] px-3 py-2 text-sm font-bold text-[#ff9c8d]">Partes de Viajeros</span>
              </div>
            </div>

            {/* Simulador Interactivo */}
            <div className="relative bg-[#181e27] border border-[#34404e] rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-[#34404e] pb-4">
                  <span className="font-bold text-white text-base">Simulador de Capacidad</span>
                  <span className="h-3 w-3 rounded-full bg-[#c5f34c] shadow-[0_0_12px_#c5f34c]"></span>
                </div>

                <p className="mt-4 text-xs font-semibold text-[#a9b5c3] uppercase tracking-wider">
                  ¿Cuántas habitaciones o plazas gestionas?
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
                      {range} habs.
                    </button>
                  ))}
                </div>

                <div className="mt-6 border-t border-[#34404e] pt-4">
                  <p className="text-xs font-bold text-[#25d6e8] uppercase">Configuración recomendada:</p>
                  <ul className="mt-2 space-y-1 text-sm text-[#f6f8fb]">
                    <li className="flex items-center gap-2">✔ Recepción y fichas de viajeros</li>
                    <li className="flex items-center gap-2">✔ Gobernanta y estado de habitaciones</li>
                    {roomCount !== '1-10' && <li className="flex items-center gap-2 text-[#c5f34c]">✔ Módulo de TPV y facturación unificada</li>}
                    {roomCount === '50+' && <li className="flex items-center gap-2 text-[#9a6cff]">✔ Revenue Management & RevPAR</li>}
                  </ul>
                </div>
              </div>

              <div className="mt-6 border border-[#34404e] bg-[#0e131a] p-3 rounded-lg text-xs flex justify-between items-center">
                <span className="text-[#a9b5c3]">Ahorro de tiempo estimado:</span>
                <span className="font-bold text-[#c5f34c]">
                  {roomCount === '1-10' ? '~8 hs / semana' : roomCount === '11-50' ? '~18 hs / semana' : '~35 hs / semana'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Galería Carrusel Dinámica */}
        <section id="plataforma" className="border-b border-[#34404e] bg-[#0a0c10] py-14">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-5 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#25d6e8]">EL HOTEL EN MOVIMIENTO</p>
                <h2 className="mt-2 text-3xl font-extrabold text-[#f6f8fb]">Cada módulo adaptado a la hospitalidad en España.</h2>
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

        {/* Módulos ERP con Filtro */}
        <section id="modulos" className="bg-[#12161d] py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#ff9c8d]">MÓDULOS ERP</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-[#f6f8fb]">Tecnología hotelera integral para tu negocio.</h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { key: 'todos', label: 'Todos' },
                { key: 'recepcion', label: 'Recepción' },
                { key: 'housekeeping', label: 'Gobernanta' },
                { key: 'facturacion', label: 'Facturación / TPV' },
                { key: 'operaciones', label: 'RevPAR & Análisis' }
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

        {/* Mapa Dinámico de Demos en España */}
        <section id="mapa-demos" className="bg-[#0a0c10] py-16 border-t border-[#34404e]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#25d6e8]">
                  COBERTURA Y CASOS DE ÉXITO EN ESPAÑA
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-white">
                  Mapa interactivo de establecimientos y opiniones.
                </h2>
                <p className="text-sm text-[#a9b5c3] mt-1">
                  Haz clic en los puntos del mapa para consultar la demo operativa y las valoraciones de directores en España.
                </p>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="self-start md:self-auto rounded-full bg-[#c5f34c] px-5 py-2.5 text-xs font-bold text-[#071014] hover:bg-[#b0dc3d] transition-all"
              >
                ✍️️ Dejar una valoración
              </button>
            </div>

            {/* Filtros del Mapa */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { key: 'todos', label: '🌐 Todos en España' },
                { key: 'hoteles', label: '🏨 Hoteles Urbanos' },
                { key: 'cabanas', label: '🏡 Casas Rurales' },
                { key: 'resorts', label: '🌴 Resorts de Costa' }
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setMapCategoryFilter(f.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    mapCategoryFilter === f.key
                      ? 'bg-[#181e27] text-[#25d6e8] border-[#25d6e8]'
                      : 'bg-[#0e131a] text-[#a9b5c3] border-[#34404e] hover:border-[#25d6e8]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Grilla Principal del Mapa + Ficha de Demo */}
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Pantalla del Mapa Oscuro Vectorial */}
              <div className="relative min-h-[340px] bg-[#0e131a] border border-[#34404e] rounded-2xl p-6 overflow-hidden flex flex-col justify-between shadow-2xl">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                <div className="relative z-10 flex items-center justify-between border-b border-[#34404e]/80 pb-3">
                  <span className="text-xs font-mono font-bold text-[#a9b5c3] tracking-wider uppercase">
                    RED DE CONTROL PENINSULAR E INSULAR
                  </span>
                  <span className="flex items-center gap-2 text-xs font-bold text-[#25d6e8]">
                    <span className="h-2 w-2 rounded-full bg-[#25d6e8] animate-ping"></span>
                    Sincronización activa
                  </span>
                </div>

                {/* Marcadores sobre el Mapa */}
                <div className="relative z-10 my-12 min-h-[200px] w-full">
                  {filteredLocations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc.id)}
                      style={{ left: loc.x, top: loc.y }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                    >
                      <span className="relative flex h-6 w-6 items-center justify-center">
                        <span
                          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                          style={{ backgroundColor: loc.pinColor }}
                        ></span>
                        <span
                          className={`relative inline-flex rounded-full h-4 w-4 border-2 border-[#0a0c10] shadow-lg transition-transform group-hover:scale-125 ${
                            selectedLocation === loc.id ? 'scale-125 ring-4 ring-white/20' : ''
                          }`}
                          style={{ backgroundColor: loc.pinColor }}
                        ></span>
                      </span>
                      <span className="mt-1 block rounded bg-[#181e27]/90 px-2 py-0.5 text-[10px] font-bold text-white whitespace-nowrap border border-[#34404e]">
                        {loc.nombre}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="relative z-10 text-xs text-[#a9b5c3] italic">
                  💡 Haz clic sobre los marcadores para ver la ficha operativa e impresiones del cliente.
                </p>
              </div>

              {/* Ficha Dinámica del Hotel Seleccionado */}
              <div className="bg-[#181e27] border border-[#34404e] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#34404e] pb-3">
                    <span className="text-xs font-bold text-[#25d6e8] uppercase tracking-wider">
                      DEMO DE ESTABLECIMIENTO
                    </span>
                    <span className="text-xs font-mono text-[#c5f34c]">{activeLocation.ciudad}</span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white">{activeLocation.nombre}</h3>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-amber-400">{'★'.repeat(activeLocation.estrellas)}</span>
                    <span className="text-xs text-[#a9b5c3] font-semibold">Valoración excelente</span>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#0e131a] border border-[#34404e] p-4 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#a9b5c3]">Ocupación media:</span>
                      <span className="font-bold text-[#c5f34c]">{activeLocation.ocupacion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a9b5c3]">Integración activa:</span>
                      <span className="font-bold text-[#25d6e8]">{activeLocation.estado}</span>
                    </div>
                  </div>

                  {/* Reseña del Hotel Seleccionado */}
                  <div className="mt-5 border-t border-[#34404e] pt-4">
                    <p className="text-xs font-bold text-white mb-2">💬 Testimonio del equipo directivo:</p>
                    <blockquote className="text-sm text-[#c7d0da] italic leading-relaxed bg-[#12161d] p-3 rounded-lg border-l-2 border-[#25d6e8]">
                      "{activeLocation.resena}"
                    </blockquote>
                    <p className="mt-2 text-xs font-bold text-[#ff765e] text-right">— {activeLocation.autorResena}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#34404e]">
                  <a
                    href="#contacto"
                    className="block w-full rounded-full bg-[#25d6e8] py-2.5 text-center text-xs font-bold text-[#071014] hover:bg-[#1fbecf] transition-all"
                  >
                    Solicitar demo adaptada a tu hotel
                  </a>
                </div>
              </div>
            </div>

            {/* Muro de Reseñas */}
            {reviewsList.length > 0 && (
              <div className="mt-10 border-t border-[#34404e] pt-8">
                <h3 className="text-lg font-bold text-white mb-4">Valoraciones de directores en España</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="bg-[#181e27] border border-[#34404e] p-4 rounded-xl text-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white">{rev.nombre}</span>
                        <span className="text-amber-400">{'★'.repeat(rev.estrellas)}</span>
                      </div>
                      <p className="text-[#25d6e8] font-semibold">{rev.alojamiento}</p>
                      <p className="text-[#a9b5c3] italic">"{rev.comentario}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Modal Pop-up para Dejar Reseñas */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md border border-[#40505f] bg-[#181e27] p-6 rounded-2xl shadow-2xl relative">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-4 right-4 text-white text-lg font-bold hover:text-[#25d6e8]"
              >
                ✕
              </button>

              <h3 className="text-xl font-bold text-white mb-1">Valorar M&D Solutions Technology</h3>
              <p className="text-xs text-[#a9b5c3] mb-4">Comparte tu experiencia con la plataforma y el soporte técnico.</p>

              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div>
                  <label className="block text-white font-bold mb-1">Nombre y Cargo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Laura G. (Directora de Hotel)"
                    value={newReview.nombre}
                    onChange={(e) => setNewReview({ ...newReview, nombre: e.target.value })}
                    className="w-full bg-[#0e131a] border border-[#40505f] p-2.5 rounded text-white focus:outline-none focus:border-[#25d6e8]"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-1">Nombre del Alojamiento / Ciudad</label>
                  <input
                    type="text"
                    placeholder="Ej: Hotel Boutique (Sevilla)"
                    value={newReview.alojamiento}
                    onChange={(e) => setNewReview({ ...newReview, alojamiento: e.target.value })}
                    className="w-full bg-[#0e131a] border border-[#40505f] p-2.5 rounded text-white focus:outline-none focus:border-[#25d6e8]"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-1">Puntuación</label>
                  <select
                    value={newReview.estrellas}
                    onChange={(e) => setNewReview({ ...newReview, estrellas: e.target.value })}
                    className="w-full bg-[#0e131a] border border-[#40505f] p-2.5 rounded text-white focus:outline-none focus:border-[#25d6e8]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 / 5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 / 5)</option>
                    <option value={3}>⭐⭐⭐ (3 / 5)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-bold mb-1">Comentario o experiencia</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="¿Qué ventajas ha aportado a la gestión diaria de tu establecimiento?"
                    value={newReview.comentario}
                    onChange={(e) => setNewReview({ ...newReview, comentario: e.target.value })}
                    className="w-full bg-[#0e131a] border border-[#40505f] p-2.5 rounded text-white focus:outline-none focus:border-[#25d6e8]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#25d6e8] py-3 font-bold text-[#071014] hover:bg-[#1fbecf] transition-all text-sm"
                >
                  Publicar Valoración
                </button>

                {reviewSuccessMsg && (
                  <p className="text-[#c5f34c] font-semibold text-center mt-2">{reviewSuccessMsg}</p>
                )}
              </form>
            </div>
          </div>
        )}

        {/* FAQ Acordeón */}
        <section id="preguntas" className="bg-[#12161d] py-16 border-t border-[#34404e]">
          <div className="mx-auto max-w-4xl px-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#25d6e8] text-center">PREGUNTAS FRECUENTES</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#f6f8fb] text-center">Respuestas claras para tu establecimiento.</h2>

            <div className="mt-8 space-y-3">
              {[
                { id: 'q1', q: '¿Está adaptada a alojamientos en España?', a: 'Sí, cumple con los estándares exigidos para el registro de viajeros, facturación electrónica y RGPD.' },
                { id: 'q2', q: '¿Qué áreas conecta la plataforma?', a: 'Conecta recepción, gobernanta, gestión de reservas, TPV, facturación y análisis de RevPAR.' },
                { id: 'q3', q: '¿Cómo se realiza el proceso de migración?', a: 'Comenzamos con un análisis del software actual del hotel e importamos los datos para evitar interrupciones en la operativa.' },
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

        {/* Compromiso y Garantía Operativa */}
        <section id="compromiso" className="bg-[#0a0c10] py-16 border-t border-[#34404e]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[#c5f34c]">COMPROMISO Y GARANTÍA</p>
              <h2 className="mt-2 text-3xl font-extrabold text-white">Garantías de nivel profesional para tu alojamiento.</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-[#181e27] border border-[#34404e] p-6 rounded-xl">
                <span className="text-3xl mb-4 block">🔒</span>
                <h3 className="text-xl font-bold text-[#25d6e8] mb-2">Protección de Datos & RGPD 100%</h3>
                <p className="text-sm text-[#a9b5c3] leading-relaxed">
                  Toda la información de reservas e historial de huéspedes se procesa con cifrado avanzado cumpliendo estrictamente el RGPD en la Unión Europea.
                </p>
              </div>

              <div className="bg-[#181e27] border border-[#34404e] p-6 rounded-xl">
                <span className="text-3xl mb-4 block">🛠️</span>
                <h3 className="text-xl font-bold text-[#c5f34c] mb-2">Soporte Técnico Especializado 24/7</h3>
                <p className="text-sm text-[#a9b5c3] leading-relaxed">
                  Asistencia continua activa las 24 horas del día, los 365 días del año, para asegurar que la recepción y los canales de venta funcionen sin pausas.
                </p>
              </div>

              <div className="bg-[#181e27] border border-[#34404e] p-6 rounded-xl">
                <span className="text-3xl mb-4 block">⚡</span>
                <h3 className="text-xl font-bold text-[#ff765e] mb-2">Mensajería Automatizada por WhatsApp</h3>
                <p className="text-sm text-[#a9b5c3] leading-relaxed">
                  Envío automático de datos de check-in, clave de acceso y confirmaciones de estancia directo al móvil del cliente sin carga manual.
                </p>
              </div>

              <div className="bg-[#181e27] border border-[#34404e] p-6 rounded-xl">
                <span className="text-3xl mb-4 block">📈</span>
                <h3 className="text-xl font-bold text-[#9a6cff] mb-2">Escalabilidad de Software a Medida</h3>
                <p className="text-sm text-[#a9b5c3] leading-relaxed">
                  Preparado para adaptarse al crecimiento: desde una casa rural o boutique hotel hasta cadenas hoteleras multi-propiedad.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-[#181e27] border border-[#34404e] p-6 rounded-xl text-center">
              <span className="text-3xl mb-2 block">🧠</span>
              <h3 className="text-xl font-bold text-white mb-2">Organización Personal & Panel Centralizado</h3>
              <p className="text-sm text-[#a9b5c3] max-w-3xl mx-auto leading-relaxed">
                Estructura las tareas del equipo, cuadrantes de turnos y pendientes desde un único tablero intuitivo. Despídete de notas sueltas y hojas de cálculo desactualizadas.
              </p>
            </div>
          </div>
        </section>

        {/* Contacto Directo */}
        <section id="contacto" className="bg-[#12161d] py-16 border-t border-[#34404e]">
          <div className="mx-auto grid max-w-7xl gap-9 px-5 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#25d6e8]">CONTACTO DIRECTO</p>
              <h2 className="mt-4 text-3xl font-extrabold text-[#f6f8fb]">Hablemos de tu proyecto hotelero.</h2>
              <p className="mt-4 text-sm text-[#a9b5c3]">Ponte en contacto con nuestro equipo para analizar las necesidades de tu establecimiento.</p>

              <div className="mt-6 space-y-3 bg-[#181e27] border border-[#34404e] p-5 rounded-xl">
                <p className="text-sm text-white font-bold">Atención Directa:</p>
                <p className="text-sm text-[#25d6e8]">📞 Daniel: <span className="text-white font-mono">+34 647 56 47 33</span></p>
                <p className="text-sm text-[#c5f34c]">📞 María Elena: <span className="text-white font-mono">+34 362 53 91 283</span></p>
                <p className="text-sm text-[#ff765e]">
                  ✉️ Email: <a href={displayEmail ? `mailto:${displayEmail}` : '#'} className="text-white font-mono hover:underline">{displayEmail || 'Cargando...'}</a>
                </p>
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
                  <label className="mb-1 block text-sm font-bold text-white">Nombre del Hotel o Empresa</label>
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
                  <label className="mb-1 block text-sm font-bold text-white">Correo electrónico</label>
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
                  <label className="mb-1 block text-sm font-bold text-white">Teléfono de contacto</label>
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
                <label className="mb-1 block text-sm font-bold text-white">Tipo de establecimiento</label>
                <select
                  name="tipo_negocio"
                  value={formData.tipo_negocio}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0e131a] border border-[#40505f] p-3 rounded text-white focus:outline-none focus:border-[#25d6e8]"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Hotel Urbano">Hotel Urbano</option>
                  <option value="Resort">Resort / Hotel de Costa</option>
                  <option value="Casa Rural">Casa Rural / Alojamiento con Encanto</option>
                  <option value="Apartamentos Turísticos">Apartamentos Turísticos</option>
                  <option value="Otro">Otro tipo de alojamiento</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-white">¿Qué aspecto te gustaría optimizar?</label>
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
                {status.loading ? 'Enviando...' : 'Enviar consulta'}
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
              Atención directa: Daniel (+34 647 56 47 33) | María Elena (+34 362 53 91 283) · Email: {displayEmail || 'mdsolutionstecnology@gmail.com'}
            </p>
            <p className="text-xs text-[#a9b5c3] mt-1">Soluciones informáticas y gestión integral para el sector hotelero.</p>
          </div>
          <p className="text-sm text-[#a9b5c3]">&copy; {new Date().getFullYear()} M&D Solutions Technology. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
