import React from "react";

interface SuccessNotificationProps {
  message: string;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({ message }) => (
  <div className="bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg animate-slide-down ring-1 ring-green-100">
    <div className="flex items-center justify-center">
      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <span className="font-semibold">{message}</span>
    </div>
  </div>
);

export default SuccessNotification;
