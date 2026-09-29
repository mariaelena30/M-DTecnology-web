import Head from 'next/head';
import ContactForm from './../components/ContactForm.jsx';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between">
      <Head>
        <title>M&D Solutions Technology</title>
        <meta name="description" content="Soluciones tecnológicas e infraestructura" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-blue-900 text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">M&D Solutions</h1>
          <nav className="space-x-4">
            <a href="#contacto" className="hover:underline">Contacto</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
            Transformamos tus proyectos en tecnología
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Servicios integrales en desarrollo web, mantenimiento e infraestructura.
          </p>
        </section>

        <section id="contacto" className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Contáctanos</h3>
          <ContactForm />
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} M&D Solutions Technology. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
