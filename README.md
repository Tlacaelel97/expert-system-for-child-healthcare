# predIAgnostic

Intelligent neonatal monitoring system that uses Bayesian Networks to detect early critical signs of pneumonia and 5 other key pathologies in neonates, including Sepsis, Dehydration, and Jaundice.

## Features

- **Intelligent Analysis**: Bayesian Network that analyzes symptoms and neonatal profile to infer probable diagnoses
- **Medical Recommendation**: Classifies the level of care required into 3 categories: Home Care, Priority Consultation, or Hospital Emergency
- **Evaluation History**: Complete record that parents can share with the doctor
- **Authentication**: Registration and login system with Firebase
- **Neonatal Profile**: Captures baby information to personalize the analysis

## Detected Pathologies

- Neonatal Pneumonia
- Neonatal Sepsis
- Hypernatremic Dehydration
- Hyperbilirubinemia (Jaundice)
- Hypertrophic Pyloric Stenosis

## Installation

1. **Clone the repository**
```bash
git clone git@github.com:Tlacaelel97/expert-system-for-child-healthcare.git
cd expert-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the project root with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Bayesian Network API 
NEXT_PUBLIC_API_URL=https://neonatal-diagnosis-api-985447916092.us-central1.run.app
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## User Flow

1. **Registration/Login**: User creates an account or logs in
2. **Neonatal Profile**: Completes baby information (gestational age, feeding type, etc.)
3. **Evaluation**: Answers questionnaire about current neonate symptoms
4. **Result**: Receives recommendation based on Bayesian Network analysis
5. **History**: Accesses previous evaluations to share with the doctor

## Technologies

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Authentication & Firestore)
- **AI**: Bayesian Network (API on Google Cloud Run)
- **UI**: Lucide Icons, Custom Components

## Project Structure

```
expert-system/
├── app/                    # Next.js pages
│   ├── dashboard/         # Main dashboard
│   ├── historial/         # Evaluation history
│   ├── login/            # Login page
│   ├── signup/           # Registration page
│   └── perfil-neonatal/  # Profile form
├── components/            # Reusable components
│   ├── AssessmentForm.tsx # Evaluation form
│   ├── LandingPage.tsx   # Landing page
│   └── Navbar.tsx        # Navigation bar
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
├── hooks/                # Custom hooks
│   ├── useEvaluaciones.ts
│   └── usePerfilNeonatal.ts
└── lib/                  # Utilities
    └── firebase.ts       # Firebase configuration
```

## Firestore Rules

Security rules are configured for:
- Users can only read/write their own data
- Collections: `perfiles`, `evaluaciones`

## Bayesian Network API

The system connects to a Bayesian Network API deployed on Google Cloud Run that:
- Receives 16 variables (7 from profile + 9 symptoms)
- Returns recommended action and confidence level
- Endpoint: `POST /api/v1/diagnosis`

## License

This project was developed as part of an Artificial Intelligence academic project.

## Authors

- [Josue E. Arguelles Sedano](mailto:josue.arguelles@umam.edu)
- [Carlos Camargo Romero](mailto:carlos.camargo@unam.edu)
- [Abraham Medina Varela](mailto:amedinavarela@ciencias.unam.mx)
- [Paulina Miranda García](mailto:pmg4682@gmail.com)
- [Tlacaelel J. Flores Villaseñor](mailto:tlacaelel.flores@ciencias.unam.mx)
