import React, { useState } from 'react';
import { 
  Activity, 
  BrainCircuit, 
  Thermometer, 
  Wind, 
  ArrowRight, 
  AlertTriangle,
  FileText,
  Baby,
} from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
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
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    usoAntibioticos: '',
    tos: '',
    temperatura: '',
    esfuerzoRespiratorio: '',
    apetitoSuccion: '',
    frecuenciaPanales: '',
    coloracionPiel: '',
    caracteristicasVomito: '',
    nivelConsciencia: '',
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Mapeo de acciones a niveles de riesgo y recomendaciones
  const mapearAccionAResultado = (accion: string, confianza: number) => {
    const mapeo: Record<string, { riskLevel: string; primarySuspect: string; recommendation: string }> = {
      'Urgencia_Hospital': {
        riskLevel: 'Alto',
        primarySuspect: 'Requiere Atención Hospitalaria Inmediata',
        recommendation: 'Se detectan signos de alerta graves. Acuda al hospital de inmediato para evaluación y tratamiento urgente.'
      },
      'Consulta_Prioritaria': {
        riskLevel: 'Moderado',
        primarySuspect: 'Requiere Consulta Médica Prioritaria',
        recommendation: 'Se detectan signos de alerta que requieren evaluación médica prioritaria. Consulte con un pediatra lo antes posible.'
      },
      'Cuidados_Casa': {
        riskLevel: 'Bajo',
        primarySuspect: 'Puede Manejarse con Cuidados en Casa',
        recommendation: 'Los síntomas pueden manejarse con cuidados en casa. Monitoree al bebé y consulte si los síntomas empeoran.'
      }
    };

    return {
      ...mapeo[accion],
      probability: Math.round(confianza * 100)
    };
  };

  const handleSubmit = async () => {
    console.log('Datos de evaluación:', formData);
    
    // Validar que todos los campos estén completos
    const camposVacios = Object.entries(formData).filter(([_, value]) => !value);
    if (camposVacios.length > 0) {
      alert('Por favor completa todos los campos del formulario antes de continuar.');
      console.error('Campos vacíos:', camposVacios.map(([key]) => key));
      return;
    }
    
    setAnalyzing(true);

    try {
      // Obtener perfil neonatal del localStorage
      const perfilNeonatal = JSON.parse(localStorage.getItem('perfilNeonatal') || '{}');

      // Preparar datos para la API
      const apiPayload = {
        riesgoMaternoInfeccioso: perfilNeonatal.riesgoMaternoInfeccioso,
        edadGestacional: perfilNeonatal.edadGestacional,
        histIctericiaHnos: perfilNeonatal.histIctericiaHnos,
        tipoAlimentacion: perfilNeonatal.tipoAlimentacion,
        edadNeonatal: perfilNeonatal.edadNeonatal,
        Primiparidad: perfilNeonatal.Primiparidad,
        Sexo: perfilNeonatal.Sexo,
        usoAntibioticos: formData.usoAntibioticos,
        tos: formData.tos,
        temperatura: formData.temperatura,
        esfuerzoRespiratorio: formData.esfuerzoRespiratorio,
        apetitoSuccion: formData.apetitoSuccion,
        frecuenciaPanales: formData.frecuenciaPanales,
        coloracionPiel: formData.coloracionPiel,
        caracteristicasVomito: formData.caracteristicasVomito,
        nivelConsciencia: formData.nivelConsciencia
      };

      console.log('Perfil Neonatal:', perfilNeonatal);
      console.log('Form Data:', formData);
      console.log('API Payload:', apiPayload);
      console.log('API Payload JSON:', JSON.stringify(apiPayload, null, 2));

      // Llamada a la API de Red Bayesiana
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://neonatal-diagnosis-api-985447916092.us-central1.run.app';
      const response = await fetch(`${API_URL}/api/v1/diagnosis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload)
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Error en la API: ${response.status} - ${errorText}`);
      }

      const apiResponse = await response.json();
      console.log('Respuesta de API:', apiResponse);

      // Mapear respuesta de la API a formato del resultado
      const resultado = mapearAccionAResultado(
        apiResponse.recomendacion_principal,
        apiResponse.confianza
      );

      // Guardar evaluación en Firestore con datos completos de la API
      if (user) {
        await addDoc(collection(db, 'evaluaciones'), {
          userId: user.uid,
          timestamp: new Date().toISOString(),
          perfilNeonatal: perfilNeonatal,
          sintomas: formData,
          resultado: resultado,
          apiResponse: apiResponse, // Guardar respuesta completa de la API
          createdAt: new Date()
        });
        console.log('Evaluación guardada en Firestore');
      }

      setAnalyzing(false);
      setResult(resultado);
    } catch (error) {
      console.error('Error al procesar evaluación:', error);
      setAnalyzing(false);
      setResult({
        riskLevel: 'Error',
        probability: 0,
        primarySuspect: 'Error en análisis',
        recommendation: 'No se pudo completar el análisis. Por favor intente nuevamente.'
      });
    }
  };

  if (analyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center pt-20">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-purple-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <BrainCircuit className="absolute inset-0 m-auto text-purple-400 w-12 h-12 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Analizando Biomarcadores</h2>
        <p className="text-slate-400">Procesando síntomas con la base de datos neumológica...</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen pt-28 px-4 max-w-3xl mx-auto">
        <Card className="border-l-4 border-l-purple-400">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold mb-1">Resultado del Análisis</p>
              <h2 className="text-3xl font-bold text-white">Riesgo {result.riskLevel}</h2>
            </div>
            <div className="bg-purple-500/20 px-4 py-2 rounded-lg">
              <span className="text-purple-300 font-bold text-xl">{result.probability}%</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-300 font-medium mb-2 flex items-center">
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
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-purple-400' : 'bg-slate-700'}`} />
          ))}
        </div>

        <Card>
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl text-white font-semibold mb-4 flex items-center">
                <Thermometer className="mr-2 text-purple-400" /> Signos Vitales y Medicación
              </h3>
              
              {/* Uso de Antibióticos */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">¿Ha usado antibióticos recientemente?</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Si', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleFieldChange('usoAntibioticos', option)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.usoAntibioticos === option
                          ? 'border-purple-400 bg-purple-400/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperatura */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Temperatura Corporal
                  <span className="text-xs text-slate-500 ml-2">(Hipotermia &lt; 36°C, Fiebre &gt; 38°C)</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'Hipotermia', label: 'Hipotermia', color: 'blue' },
                    { value: 'Normal', label: 'Normal', color: 'green' },
                    { value: 'Fiebre', label: 'Fiebre', color: 'red' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFieldChange('temperatura', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.temperatura === option.value
                          ? 'border-purple-400 bg-purple-400/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nivel de Consciencia */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Nivel de Consciencia</label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'Alerta', label: 'Alerta y Activo' },
                    { value: 'irritableLlanto', label: 'Irritable / Llanto Excesivo' },
                    { value: 'noDespierta_Flacido', label: 'No Despierta / Flácido' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFieldChange('nivelConsciencia', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.nivelConsciencia === option.value
                          ? 'border-purple-400 bg-purple-400/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full mt-4" onClick={() => setStep(2)}>Siguiente</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl text-white font-semibold mb-4 flex items-center">
                <Wind className="mr-2 text-purple-400" /> Síntomas Respiratorios
              </h3>

              {/* Tos */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Tipo de Tos</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'Ausente', label: 'Ausente' },
                    { value: 'Seca', label: 'Seca' },
                    { value: 'Flemas', label: 'Con Flemas' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFieldChange('tos', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.tos === option.value
                          ? 'border-purple-400 bg-purple-400/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Esfuerzo Respiratorio */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Esfuerzo Respiratorio</label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'Normal', label: 'Normal - Respiración tranquila' },
                    { value: 'Hundimiento', label: 'Hundimiento - Tiraje intercostal' },
                    { value: 'Aleteo', label: 'Aleteo Nasal' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFieldChange('esfuerzoRespiratorio', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.esfuerzoRespiratorio === option.value
                          ? 'border-purple-400 bg-purple-400/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coloración de Piel */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Coloración de la Piel</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'Normal', label: 'Normal' },
                    { value: 'Azulada', label: 'Azulada' },
                    { value: 'Amarillenta', label: 'Amarillenta' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFieldChange('coloracionPiel', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.coloracionPiel === option.value
                          ? 'border-purple-400 bg-purple-400/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {option.label}
                    </button>
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
                <Baby className="mr-2 text-purple-400" /> Alimentación y Digestión
              </h3>

              {/* Apetito y Succión */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Apetito y Succión</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'Rechaza', label: 'Rechaza' },
                    { value: 'Normal', label: 'Normal' },
                    { value: 'Voraz', label: 'Voraz' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFieldChange('apetitoSuccion', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.apetitoSuccion === option.value
                          ? 'border-purple-400 bg-purple-400/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Características del Vómito */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Características del Vómito</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'Ninguno', label: 'Ninguno' },
                    { value: 'Regurgitacion', label: 'Regurgitación' },
                    { value: 'Proyectil', label: 'Proyectil' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFieldChange('caracteristicasVomito', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.caracteristicasVomito === option.value
                          ? 'border-purple-400 bg-purple-400/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frecuencia de Pañales */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Frecuencia de Pañales Mojados</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'Normal', label: 'Normal (6+/día)' },
                    { value: 'Pocos', label: 'Pocos (3-5/día)' },
                    { value: 'Ninguno', label: 'Ninguno/Muy pocos' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFieldChange('frecuenciaPanales', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.frecuenciaPanales === option.value
                          ? 'border-purple-400 bg-purple-400/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                 <Button variant="secondary" onClick={() => setStep(2)} className="flex-1">Atrás</Button>
                 <Button onClick={() => setStep(4)} className="flex-1">Siguiente</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
               <h3 className="text-xl text-white font-semibold mb-4 flex items-center">
                <FileText className="mr-2 text-purple-400" /> Revisión Final
              </h3>

              <div className="bg-slate-900/50 p-4 rounded-xl border border-purple-500/30 space-y-3">
                <p className="text-sm text-slate-400">Revise los datos ingresados:</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-slate-500">Antibióticos:</span> <span className="text-white">{formData.usoAntibioticos || '-'}</span></div>
                  <div><span className="text-slate-500">Temperatura:</span> <span className="text-white">{formData.temperatura || '-'}</span></div>
                  <div><span className="text-slate-500">Consciencia:</span> <span className="text-white">{formData.nivelConsciencia || '-'}</span></div>
                  <div><span className="text-slate-500">Tos:</span> <span className="text-white">{formData.tos || '-'}</span></div>
                  <div><span className="text-slate-500">Esfuerzo Resp.:</span> <span className="text-white">{formData.esfuerzoRespiratorio || '-'}</span></div>
                  <div><span className="text-slate-500">Color Piel:</span> <span className="text-white">{formData.coloracionPiel || '-'}</span></div>
                  <div><span className="text-slate-500">Apetito:</span> <span className="text-white">{formData.apetitoSuccion || '-'}</span></div>
                  <div><span className="text-slate-500">Vómito:</span> <span className="text-white">{formData.caracteristicasVomito || '-'}</span></div>
                  <div><span className="text-slate-500">Pañales:</span> <span className="text-white">{formData.frecuenciaPanales || '-'}</span></div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <p className="text-sm text-purple-200">
                  Al presionar &quot;Analizar&quot;, los datos serán procesados por el modelo predictivo. Esto no sustituye una consulta médica profesional.
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                 <Button variant="secondary" onClick={() => setStep(3)} className="flex-1">Atrás</Button>
                 <Button onClick={handleSubmit} className="flex-1" icon={BrainCircuit}>Analizar con IA</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
