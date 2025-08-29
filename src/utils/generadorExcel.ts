import {
  Consulta,
  Hospitalizacion,
  Medicamento,
  OtrosServico,
  Procedimiento,
  Transaccion,
  Usuario,
} from "@/interfaces/data";
import ExcelJS from "exceljs";
import { EncabezadosMap } from "./encabezadosMap";

export async function GenradorExcelJson(files: FileList) {
  const transacciones: Omit<Transaccion, "usuarios">[] = [];
  const usuarios: Omit<Usuario, "servicios">[] = [];
  const consultas: Consulta[] = [];
  const procedimientos: Procedimiento[] = [];
  const hospitalizacion: Hospitalizacion[] = [];
  const medicamentos: Medicamento[] = [];
  const otrosServicios: OtrosServico[] = [];

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
      usuarios.push(restUser);

      if (servicios.consultas) {
        consultas.push(...servicios.consultas);
      }

      if (servicios.procedimientos) {
        procedimientos.push(...servicios.procedimientos);
      }

      if (servicios.hospitalizacion) {
        hospitalizacion.push(...servicios.hospitalizacion);
      }
      if (servicios.medicamentos) {
        medicamentos.push(...servicios.medicamentos);
      }

      if (servicios.otrosServicios) {
        otrosServicios.push(...servicios.otrosServicios);
      }
    });
  }

  const workbook = new ExcelJS.Workbook();

  const addSheet = <T extends object>(nombre: string, data: T[]) => {
    const sheet = workbook.addWorksheet(nombre);
    if (data.length > 0) {
      const map = EncabezadosMap[nombre as keyof typeof EncabezadosMap] ?? {};
      const keys = Array.from(
        new Set(
          data.flatMap((obj) => Object.keys(obj as Record<string, unknown>))
        )
      );

      sheet.columns = keys.map((key) => ({
        header: (map as Record<string, string>)[key] ?? key,
        key: key,
      }));
      sheet.addRows(data);
    }
  };

  addSheet("transaccion", transacciones);
  addSheet("usuario", usuarios);
  addSheet("consultas", consultas);
  addSheet("procedimientos", procedimientos);
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
