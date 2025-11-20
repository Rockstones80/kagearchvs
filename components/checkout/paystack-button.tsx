"use client";

import React from "react";
import { usePaystackPayment } from "react-paystack";
import { Lock } from "lucide-react";

interface PaystackReference {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
}

interface PaystackConfig {
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
  metadata?: Record<string, unknown>;
}

interface PaystackButtonProps {
  config: PaystackConfig;
  onSuccess: (reference: PaystackReference) => void;
  onClose: () => void;
  isProcessing: boolean;
  disabled: boolean;
}

export const PaystackButton: React.FC<PaystackButtonProps> = ({
  config,
  onSuccess,
  onClose,
  isProcessing,
  disabled,
}) => {
  const initializePayment = usePaystackPayment(config as never);

  const handleClick = () => {
    initializePayment({ onSuccess, onClose });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isProcessing || disabled}
      className="w-full bg-black text-white py-4 uppercase text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isProcessing ? (
        <>
          <span className="animate-spin">⏳</span>
          Opening Paystack...
        </>
      ) : (
        <>
          <Lock className="w-4 h-4" />
          Proceed to Payment
        </>
      )}
    </button>
  );
};
