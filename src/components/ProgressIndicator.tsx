import React from "react";

interface ProgressIndicatorProps {
  steps: boolean[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps }) => (
  <div className="mt-8 flex justify-center space-x-2">
    {steps.map((filled, idx) => (
      <div
        key={idx}
        className={`w-3 h-3 rounded-full transition-colors duration-300 ${filled ? 'bg-green-500' : 'bg-green-300'}`}
      ></div>
    ))}
  </div>
);

export default ProgressIndicator;
