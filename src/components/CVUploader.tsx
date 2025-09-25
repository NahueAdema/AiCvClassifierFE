"use client";

import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { CVAnalyzerService } from "@/app/services/cvAnalyzer";
import { CVAnalysisResponse } from "@/types/api";

interface CVUploaderProps {
  onAnalysisComplete: (result: CVAnalysisResponse) => void;
  onError: (error: string) => void;
  onLoading: (loading: boolean) => void;
}

export default function CVUploader({
  onAnalysisComplete,
  onError,
  onLoading,
}: CVUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobRequirements, setJobRequirements] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        onError("");
      } else {
        onError("Por favor selecciona un archivo PDF válido");
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        onError("");
      } else {
        onError("Por favor selecciona un archivo PDF válido");
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      onError("Por favor selecciona un archivo CV");
      return;
    }

    setIsAnalyzing(true);
    onLoading(true);

    try {
      const result = await CVAnalyzerService.analyzeCV(
        selectedFile,
        jobRequirements
      );
      onAnalysisComplete(result);
      onError("");
    } catch (error) {
      onError(
        error instanceof Error ? error.message : "Error al analizar el CV"
      );
    } finally {
      setIsAnalyzing(false);
      onLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Sube tu CV para análisis
          </h2>
          <p className="text-blue-100">
            Obtén un análisis completo con puntuaciones y recomendaciones
            personalizadas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Archivo CV (PDF)
            </label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : selectedFile
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isAnalyzing}
              />

              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {selectedFile.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {formatFileSize(selectedFile.size)}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Cambiar archivo
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Arrastra tu CV aquí
                  </h3>
                  <p className="text-gray-500 mb-4">
                    o{" "}
                    <span className="text-blue-600 font-medium">
                      haz clic para seleccionar
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Solo archivos PDF • Máximo 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Job Requirements */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Requisitos del trabajo
              <span className="text-gray-400 font-normal ml-2">(opcional)</span>
            </label>
            <div className="relative">
              <textarea
                value={jobRequirements}
                onChange={(e) => setJobRequirements(e.target.value)}
                placeholder="Describe los requisitos específicos del puesto, habilidades deseadas, experiencia necesaria, etc. Esto ayudará a personalizar el análisis..."
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                rows={4}
                disabled={isAnalyzing}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {jobRequirements.length}/500
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedFile || isAnalyzing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analizando CV...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Analizar CV con IA
              </>
            )}
          </button>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                Análisis Completo
              </h4>
              <p className="text-xs text-gray-600">
                Evaluación de habilidades y experiencia
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                100% Seguro
              </h4>
              <p className="text-xs text-gray-600">
                Tus datos están protegidos
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                Resultado Rápido
              </h4>
              <p className="text-xs text-gray-600">En menos de 30 segundos</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
