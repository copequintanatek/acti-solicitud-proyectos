export default function Contact() {
  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Contacto
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Comunicate con Nosotros
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Nuestro equipo esta disponible para resolver tus dudas y
              asesorarte en tu proximo proyecto de software.
            </p>

            <div className="space-y-6">
              <ContactItem
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                title="Correo Electronico"
                detail="servicios@acti.com.mx"
              />
              <ContactItem
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
                title="Telefono"
                detail="(55) 1234-5678 ext. 100"
              />
              <ContactItem
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                title="Ubicacion"
                detail="Centro de Servicios ACTI, Piso 3"
              />
              <ContactItem
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Horario de Atencion"
                detail="Lunes a Viernes, 8:00 - 18:00 hrs"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Envianos un Mensaje
            </h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo
                </label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  placeholder="Escribe tu mensaje..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-200"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-sm"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600">{detail}</p>
      </div>
    </div>
  );
}
