import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export interface PerfilNeonatal {
  riesgoMaternoInfeccioso: 'Alto' | 'Bajo';
  edadGestacional: 'Prematuro' | 'aTermino';
  histIctericiaHnos: 'Si' | 'No';
  tipoAlimentacion: 'Pecho' | 'Formula';
  edadNeonatal: '1_7Dias' | '2_4Semanas';
  Primiparidad: 'primerHijo' | 'Hnos';
  Sexo: 'M' | 'F';
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function usePerfilNeonatal() {
  const { user } = useAuth();
  const [perfil, setPerfil] = useState<PerfilNeonatal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const perfilDoc = await getDoc(doc(db, 'perfiles', user.uid));
        
        if (perfilDoc.exists()) {
          const data = perfilDoc.data() as PerfilNeonatal;
          setPerfil(data);
          // Guardar en localStorage como backup
          localStorage.setItem('perfilNeonatal', JSON.stringify(data));
        } else {
          // Intentar cargar desde localStorage
          const perfilLocal = localStorage.getItem('perfilNeonatal');
          if (perfilLocal) {
            setPerfil(JSON.parse(perfilLocal));
          } else {
            setPerfil(null);
          }
        }
      } catch (err) {
        console.error('Error cargando perfil:', err);
        setError('Error al cargar el perfil');
        
        // Intentar cargar desde localStorage en caso de error
        const perfilLocal = localStorage.getItem('perfilNeonatal');
        if (perfilLocal) {
          setPerfil(JSON.parse(perfilLocal));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [user]);

  return { perfil, loading, error };
}
