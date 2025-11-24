import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export interface Evaluacion {
  id: string;
  userId: string;
  timestamp: string;
  perfilNeonatal: {
    riesgoMaternoInfeccioso: string;
    edadGestacional: string;
    histIctericiaHnos: string;
    tipoAlimentacion: string;
    edadNeonatal: string;
    Primiparidad: string;
    Sexo: string;
  };
  sintomas: {
    usoAntibioticos: string;
    tos: string;
    temperatura: string;
    esfuerzoRespiratorio: string;
    apetitoSuccion: string;
    frecuenciaPanales: string;
    coloracionPiel: string;
    caracteristicasVomito: string;
    nivelConsciencia: string;
  };
  resultado: {
    riskLevel: string;
    probability: number;
    primarySuspect: string;
    recommendation: string;
  };
  createdAt: Timestamp | Date;
}

export function useEvaluaciones() {
  const { user } = useAuth();
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const q = query(
          collection(db, 'evaluaciones'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const evaluacionesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Evaluacion[];

        setEvaluaciones(evaluacionesData);
      } catch (err) {
        console.error('Error cargando evaluaciones:', err);
        setError('Error al cargar el historial de evaluaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluaciones();
  }, [user]);

  return { evaluaciones, loading, error };
}

export function useUltimaEvaluacion() {
  const { user } = useAuth();
  const [evaluacion, setEvaluacion] = useState<Evaluacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUltimaEvaluacion = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const q = query(
          collection(db, 'evaluaciones'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setEvaluacion({
            id: doc.id,
            ...doc.data()
          } as Evaluacion);
        }
      } catch (err) {
        console.error('Error cargando última evaluación:', err);
        setError('Error al cargar la última evaluación');
      } finally {
        setLoading(false);
      }
    };

    fetchUltimaEvaluacion();
  }, [user]);

  return { evaluacion, loading, error };
}
