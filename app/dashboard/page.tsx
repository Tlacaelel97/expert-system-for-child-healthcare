'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { AssessmentForm } from '@/components/AssessmentForm';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [checkingProfile, setCheckingProfile] = useState(true);

  useEffect(() => {
    const checkPerfilNeonatal = async () => {
      if (!user) return;

      try {
        // Verificar si el usuario tiene perfil en Firestore
        const perfilDoc = await getDoc(doc(db, 'perfiles', user.uid));
        
        if (!perfilDoc.exists()) {
          // Si no hay perfil en Firestore, verificar localStorage
          const perfilLocal = localStorage.getItem('perfilNeonatal');
          if (!perfilLocal) {
            // Si no hay perfil, redirigir a completarlo
            router.push('/perfil-neonatal');
            return;
          }
        } else {
          // Guardar en localStorage como backup
          localStorage.setItem('perfilNeonatal', JSON.stringify(perfilDoc.data()));
        }
      } catch (error) {
        console.error('Error verificando perfil:', error);
        // En caso de error, verificar localStorage
        const perfilLocal = localStorage.getItem('perfilNeonatal');
        if (!perfilLocal) {
          router.push('/perfil-neonatal');
        }
      } finally {
        setCheckingProfile(false);
      }
    };

    checkPerfilNeonatal();
  }, [user, router]);

  const handleBackToHome = () => {
    router.push('/');
  };

  if (checkingProfile) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen items-center justify-center bg-slate-950">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
            <p className="mt-4 text-slate-400">Verificando perfil...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-teal-500/30 selection:text-teal-200">
        <Navbar />
        
        <main className="transition-opacity duration-300">
          <AssessmentForm onBack={handleBackToHome} />
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-600 text-sm">© 2025 NeumoGuard. Diseñado para el cuidado neonatal.</p>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
