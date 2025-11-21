'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { AssessmentForm } from '@/components/AssessmentForm';

export default function DashboardPage() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

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
