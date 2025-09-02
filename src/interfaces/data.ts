export interface Transaccion {
  numDocumentoIdObligado: string;
  numFactura: string;
  tipoNota: string | null;
  numNota: string | null;
  usuarios: Usuario[];
}

export interface Usuario {
  numFactura: string;
  tipoDocumentoIdentificacion: string;
  numDocumentoIdentificacion: string;
  tipoUsuario: string;
  fechaNacimiento: string;
  codSexo: string;
  codPaisResidencia: string;
  codMunicipioResidencia: string;
  codZonaTerritorialResidencia: string;
  incapacidad: string;
  codPaisOrigen: string;
  consecutivo: number;
  servicios: Servicio;
}

export interface Servicio {
  consultas: Consulta[];
  procedimientos: Procedimiento[];
  urgencias: Urgencia[];
  hospitalizacion: Hospitalizacion[];
  medicamentos: Medicamento[];
  otrosServicios: OtrosServicios[];
}

export interface Consulta {
  numFactura: string;
  codPrestador: string;
  fechaInicioAtencion: string;
  numAutorizacion: string;
  codConsulta: string;
  modalidadGrupoServicioTecSal: string;
  grupoServicios: string;
  codServicio: number;
  finalidadTecnologiaSalud: string;
  causaMotivoAtencion: string;
  codDiagnosticoPrincipal: string;
  codDiagnosticoRelacionado1: string;
  codDiagnosticoRelacionado2: string;
  codDiagnosticoRelacionado3: string;
  tipoDiagnosticoPrincipal: string;
  tipoDocumentoIdentificacion: string;
  numDocumentoIdentificacion: string;
  vrServicio: number;
  conceptoRecaudo: string;
  valorPagoModerador: number;
  numFEVPagoModerador: string | null;
  consecutivo: number;
}

export interface Procedimiento {
  numFactura: string;
  codPrestador: string;
  fechaInicioAtencion: string;
  idMIPRES: string | null;
  numAutorizacion: string;
  codProcedimiento: string;
  viaIngresoServicioSalud: string;
  modalidadGrupoServicioTecSal: string;
  grupoServicios: string;
  codServicio: number;
  finalidadTecnologiaSalud: string;
  tipoDocumentoIdentificacion: string;
  numDocumentoIdentificacion: string;
  codDiagnosticoPrincipal: string;
  codDiagnosticoRelacionado: string | null;
  codComplicacion: string;
  vrServicio: number;
  conceptoRecaudo: string;
  valorPagoModerador: number;
  numFEVPagoModerador: string | null;
  consecutivo: number;
}

export interface Urgencia {
  numFactura: string;
  codPrestador: string;
  fechaInicioAtencion: string;
  causaMotivoAtencion: string;
  codDiagnosticoPrincipal: string;
  codDiagnosticoPrincipalE: string;
  codDiagnosticoRelacionadoE1: string;
  codDiagnosticoRelacionadoE2: string;
  codDiagnosticoRelacionadoE3: string | null;
  condicionDestinoUsuarioEgreso: string;
  codDiagnosticoCausaMuerte: string | null;
  fechaEgreso: string;
  consecutivo: number;
}

export interface Hospitalizacion {
  numFactura: string;
  codPrestador: string;
  viaIngresoServicioSalud: string;
  fechaInicioAtencion: string;
  numAutorizacion: string;
  causaMotivoAtencion: string;
  codDiagnosticoPrincipal: string;
  codDiagnosticoPrincipalE: string;
  codDiagnosticoRelacionadoE1: string;
  codDiagnosticoRelacionadoE2: string | null;
  codDiagnosticoRelacionadoE3: string | null;
  codComplicacion: string | null;
  condicionDestinoUsuarioEgreso: string;
  codDiagnosticoCausaMuerte: string | null;
  fechaEgreso: string;
  consecutivo: number;
}

export interface Medicamento {
  numFactura: string;
  codPrestador: string;
  numAutorizacion: string;
  idMIPRES: string | null;
  fechaDispensAdmon: string;
  codDiagnosticoPrincipal: string;
  codDiagnosticoRelacionado: string;
  tipoMedicamento: string;
  codTecnologiaSalud: string;
  nomTecnologiaSalud: string | null;
  concentracionMedicamento: number;
  unidadMedida: number;
  formaFarmaceutica: string | null;
  unidadMinDispensa: number;
  cantidadMedicamento: number;
  diasTratamiento: number;
  tipoDocumentoIdentificacion: string;
  numDocumentoIdentificacion: string;
  vrUnitMedicamento: number;
  vrServicio: number;
  conceptoRecaudo: string;
  valorPagoModerador: number;
  numFEVPagoModerador: string | null;
  consecutivo: number;
}

export interface OtrosServicios {
  numFactura: string;
  codPrestador: string;
  numAutorizacion: string;
  idMIPRES: string | null;
  fechaSuministroTecnologia: string;
  tipoOS: string;
  codTecnologiaSalud: string;
  nomTecnologiaSalud: string;
  cantidadOS: number;
  tipoDocumentoIdentificacion: string;
  numDocumentoIdentificacion: string;
  vrUnitOS: number;
  vrServicio: number;
  conceptoRecaudo: string;
  valorPagoModerador: number;
  numFEVPagoModerador: string | null;
  consecutivo: number;
}
