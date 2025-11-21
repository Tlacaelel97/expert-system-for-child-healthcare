import React, { useState } from 'react';
import { 
  Activity, 
  BrainCircuit, 
  Thermometer, 
  Wind, 
  ArrowRight, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface AssessmentFormProps {
  onBack: () => void;
}

interface AnalysisResult {
  riskLevel: string;
  probability: number;
  primarySuspect: string;
  recommendation: string;
}

export const AssessmentForm = ({ onBack }: AssessmentFormProps) => {
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Simulación de proceso de IA
  const handleSubmit = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        riskLevel: 'Moderado',
        probability: 68,
        primarySuspect: 'Bronquiolitis',
        recommendation: 'Se detecta sibilancia leve y frecuencia respiratoria elevada. Se recomienda consulta pediátrica en las próximas 24h.'
      });
    }, 2500);
  };

  if (analyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center pt-20">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-teal-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <BrainCircuit className="absolute inset-0 m-auto text-teal-500 w-12 h-12 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Analizando Biomarcadores</h2>
        <p className="text-slate-400">Procesando síntomas con la base de datos neumológica...</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen pt-28 px-4 max-w-3xl mx-auto">
        <Card className="border-l-4 border-l-amber-500">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold mb-1">Resultado del Análisis</p>
              <h2 className="text-3xl font-bold text-white">Riesgo {result.riskLevel}</h2>
            </div>
            <div className="bg-amber-500/20 px-4 py-2 rounded-lg">
              <span className="text-amber-400 font-bold text-xl">{result.probability}%</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
              <h3 className="text-teal-400 font-medium mb-2 flex items-center">
                <Activity className="w-4 h-4 mr-2" /> Posible Afección
              </h3>
              <p className="text-white text-lg">{result.primarySuspect}</p>
            </div>

            <div className="bg-slate-700/30 p-4 rounded-xl">
              <h3 className="text-slate-300 font-medium mb-2">Recomendación IA:</h3>
              <p className="text-slate-400 leading-relaxed">{result.recommendation}</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="flex-1">Contactar Pediatra</Button>
              <Button variant="secondary" onClick={() => { setResult(null); setStep(1); }} className="flex-1">Nueva Evaluación</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center text-slate-400 hover:text-white cursor-pointer transition-colors" onClick={onBack}>
          <ArrowRight className="w-5 h-5 rotate-180 mr-2" />
          Volver al inicio
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Evaluación de Síntomas</h2>
          <p className="text-slate-400">Complete los datos actuales del neonato para que el modelo realice la predicción.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-teal-500' : 'bg-slate-700'}`} />
          ))}
        </div>

        <Card>
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl text-white font-semibold mb-4 flex items-center">
                <Thermometer className="mr-2 text-teal-400" /> Signos Vitales
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Temperatura Corporal (°C)</label>
                <input type="number" placeholder="Ej: 37.5" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Frecuencia Respiratoria (respiraciones/min)</label>
                <div className="flex gap-4">
                  <input type="number" placeholder="Ej: 45" className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500" />
                  <button className="bg-slate-700 px-4 rounded-xl text-slate-300 hover:bg-slate-600 transition-colors">
                    <Activity className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">Utilice el botón para usar el contador manual.</p>
              </div>

              <Button className="w-full mt-4" onClick={() => setStep(2)}>Siguiente</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl text-white font-semibold mb-4 flex items-center">
                <Wind className="mr-2 text-indigo-400" /> Observación Respiratoria
              </h3>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-300">¿Observa hundimiento de costillas al respirar (Tiraje)?</label>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 rounded-xl border border-slate-600 hover:border-teal-500 hover:bg-teal-500/10 text-slate-300 hover:text-white transition-all text-left">
                    No, respira normal
                  </button>
                  <button className="p-4 rounded-xl border border-slate-600 hover:border-teal-500 hover:bg-teal-500/10 text-slate-300 hover:text-white transition-all text-left">
                    Sí, leve o marcado
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-300">Sonidos audibles (sin estetoscopio)</label>
                <div className="space-y-2">
                  {['Sibilancia (Silbido)', 'Quejido', 'Tos seca', 'Ninguno'].map((opt) => (
                    <label key={opt} className="flex items-center p-3 rounded-lg bg-slate-900 border border-slate-700 cursor-pointer hover:border-slate-500">
                      <input type="checkbox" className="w-4 h-4 text-teal-500 rounded bg-slate-800 border-slate-600 focus:ring-teal-500" />
                      <span className="ml-3 text-slate-300">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                 <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">Atrás</Button>
                 <Button onClick={() => setStep(3)} className="flex-1">Siguiente</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
               <h3 className="text-xl text-white font-semibold mb-4 flex items-center">
                <FileText className="mr-2 text-pink-400" /> Contexto General
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Edad del Neonato (Semanas)</label>
                <input type="number" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white" />
              </div>

              <div>
                 <label className="block text-sm font-medium text-slate-300 mb-2">Comportamiento</label>
                 <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500">
                   <option>Normal / Activo</option>
                   <option>Letárgico / Adormecido</option>
                   <option>Irritable / Llorando</option>
                   <option>Rechazo al alimento</option>
                 </select>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-lg flex items-start gap-3 mt-6">
                <AlertTriangle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-200">
                  Al presionar &quot;Analizar&quot;, los datos serán procesados por el modelo predictivo. Esto no sustituye una consulta médica profesional.
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                 <Button variant="secondary" onClick={() => setStep(2)} className="flex-1">Atrás</Button>
                 <Button onClick={handleSubmit} className="flex-1" icon={BrainCircuit}>Analizar con IA</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
