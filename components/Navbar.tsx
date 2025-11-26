import React from 'react';
import { Activity, LogOut, History } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import Link from 'next/link';

export const Navbar = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center cursor-pointer">
            <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">
              predIAgnostic
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-purple-300 hover:text-purple-200 transition-colors text-sm">Cómo funciona</a>
            <a href="#diseases" className="text-purple-300 hover:text-purple-200 transition-colors text-sm">Enfermedades</a>
            
            {user ? (
              <>
                <Link href="/historial">
                  <button className="text-purple-300 hover:text-purple-200 transition-colors text-sm flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Historial
                  </button>
                </Link>
                <span className="text-slate-400 text-sm hidden lg:inline">{user.email}</span>
                <Button variant="secondary" onClick={handleLogout} className="py-2! px-4! text-sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="py-2! px-4! text-sm">Iniciar Sesión</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="secondary" className="py-2! px-4! text-sm">Registrarse</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
