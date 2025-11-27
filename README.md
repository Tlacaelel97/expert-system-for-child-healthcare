# predIAgnostic

Sistema inteligente de monitoreo neonatal que utiliza Redes Bayesianas para detectar tempranamente signos críticos de neumonía y otras 5 patologías clave en neonatos, incluyendo Sepsis, Deshidratación e Ictericia.

## Características

- **Análisis Inteligente**: Red Bayesiana que analiza síntomas y perfil neonatal para inferir diagnósticos probables
- **Recomendación Médica**: Clasifica el nivel de atención en 3 categorías: Cuidados en Casa, Consulta Prioritaria o Urgencia Hospitalaria
- **Historial de Evaluaciones**: Registro completo que los padres pueden compartir con el médico
- **Autenticación**: Sistema de registro e inicio de sesión con Firebase
- **Perfil Neonatal**: Captura información del bebé para personalizar el análisis

## Patologías Detectadas

- Neumonía Neonatal
- Sepsis Neonatal
- Deshidratación Hipernatrémica
- Hiperbilirrubinemia (Ictericia)
- Estenosis Hipertrófica de Píloro

## Instalación

1. **Clonar el repositorio**
```bash
git clone git@github.com:Tlacaelel97/expert-system-for-child-healthcare.git
cd expert-system
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# API de Red Bayesiana 
NEXT_PUBLIC_API_URL=https://neonatal-diagnosis-api-985447916092.us-central1.run.app
```

4. **Ejecutar el servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Flujo de Usuario

1. **Registro/Login**: El usuario crea una cuenta o inicia sesión
2. **Perfil Neonatal**: Completa información del bebé (edad gestacional, tipo de alimentación, etc.)
3. **Evaluación**: Responde cuestionario sobre síntomas actuales del neonato
4. **Resultado**: Recibe recomendación basada en análisis de Red Bayesiana
5. **Historial**: Accede a evaluaciones previas para compartir con el médico

## Tecnologías

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Authentication & Firestore)
- **IA**: Red Bayesiana (API en Google Cloud Run)
- **UI**: Lucide Icons, Custom Components

## Estructura del Proyecto

```
expert-system/
├── app/                    # Páginas de Next.js
│   ├── dashboard/         # Dashboard principal
│   ├── historial/         # Historial de evaluaciones
│   ├── login/            # Página de login
│   ├── signup/           # Página de registro
│   └── perfil-neonatal/  # Formulario de perfil
├── components/            # Componentes reutilizables
│   ├── AssessmentForm.tsx # Formulario de evaluación
│   ├── LandingPage.tsx   # Página de inicio
│   └── Navbar.tsx        # Barra de navegación
├── contexts/             # Contextos de React
│   └── AuthContext.tsx   # Contexto de autenticación
├── hooks/                # Custom hooks
│   ├── useEvaluaciones.ts
│   └── usePerfilNeonatal.ts
└── lib/                  # Utilidades
    └── firebase.ts       # Configuración de Firebase
```

## Reglas de Firestore

Las reglas de seguridad están configuradas para:
- Usuarios solo pueden leer/escribir sus propios datos
- Colecciones: `perfiles`, `evaluaciones`

## API de Red Bayesiana

El sistema se conecta a una API de Red Bayesiana desplegada en Google Cloud Run que:
- Recibe 16 variables (7 del perfil + 9 síntomas)
- Retorna acción recomendada y nivel de confianza
- Endpoint: `POST /api/v1/diagnosis`

## Licencia

Este proyecto fue desarrollado como parte de un proyecto académico de Inteligencia Artificial.

## Autores

- [Josue E. Arguelles Sedano](mailto:josue.arguelles@umam.edu)
- [Carlos Camargo Romero](mailto:carlos.camargo@unam.edu)
- [Abraham Medina Varela](mailto:amedinavarela@ciencias.unam.mx)
- [Paulina Miranda García](mailto:pmg4682@gmail.com)
- [Tlacaelel J. Flores Villaseñor](mailto:tlacaelel.flores@ciencias.unam.mx)
