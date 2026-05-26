import { useState } from 'react';
import type { FormStep, ProjectRequest } from '../types';

function generateFolio() {
  return Date.now().toString().slice(-8);
}

const initialFormData: ProjectRequest = {
  solicitante: {
    nombre: '',
    correo: '',
    telefono: '',
    departamento: '',
    cargo: '',
  },
  proyecto: {
    titulo: '',
    descripcion: '',
    tipoProyecto: '',
    prioridad: '',
    areaDestino: '',
  },
  requisitos: {
    descripcionFuncional: '',
    tecnologiasPreferidas: '',
    integraciones: '',
    usuariosEstimados: '',
    requisitosSeguridad: '',
  },
  cronograma: {
    fechaInicioDeseada: '',
    fechaEntregaDeseada: '',
    presupuestoEstimado: '',
    comentariosAdicionales: '',
  },
};

const stepTitles: Record<FormStep, string> = {
  1: 'Datos del Solicitante',
  2: 'Informacion del Proyecto',
  3: 'Requisitos Tecnicos',
  4: 'Cronograma y Presupuesto',
  5: 'Revision y Envio',
};

const stepDescriptions: Record<FormStep, string> = {
  1: 'Ingresa tus datos de contacto para que podamos comunicarnos contigo.',
  2: 'Describe el proyecto que deseas solicitar al Centro de Servicios ACTI.',
  3: 'Detalla los requisitos tecnicos y funcionales del proyecto.',
  4: 'Define los plazos y presupuesto estimado para el proyecto.',
  5: 'Revisa toda la informacion antes de enviar tu solicitud.',
};

