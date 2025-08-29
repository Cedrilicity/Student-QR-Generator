import React from "react";

interface MobileQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MobileQRModal: React.FC<MobileQRModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md max-h-[85vh] overflow-y-auto relative no-scrollbar shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center border-b border-green-200 pb-3 mb-4">
          <h2 className="text-lg font-semibold text-green-800">Your QR Code</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-green-100 transition"
          >
            <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default MobileQRModal;
