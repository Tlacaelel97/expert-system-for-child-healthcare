import React from 'react';
import { 
  Activity, 
  ShieldCheck, 
  BrainCircuit, 
  Wind, 
  Baby, 
  Stethoscope, 
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export const LandingPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleStartAssessment = () => {
    if (user) {
      // Si está autenticado, ir al dashboard
      router.push('/dashboard');
    } else {
      // Si no está autenticado, ir a login
      router.push('/login');
    }
  };

  return (
  <div className="min-h-screen pt-20">
    {/* Hero Section */}
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 mb-8">
          <BrainCircuit className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">IA de 5ª Generación para Neonatología</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
          Protegiendo cada <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-indigo-400">
            pequeño respiro
          </span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Sistema inteligente de monitoreo para padres. Detecta tempranamente signos críticos de neumonía y otras 5 patologías clave en neonatos, incluyendo Sepsis, Deshidratación e Ictericia, mediante análisis predictivo. Toma decisiones rápidas y seguras.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={handleStartAssessment} icon={Stethoscope}>
            Iniciar Evaluación IA
          </Button>
          <Button variant="outline" icon={Activity}>
            Ver Demo del Monitor
          </Button>
        </div>
      </div>
    </div>

    {/* Features Grid */}
    <div id="features" className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:border-teal-500/50 transition-colors group">
          <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors">
            <Wind className="w-6 h-6 text-teal-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Análisis de Patrones</h3>
          <p className="text-slate-400">
            Identifica irregularidades en la frecuencia respiratoria y tiraje intercostal usando visión computarizada y datos del sensor.
          </p>
        </Card>

        <Card className="hover:border-indigo-500/50 transition-colors group">
          <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Predicción de Gravedad</h3>
          <p className="text-slate-400">
            Algoritmo entrenado para clasificar el riesgo de enfermedades respiratorias en 3 niveles: Observación, Consulta Médica o Urgencia.
          </p>
        </Card>

        <Card className="hover:border-pink-500/50 transition-colors group">
          <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-500/20 transition-colors">
            <Baby className="w-6 h-6 text-pink-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Historial Neonatal</h3>
          <p className="text-slate-400">
            Seguimiento evolutivo diseñado específicamente para las primeras semanas de vida.
          </p>
        </Card>
      </div>
    </div>

    {/* Diseases Section */}
    <div id="diseases" className="border-t border-slate-800 bg-slate-900/50 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Cobertura de Detección</h2>
          <p className="text-slate-400">Nuestro modelo está calibrado para identificar marcadores de:</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {['Deshidratación Hipernatrémica', 'Estenosis Hipertrófica de Píloro', 'Neumonia Neonatal', 'Hiperbilirrubinemia', 'Sepsis Neonatal'].map((disease, i) => (
            <div key={i} className="flex items-center px-6 py-3 bg-slate-800 rounded-full border border-slate-700 text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-teal-500 mr-3" />
              {disease}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};
