interface HeaderProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export default function Header({ onNavigate, currentSection }: HeaderProps) {
  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'solicitud', label: 'Nueva Solicitud' },
    { id: 'seguimiento', label: 'Seguimiento' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('inicio')}
          >
            <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">ACTI</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">
                Centro de Servicios
              </h1>
              <p className="text-xs text-gray-500 leading-tight">ACTI</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentSection === item.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => onNavigate('solicitud')}
            className="hidden sm:inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Solicitar Proyecto
          </button>
        </div>
      </div>
    </header>
  );
}
