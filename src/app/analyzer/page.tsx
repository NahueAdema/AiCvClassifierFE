"use client";

import { useState } from "react";
import CVUploader from "@/components/CVUploader";
import CVResults from "@/components/CVResults";
import { CVAnalysisResponse } from "@/types/api";
import Link from "next/link";

export default function Analyzer() {
  const [analysisResult, setAnalysisResult] =
    useState<CVAnalysisResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAnalysisComplete = (result: CVAnalysisResponse) => {
    setAnalysisResult(result);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleLoading = (loadingState: boolean) => {
    setLoading(loadingState);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
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
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CVAnalyzer AI
              </span>
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg
              className="w-4 h-4 mr-2"
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
            Análisis con IA
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Analizador de CV
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sube un CV en formato PDF y obtén un análisis completo con
            puntuaciones, recomendaciones y próximos pasos.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-red-800 font-semibold">
                  Error al procesar
                </h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
                  <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-blue-800 font-semibold">
                    Procesando tu CV...
                  </h3>
                  <p className="text-blue-600 text-sm mt-1">
                    Nuestro sistema de IA está analizando el documento
                  </p>
                </div>
              </div>

              {/* Progress steps */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-blue-700">
                    Extrayendo información del PDF
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-blue-600">
                    Analizando habilidades técnicas
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
                  <span className="text-blue-500">
                    Generando recomendaciones
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!analysisResult ? (
          <CVUploader
            onAnalysisComplete={handleAnalysisComplete}
            onError={handleError}
            onLoading={handleLoading}
          />
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <button
                onClick={resetAnalysis}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Analizar otro CV
              </button>
            </div>
            <CVResults result={analysisResult} />
          </div>
        )}
      </div>
    </div>
  );
}
