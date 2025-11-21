'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Baby, ArrowRight } from 'lucide-react';

export default function PerfilNeonatalPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    riesgoMaternoInfeccioso: '',
    edadGestacional: '',
    histIctericiaHnos: '',
    tipoAlimentacion: '',
    edadNeonatal: '',
    Primiparidad: '',
    Sexo: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar que todos los campos estén completos
    const allFieldsFilled = Object.values(formData).every(value => value !== '');
    if (!allFieldsFilled) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      // Guardar en Firestore
      await setDoc(doc(db, 'perfiles', user.uid), {
        ...formData,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // También guardar en localStorage como backup
      localStorage.setItem('perfilNeonatal', JSON.stringify(formData));
      
      console.log('Perfil neonatal guardado exitosamente');
      
      // Redirigir al dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Error al guardar el perfil. Por favor intenta de nuevo.');
      console.error('Error guardando perfil:', err);
    } finally {
      setLoading(false);
    }
  };

  // Si no hay usuario, redirigir a login
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/10 rounded-full mb-4">
              <Baby className="w-8 h-8 text-teal-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Perfil del Neonato
            </h1>
            <p className="text-slate-400">
              Completa la información del bebé para personalizar el monitoreo
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Riesgo Materno Infeccioso */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Riesgo Materno Infeccioso
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Alto', 'Bajo'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleChange('riesgoMaternoInfeccioso', option)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.riesgoMaternoInfeccioso === option
                        ? 'border-teal-500 bg-teal-500/10 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Edad Gestacional */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Edad Gestacional
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'Prematuro', label: 'Prematuro' },
                  { value: 'aTermino', label: 'A Término' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('edadGestacional', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.edadGestacional === option.value
                        ? 'border-teal-500 bg-teal-500/10 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Historial de Ictericia en Hermanos */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Historial de Ictericia en Hermanos
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Si', 'No'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleChange('histIctericiaHnos', option)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.histIctericiaHnos === option
                        ? 'border-teal-500 bg-teal-500/10 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Tipo de Alimentación */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Tipo de Alimentación
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'Pecho', label: 'Lactancia Materna' },
                  { value: 'Formula', label: 'Fórmula' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('tipoAlimentacion', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.tipoAlimentacion === option.value
                        ? 'border-teal-500 bg-teal-500/10 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Edad Neonatal */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Edad del Neonato
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '1_7Dias', label: '1-7 Días' },
                  { value: '2_4Semanas', label: '2-4 Semanas' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('edadNeonatal', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.edadNeonatal === option.value
                        ? 'border-teal-500 bg-teal-500/10 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primiparidad */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Orden de Nacimiento
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'primerHijo', label: 'Primer Hijo' },
                  { value: 'Hnos', label: 'Tiene Hermanos' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('Primiparidad', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.Primiparidad === option.value
                        ? 'border-teal-500 bg-teal-500/10 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sexo */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Sexo del Bebé
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'M', label: 'Masculino' },
                  { value: 'F', label: 'Femenino' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('Sexo', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.Sexo === option.value
                        ? 'border-teal-500 bg-teal-500/10 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
            >
              {loading ? (
                'Guardando...'
              ) : (
                <>
                  Continuar al Dashboard
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
