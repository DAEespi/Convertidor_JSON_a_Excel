export interface Transaccion {
  numDocumentoIdObligado: string;
  numFactura: string;
  tipoNota: string | null;
  numNota: string | null;
  usuarios: Usuario[];
}

export interface Usuario {
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
  hospitalizacion: Hospitalizacion[];
  medicamentos: Medicamento[];
  otrosServicios: OtrosServico[];
}

export interface Consulta {
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

export interface Hospitalizacion {
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

export interface OtrosServico {
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
