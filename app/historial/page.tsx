'use client';

import { useEvaluaciones } from '@/hooks/useEvaluaciones';
import { Navbar } from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card } from '@/components/ui/Card';
import { Activity, Calendar, AlertCircle } from 'lucide-react';

export default function HistorialPage() {
  const { evaluaciones, loading, error } = useEvaluaciones();

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'bajo':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'moderado':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'alto':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <Navbar />
        
        <main className="pt-28 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white mb-3">Historial de Evaluaciones</h1>
              <p className="text-slate-400">Consulta todas las evaluaciones realizadas</p>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
              </div>
            )}

            {error && (
              <Card className="border-red-500/30 bg-red-500/10">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  <p className="text-red-400">{error}</p>
                </div>
              </Card>
            )}

            {!loading && !error && evaluaciones.length === 0 && (
              <Card>
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No hay evaluaciones</h3>
                  <p className="text-slate-400">Aún no has realizado ninguna evaluación</p>
                </div>
              </Card>
            )}

            {!loading && !error && evaluaciones.length > 0 && (
              <div className="space-y-4">
                {evaluaciones.map((evaluacion) => (
                  <Card key={evaluacion.id} className="hover:border-slate-600 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-teal-400" />
                        <span className="text-sm text-slate-400">
                          {formatDate(evaluacion.timestamp)}
                        </span>
                      </div>
                      <div className={`px-4 py-2 rounded-lg border ${getRiskColor(evaluacion.resultado.riskLevel)}`}>
                        <span className="font-semibold">
                          Riesgo {evaluacion.resultado.riskLevel}
                        </span>
                        <span className="ml-2 text-sm">
                          {evaluacion.resultado.probability}%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                        <h4 className="text-teal-400 font-medium mb-2 flex items-center">
                          <Activity className="w-4 h-4 mr-2" /> Diagnóstico
                        </h4>
                        <p className="text-white text-lg">{evaluacion.resultado.primarySuspect}</p>
                      </div>

                      <div className="bg-slate-800/30 p-4 rounded-xl">
                        <h4 className="text-slate-300 font-medium mb-2">Recomendación:</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {evaluacion.resultado.recommendation}
                        </p>
                      </div>

                      {/* Detalles de síntomas */}
                      <details className="group">
                        <summary className="cursor-pointer text-sm text-teal-400 hover:text-teal-300 transition-colors list-none flex items-center gap-2">
                          <span className="group-open:rotate-90 transition-transform">▶</span>
                          Ver detalles de síntomas
                        </summary>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs bg-slate-900/30 p-4 rounded-lg">
                          <div><span className="text-slate-500">Temperatura:</span> <span className="text-white">{evaluacion.sintomas.temperatura}</span></div>
                          <div><span className="text-slate-500">Consciencia:</span> <span className="text-white">{evaluacion.sintomas.nivelConsciencia}</span></div>
                          <div><span className="text-slate-500">Tos:</span> <span className="text-white">{evaluacion.sintomas.tos}</span></div>
                          <div><span className="text-slate-500">Esfuerzo Resp.:</span> <span className="text-white">{evaluacion.sintomas.esfuerzoRespiratorio}</span></div>
                          <div><span className="text-slate-500">Color Piel:</span> <span className="text-white">{evaluacion.sintomas.coloracionPiel}</span></div>
                          <div><span className="text-slate-500">Apetito:</span> <span className="text-white">{evaluacion.sintomas.apetitoSuccion}</span></div>
                          <div><span className="text-slate-500">Vómito:</span> <span className="text-white">{evaluacion.sintomas.caracteristicasVomito}</span></div>
                          <div><span className="text-slate-500">Heces:</span> <span className="text-white">{evaluacion.sintomas.colorHeces}</span></div>
                          <div><span className="text-slate-500">Pañales:</span> <span className="text-white">{evaluacion.sintomas.frecuenciaPanales}</span></div>
                          <div><span className="text-slate-500">Antibióticos:</span> <span className="text-white">{evaluacion.sintomas.usoAntibioticos}</span></div>
                        </div>
                      </details>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
