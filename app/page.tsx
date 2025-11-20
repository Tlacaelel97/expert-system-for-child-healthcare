'use client'

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { LandingPage } from '@/components/LandingPage';
import { AssessmentForm } from '@/components/AssessmentForm';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <Navbar setCurrentView={setCurrentView} />
      
      <main className="transition-opacity duration-300">
        {currentView === 'landing' ? (
          <LandingPage onStartAssessment={() => setCurrentView('assessment')} />
        ) : (
          <AssessmentForm onBack={() => setCurrentView('landing')} />
        )}
      </main>

      {/* Footer Simple */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-600 text-sm">© 2024 NeumoGuard. Designed for neonatal care.</p>
        </div>
      </footer>
    </div>
  );
}