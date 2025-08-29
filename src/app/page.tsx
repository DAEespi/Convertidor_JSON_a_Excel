"use client";

import { useState, useRef } from "react";
import { GenradorExcelJson } from "@/utils/generadorExcel";

export default function Home() {
  const [archivos, setArchivos] = useState<FileList | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readAllEntries = (
    dirReader: FileSystemDirectoryReader
  ): Promise<FileSystemEntry[]> => {
    return new Promise((resolve) => {
      const entries: FileSystemEntry[] = [];

      const readBatch = () => {
        dirReader.readEntries((batch) => {
          if (batch.length > 0) {
            entries.push(...batch);
            readBatch();
          } else {
            resolve(entries);
          }
        });
      };

      readBatch();
    });
  };

  const traverseFileTree = async (
    item: FileSystemEntry,
    path = ""
  ): Promise<File[]> => {
    if (item.isFile) {
      return new Promise((resolve) =>
        (item as FileSystemFileEntry).file((file: File) => resolve([file]))
      );
    } else if (item.isDirectory) {
      const dirReader = (item as FileSystemDirectoryEntry).createReader();
      const entries = await readAllEntries(dirReader);
      const results = await Promise.all(
        entries.map((entry) => traverseFileTree(entry, path + item.name + "/"))
      );
      return results.flat();
    } else {
      return [];
    }
  };

  const handleFolder = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArchivos(event.target.files);
    setError(null);
    setIsComplete(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const items = e.dataTransfer.items;
    const allFiles: File[] = [];

    for (let i = 0; i < items.length; i++) {
      const entry = items[i].webkitGetAsEntry?.();
      if (entry) {
        const files = await traverseFileTree(entry);
        allFiles.push(...files);
      }
    }

    if (allFiles.length > 0) {
      const dt = new DataTransfer();
      allFiles.forEach((f) => dt.items.add(f));
      setArchivos(dt.files);
      setError(null);
      setIsComplete(false);
    }
  };

  const handleGenerarExcel = async () => {
    if (!archivos) return;

    setIsProcessing(true);
    setError(null);
    setIsComplete(false);

    try {
      await GenradorExcelJson(archivos); // 🔥 usamos tu util real
      setIsComplete(true);
    } catch (err) {
      console.error("Error capturado:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido al procesar los archivos");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                RIPS JSON → Excel
              </h1>
              <p className="text-gray-600 mt-1">
                Convierte y consolida tus archivos RIPS JSON en Excel
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Seleccionar Archivos JSON
              </h2>
              <p className="text-gray-600 mt-2">
                Arrastra y suelta tu carpeta/archivos JSON o haz clic para
                seleccionarlos
              </p>
            </div>

            <div className="p-8">
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                  isDragOver
                    ? "border-emerald-400 bg-emerald-50 scale-[1.02]"
                    : "border-gray-300 hover:border-emerald-400 hover:bg-gray-50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  onChange={handleFolder}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  type="file"
                  multiple
                  accept=".json"
                  //@ts-expect-error para directorio
                  webkitdirectory="true"
                />

                <div className="space-y-6">
                  <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xl font-medium text-gray-900">
                      {archivos
                        ? `${archivos.length} archivo(s) seleccionado(s)`
                        : "Selecciona archivos JSON"}
                    </p>
                    <p className="text-gray-500 mt-2">
                      Formatos soportados: .json
                    </p>
                  </div>

                  <button
                    onClick={handleUploadClick}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Examinar archivos
                  </button>
                </div>
              </div>

              {/* File List */}
              {archivos && archivos.length > 0 && (
                <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Archivos seleccionados:
                  </h4>
                  <ul className="space-y-2">
                    {Array.from(archivos)
                      .slice(0, 5)
                      .map((file, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm"
                        >
                          {file.name}
                        </li>
                      ))}
                    {archivos.length > 5 && (
                      <p className="text-sm text-gray-500">
                        ... y {archivos.length - 5} archivo(s) más
                      </p>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerarExcel}
              disabled={!archivos || isProcessing}
              className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                  Procesando...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7"
                    />
                  </svg>
                  Generar Excel
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {isComplete && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <p className="text-emerald-700 font-medium">
                ✅ ¡Excel generado y descargado exitosamente!
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 w-full">
        <div className="px-6 py-6 text-center text-sm">
          Hecho por{" "}
          <span className="text-white font-semibold">Diego Alenjandro Espinel Benavidez🚀</span>
        </div>
      </footer>
    </div>
  );
}
