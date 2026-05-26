export interface ProjectRequest {
  solicitante: SolicitanteInfo;
  proyecto: ProyectoInfo;
  requisitos: RequisitosInfo;
  cronograma: CronogramaInfo;
}

export interface SolicitanteInfo {
  nombre: string;
  correo: string;
  telefono: string;
  departamento: string;
  cargo: string;
}

export interface ProyectoInfo {
  titulo: string;
  descripcion: string;
  tipoProyecto: string;
  prioridad: string;
  areaDestino: string;
}

export interface RequisitosInfo {
  descripcionFuncional: string;
  tecnologiasPreferidas: string;
  integraciones: string;
  usuariosEstimados: string;
  requisitosSeguridad: string;
}

export interface CronogramaInfo {
  fechaInicioDeseada: string;
  fechaEntregaDeseada: string;
  presupuestoEstimado: string;
  comentariosAdicionales: string;
}

export type FormStep = 1 | 2 | 3 | 4 | 5;
