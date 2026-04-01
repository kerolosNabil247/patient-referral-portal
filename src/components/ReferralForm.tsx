'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { referralSchema, type ReferralInput } from '@/lib/validations/referral.schema';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { api } from '@/lib/api';

const LOCATIONS = [
  { value: 'Anaheim', label: 'Anaheim' },
  { value: 'Culver City', label: 'Culver City' },
  { value: 'Downey', label: 'Downey' },
  { value: 'El Monte', label: 'El Monte' },
  { value: 'Long Beach', label: 'Long Beach' },
  { value: 'Los Angeles', label: 'Los Angeles' },
];

interface ReferralFormProps {
  onSuccess?: (success: boolean) => void;
}

export const ReferralForm: React.FC<ReferralFormProps> = ({ onSuccess }) => {
  const [submitSuccess, setSubmitSuccess] = useState<{ 
    message: string; 
    referralId: string; 
    estimatedFollowUp: string 
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset,
  } = useForm<ReferralInput>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      lawFirmName: '',
      attorneyName: '',
      attorneyEmail: '',
      attorneyPhone: '',
      primaryComplaint: '',
      preferredLocation: undefined,
      appointmentType: 'In-Person',
    },
    mode: 'onChange',
  });
  
  // Notify parent component when success state changes
  useEffect(() => {
    if (onSuccess) {
      onSuccess(!!submitSuccess);
    }
  }, [submitSuccess, onSuccess]);
  
  const submitMutation = api.referral.submitReferral.useMutation({
    onSuccess: (data) => {
      setSubmitSuccess({
        message: data.message,
        referralId: data.referralId,
        estimatedFollowUp: data.estimatedFollowUp,
      });
      setSubmitError(null);
      reset();
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onError: (error) => {
      setSubmitError(error.message || 'An error occurred. Please try again.');
      setSubmitSuccess(null);
      if (onSuccess) onSuccess(false);
    },
  });
  
  const onSubmit = (data: ReferralInput) => {
    submitMutation.mutate(data);
  };
  
  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-green-800 mb-2">Referral Submitted Successfully!</h3>
        <p className="text-green-700 text-lg">{submitSuccess.estimatedFollowUp}</p>
        <Button
          onClick={() => {
            setSubmitSuccess(null);
            if (onSuccess) onSuccess(false);
          }}
          variant="secondary"
          className="mt-6"
        >
          Submit Another Referral
        </Button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">Error submitting referral</p>
          <p>{submitError}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message}
          required
        />
        <Input
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Date of Birth"
          type="date"
          placeholder="YYYY-MM-DD"
          {...register('dateOfBirth')}
          error={errors.dateOfBirth?.message}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="(555) 555-5555"
          {...register('phoneNumber')}
          error={errors.phoneNumber?.message}
          required
        />
      </div>
      
      <Input
        label="Email Address"
        type="email"
        placeholder="patient@example.com"
        {...register('email')}
        error={errors.email?.message}
      />
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Referring Law Firm Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Law Firm Name"
            {...register('lawFirmName')}
            error={errors.lawFirmName?.message}
            required
          />
          <Input
            label="Attorney/Case Manager Name"
            {...register('attorneyName')}
            error={errors.attorneyName?.message}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Attorney Email"
            type="email"
            placeholder="name@lawfirm.com"
            {...register('attorneyEmail')}
            error={errors.attorneyEmail?.message}
            required
          />
          <Input
            label="Attorney Phone"
            type="tel"
            placeholder="(555) 555-5555"
            {...register('attorneyPhone')}
            error={errors.attorneyPhone?.message}
            required
          />
        </div>
      </div>
      
      <Textarea
        label="Primary Complaint / Reason for Referral"
        placeholder="Please describe the patient's primary complaint or reason for referral..."
        {...register('primaryComplaint')}
        error={errors.primaryComplaint?.message}
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Preferred Clinic Location"
          options={LOCATIONS}
          {...register('preferredLocation')}
          error={errors.preferredLocation?.message}
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Type
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="In-Person"
                {...register('appointmentType')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-gray-700">In-Person</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Telemedicine"
                {...register('appointmentType')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-gray-700">Telemedicine</span>
            </label>
          </div>
          {errors.appointmentType && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.appointmentType.message}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <Button type="submit" isLoading={isSubmitting}>
          Submit Referral
        </Button>
      </div>
    </form>
  );
};