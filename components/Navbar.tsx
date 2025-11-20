import React from 'react';
import { Activity } from 'lucide-react';
import { Button } from './ui/Button';

interface NavbarProps {
  setCurrentView: (view: string) => void;
}

export const Navbar = ({ setCurrentView }: NavbarProps) => (
  <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('landing')}>
          <div className="bg-teal-500/10 p-2 rounded-lg mr-3">
            <Activity className="w-6 h-6 text-teal-400" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text text-transparent">
            NeumoGuard
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">How it works</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Diseases</a>
          <Button variant="secondary" className="!py-2 !px-4 text-sm">Parent Access</Button>
        </div>
      </div>
    </div>
  </nav>
);
