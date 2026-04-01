'use client';

import { useState } from 'react';
import { ReferralForm } from '@/components/ReferralForm';

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);

  // Listen for success state from the form
  const handleSuccess = (success: boolean) => {
    setShowSuccess(success);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">
              Patient Referral Intake
            </h1>
            <p className="text-primary-100 mt-2">
              Submit a new patient referral for evaluation and treatment
            </p>
          </div>
          
          <div className="px-8 py-8">
            {/* Only show important message when not in success state */}
            {!showSuccess && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800">
                  <strong className="font-medium">Important:</strong> Please complete all required fields marked with (*). 
                  Once submitted, our team will review the referral and contact the patient within 24 hours.
                </p>
              </div>
            )}
            
            <ReferralForm onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
    </main>
  );
}