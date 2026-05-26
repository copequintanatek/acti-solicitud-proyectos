import { useState } from 'react';

interface TrackingResult {
  folio: string;
  titulo: string;
  estado: string;
  fecha: string;
  etapa: number;
}

const mockResults: Record<string, TrackingResult> = {
  'ACTI-00001234': {
    folio: 'ACTI-00001234',
    titulo: 'Sistema de Gestion de Inventarios',
    estado: 'En Desarrollo',
    fecha: '2026-05-15',
    etapa: 3,
  },
};

const etapas = [
  'Recibida',
  'En Evaluacion',
  'En Desarrollo',
  'Pruebas',
  'Entregado',
];

export default function Tracking() {
  const [folio, setFolio] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    setSearched(true);
    setResult(mockResults[folio.trim().toUpperCase()] ?? null);
  }

  return (
    <section id="seguimiento" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Seguimiento
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Consulta el Estado de tu Solicitud
          </h2>
          <p className="text-lg text-gray-600">
            Ingresa tu numero de folio para conocer el avance de tu proyecto.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={folio}
              onChange={(e) => setFolio(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Ej: ACTI-00001234"
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-200"
            />
            <button
              onClick={handleSearch}
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-sm whitespace-nowrap"
            >
              <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </div>

          {searched && !result && (
            <div className="mt-6 text-center py-8">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 font-medium">
                No se encontro ninguna solicitud con ese folio.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Verifica el numero e intenta de nuevo.
              </p>
            </div>
          )}

          {result && (
            <div className="mt-8">
              <div className="bg-primary-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{result.titulo}</h3>
                  <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {result.estado}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Folio: {result.folio} &middot; Solicitud: {result.fecha}
                </p>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  {etapas.map((etapa, index) => (
                    <div key={etapa} className="flex flex-col items-center flex-1 last:flex-none">
                      <div className="flex items-center w-full">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            index < result.etapa
                              ? 'bg-green-500 text-white'
                              : index === result.etapa
                                ? 'bg-primary-600 text-white animate-pulse'
                                : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {index < result.etapa ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </div>
                        {index < etapas.length - 1 && (
                          <div
                            className={`flex-1 h-1 mx-1 rounded-full ${
                              index < result.etapa ? 'bg-green-500' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                      <span className="text-xs text-gray-500 mt-2 text-center">{etapa}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
