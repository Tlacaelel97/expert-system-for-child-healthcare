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
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface LandingPageProps {
  onStartAssessment: () => void;
}

export const LandingPage = ({ onStartAssessment }: LandingPageProps) => (
  <div className="min-h-screen pt-20">
    {/* Hero Section */}
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 mb-8">
          <BrainCircuit className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">5th Generation AI for Neonatology</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
          Protecting every <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">
            little breath
          </span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Intelligent monitoring system for parents. Early detection of pneumonia signs and 5 critical respiratory pathologies in neonates through predictive analysis.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={onStartAssessment} icon={Stethoscope}>
            Start AI Assessment
          </Button>
          <Button variant="outline" icon={Activity}>
            View Monitor Demo
          </Button>
        </div>
      </div>
    </div>

    {/* Features Grid */}
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:border-teal-500/50 transition-colors group">
          <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors">
            <Wind className="w-6 h-6 text-teal-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Pattern Analysis</h3>
          <p className="text-slate-400">
            Identifies irregularities in respiratory rate and intercostal retractions using computer vision and sensor data.
          </p>
        </Card>

        <Card className="hover:border-indigo-500/50 transition-colors group">
          <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Severity Prediction</h3>
          <p className="text-slate-400">
            Algorithm trained to classify pneumonia risk in 3 levels: Observation, Medical Consultation, or Emergency.
          </p>
        </Card>

        <Card className="hover:border-pink-500/50 transition-colors group">
          <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-500/20 transition-colors">
            <Baby className="w-6 h-6 text-pink-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Neonatal History</h3>
          <p className="text-slate-400">
            Evolutionary tracking designed specifically for the first weeks of life.
          </p>
        </Card>
      </div>
    </div>

    {/* Diseases Section */}
    <div className="border-t border-slate-800 bg-slate-900/50 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Detection Coverage</h2>
          <p className="text-slate-400">Our model is calibrated to identify markers of:</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {['Bacterial Pneumonia', 'Bronchiolitis', 'Respiratory Distress Syndrome', 'Transient Tachypnea', 'Infantile Asthma'].map((disease, i) => (
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
