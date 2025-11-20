'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Expert System
                </h1>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px] md:max-w-none">
                  {user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 sm:px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium whitespace-nowrap"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Welcome to Dashboard
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
              You have successfully signed in. This is your main panel.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 sm:p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  User
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  {user?.email}
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 sm:p-6 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                  Status
                </h3>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  Active
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 sm:p-6 rounded-lg border border-purple-200 dark:border-purple-800 sm:col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Authentication
                </h3>
                <p className="text-purple-700 dark:text-purple-300 text-sm">
                  Firebase Auth
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
