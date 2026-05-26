export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-extrabold text-sm">ACTI</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Centro de Servicios</h3>
                <p className="text-xs text-gray-500">ACTI</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Transformando ideas en soluciones tecnologicas innovadoras para
              impulsar tu organizacion.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li>Desarrollo de Software</li>
              <li>Bases de Datos</li>
              <li>Infraestructura Cloud</li>
              <li>Ciberseguridad</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>Nueva Solicitud</li>
              <li>Seguimiento</li>
              <li>Documentacion</li>
              <li>Preguntas Frecuentes</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>servicios@acti.com.mx</li>
              <li>(55) 1234-5678</li>
              <li>Lun - Vie: 8:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Centro de Servicios ACTI. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
