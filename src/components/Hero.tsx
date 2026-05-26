interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary-100">
              Centro de Servicios Activo
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Transforma tus ideas en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-primary-300">
              soluciones digitales
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-primary-100 mb-10 max-w-2xl leading-relaxed">
            El Centro de Servicios ACTI te acompaña en cada etapa del desarrollo
            de tus proyectos de software. Desde la concepción hasta la
            implementación.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate('solicitud')}
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-800 px-8 py-3.5 rounded-xl text-base font-bold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Solicitar Proyecto
            </button>
            <button
              onClick={() => onNavigate('servicios')}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-white/10 transition-all"
            >
              Conocer Servicios
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
          {[
            { value: '150+', label: 'Proyectos Entregados' },
            { value: '98%', label: 'Satisfaccion del Cliente' },
            { value: '24/7', label: 'Soporte Disponible' },
            { value: '50+', label: 'Especialistas' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold mb-1">{stat.value}</div>
              <div className="text-sm text-primary-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