export default function ProjectRequestForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<ProjectRequest>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [folioNumber, setFolioNumber] = useState('');

  function updateSolicitante(field: keyof ProjectRequest['solicitante'], value: string) {
    setFormData((prev) => ({
      ...prev,
      solicitante: { ...prev.solicitante, [field]: value },
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`solicitante.${field}`];
      return next;
    });
  }

  function updateProyecto(field: keyof ProjectRequest['proyecto'], value: string) {
    setFormData((prev) => ({
      ...prev,
      proyecto: { ...prev.proyecto, [field]: value },
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`proyecto.${field}`];
      return next;
    });
  }

  function updateRequisitos(field: keyof ProjectRequest['requisitos'], value: string) {
    setFormData((prev) => ({
      ...prev,
      requisitos: { ...prev.requisitos, [field]: value },
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`requisitos.${field}`];
      return next;
    });
  }

  function updateCronograma(field: keyof ProjectRequest['cronograma'], value: string) {
    setFormData((prev) => ({
      ...prev,
      cronograma: { ...prev.cronograma, [field]: value },
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`cronograma.${field}`];
      return next;
    });
  }

  function validateStep(step: FormStep): boolean {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.solicitante.nombre.trim()) newErrors['solicitante.nombre'] = 'El nombre es requerido';
      if (!formData.solicitante.correo.trim()) newErrors['solicitante.correo'] = 'El correo es requerido';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.solicitante.correo))
        newErrors['solicitante.correo'] = 'Ingresa un correo valido';
      if (!formData.solicitante.departamento.trim())
        newErrors['solicitante.departamento'] = 'El departamento es requerido';
    }

    if (step === 2) {
      if (!formData.proyecto.titulo.trim()) newErrors['proyecto.titulo'] = 'El titulo es requerido';
      if (!formData.proyecto.descripcion.trim())
        newErrors['proyecto.descripcion'] = 'La descripcion es requerida';
      if (!formData.proyecto.tipoProyecto) newErrors['proyecto.tipoProyecto'] = 'Selecciona un tipo de proyecto';
      if (!formData.proyecto.prioridad) newErrors['proyecto.prioridad'] = 'Selecciona la prioridad';
    }

    if (step === 3) {
      if (!formData.requisitos.descripcionFuncional.trim())
        newErrors['requisitos.descripcionFuncional'] = 'La descripcion funcional es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5) as FormStep);
    }
  }

  function handlePrev() {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as FormStep);
  }

  function handleSubmit() {
    console.log('Solicitud enviada:', formData);
    setFolioNumber(generateFolio());
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id="solicitud" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Solicitud Enviada Exitosamente
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Tu solicitud de proyecto ha sido recibida por el Centro de Servicios ACTI.
          </p>
          <div className="bg-primary-50 rounded-xl p-6 mb-8">
            <p className="text-primary-800 font-medium">
              Numero de folio: <span className="font-bold">ACTI-{folioNumber}</span>
            </p>
            <p className="text-primary-600 text-sm mt-2">
              Recibirás un correo de confirmacion en <strong>{formData.solicitante.correo}</strong>
            </p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(1);
              setFormData(initialFormData);
            }}
            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Nueva Solicitud
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="solicitud" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Formulario de Solicitud
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Solicita tu Proyecto
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Completa el formulario para enviar tu solicitud de proyecto al equipo de ACTI.
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            {([1, 2, 3, 4, 5] as FormStep[]).map((step) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      step < currentStep
                        ? 'bg-green-500 text-white'
                        : step === currentStep
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step < currentStep ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  <span
                    className={`hidden sm:block text-xs mt-2 font-medium ${
                      step === currentStep ? 'text-primary-700' : 'text-gray-400'
                    }`}
                  >
                    {stepTitles[step]}
                  </span>
                </div>
                {step < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900">{stepTitles[currentStep]}</h3>
            <p className="text-gray-500 mt-1">{stepDescriptions[currentStep]}</p>
          </div>

          {/* Step 1: Solicitante */}
          {currentStep === 1 && (
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                label="Nombre Completo"
                required
                error={errors['solicitante.nombre']}
              >
                <input
                  type="text"
                  value={formData.solicitante.nombre}
                  onChange={(e) => updateSolicitante('nombre', e.target.value)}
                  placeholder="Ej: Juan Perez Garcia"
                  className={inputClass(errors['solicitante.nombre'])}
                />
              </FormField>

              <FormField
                label="Correo Electronico"
                required
                error={errors['solicitante.correo']}
              >
                <input
                  type="email"
                  value={formData.solicitante.correo}
                  onChange={(e) => updateSolicitante('correo', e.target.value)}
                  placeholder="correo@empresa.com"
                  className={inputClass(errors['solicitante.correo'])}
                />
              </FormField>

              <FormField label="Telefono">
                <input
                  type="tel"
                  value={formData.solicitante.telefono}
                  onChange={(e) => updateSolicitante('telefono', e.target.value)}
                  placeholder="(55) 1234-5678"
                  className={inputClass()}
                />
              </FormField>

              <FormField
                label="Departamento / Area"
                required
                error={errors['solicitante.departamento']}
              >
                <select
                  value={formData.solicitante.departamento}
                  onChange={(e) => updateSolicitante('departamento', e.target.value)}
                  className={inputClass(errors['solicitante.departamento'])}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Administracion">Administracion</option>
                  <option value="Finanzas">Finanzas</option>
                  <option value="Recursos Humanos">Recursos Humanos</option>
                  <option value="Operaciones">Operaciones</option>
                  <option value="Ventas">Ventas</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Logistica">Logistica</option>
                  <option value="Produccion">Produccion</option>
                  <option value="Direccion General">Direccion General</option>
                  <option value="Otro">Otro</option>
                </select>
              </FormField>

              <FormField label="Cargo / Puesto" className="sm:col-span-2">
                <input
                  type="text"
                  value={formData.solicitante.cargo}
                  onChange={(e) => updateSolicitante('cargo', e.target.value)}
                  placeholder="Ej: Gerente de Operaciones"
                  className={inputClass()}
                />
              </FormField>
            </div>
          )}

          {/* Step 2: Proyecto */}
          {currentStep === 2 && (
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                label="Titulo del Proyecto"
                required
                error={errors['proyecto.titulo']}
                className="sm:col-span-2"
              >
                <input
                  type="text"
                  value={formData.proyecto.titulo}
                  onChange={(e) => updateProyecto('titulo', e.target.value)}
                  placeholder="Ej: Sistema de Gestion de Inventarios"
                  className={inputClass(errors['proyecto.titulo'])}
                />
              </FormField>

              <FormField
                label="Descripcion del Proyecto"
                required
                error={errors['proyecto.descripcion']}
                className="sm:col-span-2"
              >
                <textarea
                  rows={4}
                  value={formData.proyecto.descripcion}
                  onChange={(e) => updateProyecto('descripcion', e.target.value)}
                  placeholder="Describe brevemente el objetivo y alcance del proyecto..."
                  className={inputClass(errors['proyecto.descripcion'])}
                />
              </FormField>

              <FormField
                label="Tipo de Proyecto"
                required
                error={errors['proyecto.tipoProyecto']}
              >
                <select
                  value={formData.proyecto.tipoProyecto}
                  onChange={(e) => updateProyecto('tipoProyecto', e.target.value)}
                  className={inputClass(errors['proyecto.tipoProyecto'])}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Aplicacion Web">Aplicacion Web</option>
                  <option value="Aplicacion Movil">Aplicacion Movil</option>
                  <option value="Aplicacion de Escritorio">Aplicacion de Escritorio</option>
                  <option value="API / Microservicio">API / Microservicio</option>
                  <option value="Dashboard / BI">Dashboard / BI</option>
                  <option value="Automatizacion de Procesos">Automatizacion de Procesos</option>
                  <option value="Integracion de Sistemas">Integracion de Sistemas</option>
                  <option value="Migracion / Actualizacion">Migracion / Actualizacion</option>
                  <option value="Otro">Otro</option>
                </select>
              </FormField>

              <FormField
                label="Prioridad"
                required
                error={errors['proyecto.prioridad']}
              >
                <select
                  value={formData.proyecto.prioridad}
                  onChange={(e) => updateProyecto('prioridad', e.target.value)}
                  className={inputClass(errors['proyecto.prioridad'])}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Baja">Baja - No urgente</option>
                  <option value="Media">Media - Importante</option>
                  <option value="Alta">Alta - Urgente</option>
                  <option value="Critica">Critica - Inmediata</option>
                </select>
              </FormField>

              <FormField label="Area de Destino" className="sm:col-span-2">
                <input
                  type="text"
                  value={formData.proyecto.areaDestino}
                  onChange={(e) => updateProyecto('areaDestino', e.target.value)}
                  placeholder="Ej: Departamento de Ventas, Toda la organizacion"
                  className={inputClass()}
                />
              </FormField>
            </div>
          )}

          {/* Step 3: Requisitos */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <FormField
                label="Descripcion Funcional"
                required
                error={errors['requisitos.descripcionFuncional']}
              >
                <textarea
                  rows={4}
                  value={formData.requisitos.descripcionFuncional}
                  onChange={(e) => updateRequisitos('descripcionFuncional', e.target.value)}
                  placeholder="Describe las funcionalidades principales que necesitas..."
                  className={inputClass(errors['requisitos.descripcionFuncional'])}
                />
              </FormField>

              <FormField label="Tecnologias Preferidas">
                <input
                  type="text"
                  value={formData.requisitos.tecnologiasPreferidas}
                  onChange={(e) => updateRequisitos('tecnologiasPreferidas', e.target.value)}
                  placeholder="Ej: React, Node.js, Python, SQL Server (opcional)"
                  className={inputClass()}
                />
              </FormField>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Integraciones Necesarias">
                  <textarea
                    rows={3}
                    value={formData.requisitos.integraciones}
                    onChange={(e) => updateRequisitos('integraciones', e.target.value)}
                    placeholder="Ej: SAP, ERP actual, API de pagos..."
                    className={inputClass()}
                  />
                </FormField>

                <FormField label="Usuarios Estimados">
                  <select
                    value={formData.requisitos.usuariosEstimados}
                    onChange={(e) => updateRequisitos('usuariosEstimados', e.target.value)}
                    className={inputClass()}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="1-10">1 - 10 usuarios</option>
                    <option value="11-50">11 - 50 usuarios</option>
                    <option value="51-200">51 - 200 usuarios</option>
                    <option value="201-500">201 - 500 usuarios</option>
                    <option value="500+">Mas de 500 usuarios</option>
                  </select>
                </FormField>
              </div>

              <FormField label="Requisitos de Seguridad">
                <textarea
                  rows={3}
                  value={formData.requisitos.requisitosSeguridad}
                  onChange={(e) => updateRequisitos('requisitosSeguridad', e.target.value)}
                  placeholder="Ej: Autenticacion de dos factores, cifrado de datos, cumplimiento normativo..."
                  className={inputClass()}
                />
              </FormField>
            </div>
          )}

          {/* Step 4: Cronograma */}
          {currentStep === 4 && (
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField label="Fecha de Inicio Deseada">
                <input
                  type="date"
                  value={formData.cronograma.fechaInicioDeseada}
                  onChange={(e) => updateCronograma('fechaInicioDeseada', e.target.value)}
                  className={inputClass()}
                />
              </FormField>

              <FormField label="Fecha de Entrega Deseada">
                <input
                  type="date"
                  value={formData.cronograma.fechaEntregaDeseada}
                  onChange={(e) => updateCronograma('fechaEntregaDeseada', e.target.value)}
                  className={inputClass()}
                />
              </FormField>

              <FormField label="Presupuesto Estimado" className="sm:col-span-2">
                <select
                  value={formData.cronograma.presupuestoEstimado}
                  onChange={(e) => updateCronograma('presupuestoEstimado', e.target.value)}
                  className={inputClass()}
                >
                  <option value="">Seleccionar rango...</option>
                  <option value="Menos de $50,000 MXN">Menos de $50,000 MXN</option>
                  <option value="$50,000 - $150,000 MXN">$50,000 - $150,000 MXN</option>
                  <option value="$150,000 - $500,000 MXN">$150,000 - $500,000 MXN</option>
                  <option value="$500,000 - $1,000,000 MXN">$500,000 - $1,000,000 MXN</option>
                  <option value="Mas de $1,000,000 MXN">Mas de $1,000,000 MXN</option>
                  <option value="Por definir">Por definir</option>
                </select>
              </FormField>

              <FormField
                label="Comentarios Adicionales"
                className="sm:col-span-2"
              >
                <textarea
                  rows={4}
                  value={formData.cronograma.comentariosAdicionales}
                  onChange={(e) => updateCronograma('comentariosAdicionales', e.target.value)}
                  placeholder="Cualquier informacion adicional que consideres relevante..."
                  className={inputClass()}
                />
              </FormField>
            </div>
          )}

          {/* Step 5: Revision */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <ReviewSection title="Datos del Solicitante">
                <ReviewRow label="Nombre" value={formData.solicitante.nombre} />
                <ReviewRow label="Correo" value={formData.solicitante.correo} />
                <ReviewRow label="Telefono" value={formData.solicitante.telefono || 'No especificado'} />
                <ReviewRow label="Departamento" value={formData.solicitante.departamento} />
                <ReviewRow label="Cargo" value={formData.solicitante.cargo || 'No especificado'} />
              </ReviewSection>

              <ReviewSection title="Informacion del Proyecto">
                <ReviewRow label="Titulo" value={formData.proyecto.titulo} />
                <ReviewRow label="Descripcion" value={formData.proyecto.descripcion} />
                <ReviewRow label="Tipo" value={formData.proyecto.tipoProyecto} />
                <ReviewRow label="Prioridad" value={formData.proyecto.prioridad} />
                <ReviewRow label="Area de Destino" value={formData.proyecto.areaDestino || 'No especificada'} />
              </ReviewSection>

              <ReviewSection title="Requisitos Tecnicos">
                <ReviewRow label="Funcionalidad" value={formData.requisitos.descripcionFuncional} />
                <ReviewRow label="Tecnologias" value={formData.requisitos.tecnologiasPreferidas || 'No especificadas'} />
                <ReviewRow label="Integraciones" value={formData.requisitos.integraciones || 'No especificadas'} />
                <ReviewRow label="Usuarios" value={formData.requisitos.usuariosEstimados || 'No especificado'} />
                <ReviewRow label="Seguridad" value={formData.requisitos.requisitosSeguridad || 'No especificados'} />
              </ReviewSection>

              <ReviewSection title="Cronograma y Presupuesto">
                <ReviewRow label="Inicio" value={formData.cronograma.fechaInicioDeseada || 'No especificada'} />
                <ReviewRow label="Entrega" value={formData.cronograma.fechaEntregaDeseada || 'No especificada'} />
                <ReviewRow label="Presupuesto" value={formData.cronograma.presupuestoEstimado || 'No especificado'} />
                <ReviewRow label="Comentarios" value={formData.cronograma.comentariosAdicionales || 'Sin comentarios'} />
              </ReviewSection>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-sm"
              >
                Siguiente
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Enviar Solicitud
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function inputClass(error?: string) {
  const base =
    'w-full rounded-xl border px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2';
  return error
    ? `${base} border-red-300 focus:border-red-500 focus:ring-red-200`
    : `${base} border-gray-200 focus:border-primary-500 focus:ring-primary-200`;
}

function FormField({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h4 className="text-sm font-bold text-primary-700 uppercase tracking-wider mb-4">
        {title}
      </h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
      <span className="text-sm font-medium text-gray-500 sm:w-32 shrink-0">
        {label}:
      </span>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
  );
}
