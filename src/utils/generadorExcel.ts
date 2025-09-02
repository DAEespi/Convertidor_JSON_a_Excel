import {
  Consulta,
  Hospitalizacion,
  Medicamento,
  OtrosServicios,
  Procedimiento,
  Transaccion,
  Urgencia,
  Usuario,
} from "@/interfaces/data";
import ExcelJS from "exceljs";
import { EncabezadosMap } from "./encabezadosMap";

export async function GenradorExcelJson(files: FileList) {
  const transacciones: Omit<Transaccion, "usuarios">[] = [];
  const usuarios: Omit<Usuario, "servicios">[] = [];
  const consultas: Consulta[] = [];
  const procedimientos: Procedimiento[] = [];
  const urgencias: Urgencia[] = [];
  const hospitalizacion: Hospitalizacion[] = [];
  const medicamentos: Medicamento[] = [];
  const otrosServicios: OtrosServicios[] = [];

  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]; // pocada recorrido va guardandoun archivo (JSON) en (FILE)
    const text = await file.text(); //El .text lee el contenido del archivo

    let transaccion: Transaccion;
    try {
      transaccion = JSON.parse(text);
    } catch {
      throw new Error(
        `El archivo "${file.name}" no tiene una Transaccion válida`
      );
    }
    const { usuarios: usuarioData, ...restdata } = transaccion; //desestruturacion de datos
    transacciones.push(restdata);

    if (!Array.isArray(usuarioData)) {
      throw new Error(
        `El archivo "${file.name}" no tiene un campo "usuarios válido`
      );
    }
    usuarioData.forEach((u) => {
      const { servicios, ...restUser } = u;
      usuarios.push({ ...restUser, numFactura: restdata.numFactura });

      if (servicios.consultas) {
        consultas.push(
          ...servicios.consultas.map((c) => ({
            ...c,
            numFactura: restdata.numFactura,
          }))
        );
      }

      if (servicios.procedimientos) {
        procedimientos.push(
          ...servicios.procedimientos.map((p) => ({
            ...p,
            numFactura: restdata.numFactura,
          }))
        );
      }

      if (servicios.urgencias) {
        urgencias.push(
          ...servicios.urgencias.map((u) => ({
            ...u,
            numFactura: restdata.numFactura,
          }))
        );
      }

      if (servicios.hospitalizacion) {
        hospitalizacion.push(
          ...servicios.hospitalizacion.map((h) => ({
            ...h,
            numFactura: restdata.numFactura,
          }))
        );
      }
      if (servicios.medicamentos) {
        medicamentos.push(
          ...servicios.medicamentos.map((m) => ({
            ...m,
            numFactura: restdata.numFactura,
          }))
        );
      }

      if (servicios.otrosServicios) {
        otrosServicios.push(
          ...servicios.otrosServicios.map((o) => ({
            ...o,
            numFactura: restdata.numFactura,
          }))
        );
      }
    });
  }

  const workbook = new ExcelJS.Workbook();

  const addSheet = <T extends object>(nombre: string, data: T[]) => {
    const sheet = workbook.addWorksheet(nombre);
    if (data.length > 0) {
      const map: Record<string, string> =
        EncabezadosMap[nombre as keyof typeof EncabezadosMap] ?? {};
      const keys = Object.keys(map);

      sheet.columns = keys.map((key) => ({
        header: map[key],
        key: key,
      }));

      const filteredData = data.map((obj) => {
        const filtered: Record<string, unknown> = {};
        keys.forEach((k) => {
          filtered[k] = (obj as Record<string, unknown>)[k] ?? "";
        });
        return filtered;
      });
      sheet.addRows(filteredData);
    }
  };

  addSheet("transaccion", transacciones);
  addSheet("usuario", usuarios);
  addSheet("consultas", consultas);
  addSheet("procedimientos", procedimientos);
  addSheet("urgencia", urgencias);
  addSheet("hospitalizacion", hospitalizacion);
  addSheet("medicamentos", medicamentos);
  addSheet("otrosServicios", otrosServicios);

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const fileName = `Consolidado_RIPS_2275_${
    new Date().toISOString().split("T")[0]
  }.xlsx`;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
