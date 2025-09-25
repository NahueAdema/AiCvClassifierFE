"use client";

import { CVAnalysisResponse } from "@/types/api";

interface CVResultsProps {
  result: CVAnalysisResponse;
}

export default function CVResults({ result }: CVResultsProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "apto":
        return "bg-green-500 text-white";
      case "no apto":
        return "bg-red-500 text-white";
      case "revisar":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "apto":
        return "border-green-200 bg-green-50";
      case "no apto":
        return "border-red-200 bg-red-50";
      case "revisar":
        return "border-yellow-200 bg-yellow-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Card */}
      <div
        className={`border-2 ${getStatusBorderColor(
          result.predicted_class
        )} rounded-2xl p-8 shadow-lg`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <span
                className={`px-6 py-3 rounded-full font-bold text-lg ${getStatusColor(
                  result.predicted_class
                )}`}
              >
                {result.predicted_class}
              </span>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-500"
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
                <span className="text-gray-700 font-semibold">
                  Confianza: {formatPercentage(result.confidence)}
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Análisis Completado
            </h1>
            <p className="text-gray-600 text-lg">
              Resultado del análisis de {result.filename} ({result.file_size_kb}{" "}
              KB)
            </p>
          </div>

          {/* Quick Scores */}
          <div className="flex gap-4">
            <div className="text-center">
              <div
                className={`text-3xl font-bold px-4 py-2 rounded-lg ${getScoreColor(
                  result.cv_score
                )}`}
              >
                {result.cv_score}
              </div>
              <p className="text-sm text-gray-600 mt-1">CV Score</p>
            </div>
            <div className="text-center">
              <div
                className={`text-3xl font-bold px-4 py-2 rounded-lg ${getScoreColor(
                  result.tech_score
                )}`}
              >
                {result.tech_score}
              </div>
              <p className="text-sm text-gray-600 mt-1">Tech Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Candidate Info & Scores */}
        <div className="lg:col-span-1 space-y-6">
          {/* Candidate Info */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Información del Candidato
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-gray-700">
                  {result.cv_info?.email || "No especificado"}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm text-gray-700">
                  {result.cv_info?.phone || "No especificado"}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"
                  />
                </svg>
                <span className="text-sm text-gray-700">
                  {result.cv_info?.experience_years || 0} años de experiencia
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                <span className="text-sm text-gray-700">
                  {result.cv_info?.education || "No especificado"}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Scores */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Puntuaciones Detalladas
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Score CV
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {result.cv_score}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      getScoreColor(result.cv_score).includes("green")
                        ? "bg-green-500"
                        : getScoreColor(result.cv_score).includes("yellow")
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${result.cv_score}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Score Técnico
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {result.tech_score}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      getScoreColor(result.tech_score).includes("green")
                        ? "bg-green-500"
                        : getScoreColor(result.tech_score).includes("yellow")
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${result.tech_score}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Confianza
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {result.detailed_analysis?.confidence_score?.toFixed(1) ||
                      0}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-blue-500"
                    style={{
                      width: `${
                        result.detailed_analysis?.confidence_score || 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Analysis & Skills */}
        <div className="lg:col-span-2 space-y-6">
          {/* Probabilities */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Análisis de Probabilidades
            </h3>
            <div className="grid gap-4">
              {result.probabilities &&
              Object.entries(result.probabilities).length > 0 ? (
                Object.entries(result.probabilities).map(([status, prob]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-700">{status}</span>
                    <div className="flex items-center gap-3 flex-1 max-w-xs">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            status === "Apto"
                              ? "bg-green-500"
                              : status === "No Apto"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                          style={{ width: `${prob * 100}%` }}
                        />
                      </div>
                      <span className="font-bold text-gray-900 w-12">
                        {formatPercentage(prob)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-300 mb-3"
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
                  <p>No hay datos de probabilidades disponibles</p>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              Habilidades Técnicas
            </h3>
            <div className="flex flex-wrap gap-3">
              {result.cv_info?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full font-medium text-sm border border-blue-200 hover:shadow-md transition-shadow"
                >
                  {skill}
                </span>
              ))}
              {(!result.cv_info?.skills ||
                result.cv_info.skills.length === 0) && (
                <p className="text-gray-500 text-sm">
                  No se detectaron habilidades
                </p>
              )}
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {result.detailed_analysis?.title || "Análisis Detallado"}
            </h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-gray-700 leading-relaxed">
                {result.detailed_analysis?.executive_summary ||
                  "No hay resumen ejecutivo disponible."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-600"
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
                  Top 5 Habilidades
                </h4>
                <div className="space-y-2">
                  {result.detailed_analysis?.strengths_analysis?.technical_skills?.top_skills?.map(
                    (skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">
                          {skill}
                        </span>
                      </div>
                    )
                  )}
                  {(!result.detailed_analysis?.strengths_analysis
                    ?.technical_skills?.top_skills ||
                    result.detailed_analysis.strengths_analysis.technical_skills
                      .top_skills.length === 0) && (
                    <p className="text-gray-500 text-sm">
                      No hay habilidades destacadas
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  Recomendaciones
                </h4>
                <div className="space-y-2">
                  {result.detailed_analysis?.recommendations?.map(
                    (rec, index) => (
                      <div
                        key={index}
                        className="p-3 bg-purple-50 rounded-lg border border-purple-200"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-bold text-purple-700 bg-purple-200 px-2 py-1 rounded uppercase flex-shrink-0">
                            {rec.priority}
                          </span>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {rec.action}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                  {(!result.detailed_analysis?.recommendations ||
                    result.detailed_analysis.recommendations.length === 0) && (
                    <p className="text-gray-500 text-sm">
                      No hay recomendaciones disponibles
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg border border-green-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
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
              Próximos Pasos Recomendados
            </h3>
            <div className="grid gap-3">
              {result.detailed_analysis?.next_steps?.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg border border-green-200 shadow-sm"
                >
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </div>
              ))}
              {(!result.detailed_analysis?.next_steps ||
                result.detailed_analysis.next_steps.length === 0) && (
                <p className="text-gray-500 text-center py-4">
                  No hay próximos pasos definidos
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
