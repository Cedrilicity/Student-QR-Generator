import React from "react";

interface FormData {
  fname: string;
  lname: string;
  section_year: string;
  student_id: string;
  email: string;
}

interface FormErrors {
  fname?: string;
  lname?: string;
  section_year?: string;
  student_id?: string;
  email?: string;
}

interface StudentFormProps {
  form: FormData;
  errors: FormErrors;
  isGenerating: boolean;
  qrCode: string | null;
  isMobile: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onGenerate: () => void;
  onReset: () => void;
  onViewQR: () => void;
  disabled?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({
  form,
  errors,
  isGenerating,
  qrCode,
  isMobile,
  onInputChange,
  onGenerate,
  onReset,
  onViewQR,
  disabled,
}) => (
  <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-5 border border-green-200/30 hover:shadow-3xl transition-all duration-500 ring-1 ring-green-100/50">
    <div className="mb-8 p-1">
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-bold text-green-800 mb-2">Student Information</h2>
      </div>
      <p className="text-green-700">Enter the student details to generate an official NCF QR code</p>
    </div>
    <div className="space-y-8">
      <div className="p-1">
        {/* First two rows in 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* First Name */}
          <div className="group">
            <label htmlFor="fname" className="block text-sm font-semibold text-green-800 mb-3 group-focus-within:text-green-600 transition-colors">
              First Name *
            </label>
            <div className="relative">
              <input
                type="text"
                id="fname"
                className={`w-full px-4 py-4 rounded-xl border-2 ${
                  errors.fname 
                    ? 'border-red-300 bg-red-50 focus:border-red-500' 
                    : 'border-green-600 focus:border-green-700 bg-green-50/50'
                } focus:ring-4 focus:ring-green-500/10 transition-all duration-300 text-green-800 placeholder-green-500`}
                placeholder="Enter first name"
                value={form.fname}
                onChange={onInputChange}
                disabled={disabled}
              />
              <div className={`absolute inset-x-3 bottom-0 h-0.5 bg-gradient-to-r from-green-500 to-yellow-500 transform origin-left transition-transform duration-300 ${
                form.fname ? 'scale-x-100' : 'scale-x-0'
              }`}></div>
            </div>
            {errors.fname && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-2 animate-fade-in">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.fname}
              </p>
            )}
          </div>
          {/* Last Name */}
          <div className="group">
            <label htmlFor="lname" className="block text-sm font-semibold text-green-800 mb-3 group-focus-within:text-green-600 transition-colors">
              Last Name *
            </label>
            <div className="relative">
              <input
                type="text"
                id="lname"
                className={`w-full px-4 py-4 rounded-xl border-2 ${
                  errors.lname 
                    ? 'border-red-300 bg-red-50 focus:border-red-500' 
                    : 'border-green-600 focus:border-green-700 bg-green-50/50'
                } focus:ring-4 focus:ring-green-500/10 transition-all duration-300 text-green-800 placeholder-green-500`}
                placeholder="Enter last name"
                value={form.lname}
                onChange={onInputChange}
                disabled={disabled}
              />
              <div className={`absolute inset-x-3 bottom-0 h-0.5 bg-gradient-to-r from-green-500 to-yellow-500 transform origin-left transition-transform duration-300 ${
                form.lname ? 'scale-x-100' : 'scale-x-0'
              }`}></div>
            </div>
            {errors.lname && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-2 animate-fade-in">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.lname}
              </p>
            )}
          </div>
        </div>

        {/* Second row in 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Section/Year */}
          <div className="group">
            <label htmlFor="section_year" className="block text-sm font-semibold text-green-800 mb-3 group-focus-within:text-green-600 transition-colors">
              Course/Year/Section *
            </label>
            <div className="relative">
              <select
                id="section_year"
                className={`w-full px-4 py-4 rounded-xl border-2 ${
                  errors.section_year
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-green-600 focus:border-green-700 bg-green-50/50'
                } focus:ring-4 focus:ring-green-500/10 transition-all duration-300 text-green-800`}
                value={form.section_year}
                onChange={onInputChange}
                disabled={disabled}
              >
                <option value="">Select Course/Year/Section</option>
                {/* BSCS */}
                <option value="BSCS 1A">BSCS 1A</option>
                <option value="BSCS 2A">BSCS 2A</option>
                <option value="BSCS 3A">BSCS 3A</option>
                <option value="BSCS 3B">BSCS 3B</option>
                <option value="BSCS 4">BSCS 4</option>
                {/* BSIS */}
                <option value="BSIS 1A">BSIS 1A</option>
                <option value="BSIS 2A">BSIS 2A</option>
                <option value="BSIS 3A">BSIS 3A</option>
                <option value="BSIS 3B">BSIS 3B</option>
                <option value="BSIS 4">BSIS 4</option>
                {/* BSIT */}
                <option value="BSIT 1A">BSIT 1A</option>
                <option value="BSIT 1B">BSIT 1B</option>
                <option value="BSIT 1C">BSIT 1C</option>
                <option value="BSIT 1D">BSIT 1D</option>
                <option value="BSIT 2A">BSIT 2A</option>
                <option value="BSIT 2B">BSIT 2B</option>
                <option value="BSIT 2C">BSIT 2C</option>
                <option value="BSIT 2D">BSIT 2D</option>
                {/* ACT */}
                <option value="ACT 1A">ACT 1A</option>
                <option value="ACT 2A">ACT 2A</option>
              </select>
              <div className={`absolute inset-x-3 bottom-0 h-0.5 bg-gradient-to-r from-green-500 to-yellow-500 transform origin-left transition-transform duration-300 ${
                form.section_year ? 'scale-x-100' : 'scale-x-0'
              }`}></div>
            </div>
            {errors.section_year && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-2 animate-fade-in">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.section_year}
              </p>
            )}
          </div>
          {/* Student ID */}
          <div className="group">
            <label htmlFor="student_id" className="block text-sm font-semibold text-green-800 mb-3 group-focus-within:text-green-600 transition-colors">
              Student ID *
            </label>
            <div className="relative">
              <input
                type="text"
                id="student_id"
                inputMode="numeric"
                pattern="\d{2}-\d{5}"
                className={`w-full px-4 py-4 rounded-xl border-2 ${
                  errors.student_id 
                    ? 'border-red-300 bg-red-50 focus:border-red-500' 
                    : 'border-green-600 focus:border-green-700 bg-green-50/50'
                } focus:ring-4 focus:ring-green-500/10 transition-all duration-300 text-green-800 placeholder-green-500`}
                placeholder="e.g., 12-34567"
                value={form.student_id}
                onChange={onInputChange}
                disabled={disabled}
              />
              <div className={`absolute inset-x-3 bottom-0 h-0.5 bg-gradient-to-r from-green-500 to-yellow-500 transform origin-left transition-transform duration-300 ${
                form.student_id ? 'scale-x-100' : 'scale-x-0'
              }`}></div>
            </div>
            {errors.student_id && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-2 animate-fade-in">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.student_id}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="group">
          <label htmlFor="email" className="block text-sm font-semibold text-green-800 mb-3 group-focus-within:text-green-600 transition-colors">
            Email *
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-4 rounded-xl border-2 ${
                errors.email 
                  ? 'border-red-300 bg-red-50 focus:border-red-500' 
                  : 'border-green-600 focus:border-green-700 bg-green-50/50'
              } focus:ring-4 focus:ring-green-500/10 transition-all duration-300 text-green-800 placeholder-green-500`}
              placeholder="e.g., example@gbox.ncf.edu.ph"
              value={form.email}
              onChange={onInputChange}
              disabled={disabled}
            />
            <div className={`absolute inset-x-3 bottom-0 h-0.5 bg-gradient-to-r from-green-500 to-yellow-500 transform origin-left transition-transform duration-300 ${
              form.email ? 'scale-x-100' : 'scale-x-0'
              }`}>
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-2 animate-fade-in">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
                {errors.email}
              </p>
            )}
        </div>
      </div>

      <div className="flex gap-5 pt-6">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="flex-1 bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white py-4 px-8 rounded-xl font-bold hover:from-green-800 hover:via-green-700 hover:to-green-600 focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 ring-2 ring-yellow-400/50"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              Generating...
            </>
          ) : (
            <>
              <svg className="w-8 h-8 mr-3 generate-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 8h4m4 0V4m0 0h4m0 0v4m0 0h4m0 4h-4M8 12V8m0 0H4m0 0v4m0 0h4" />
              </svg>
              Generate
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="px-8 py-4 border-2 border-green-300 text-green-700 rounded-xl font-bold hover:bg-green-50 hover:border-green-400 focus:ring-4 focus:ring-green-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
        >
          Reset
        </button>
      </div>
      {/* Mobile QR Code Success and View Button */}
      {qrCode && isMobile && (
        <div className="mt-6 pt-6 border-t border-green-200">
          <div className="bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg animate-slide-down ring-1 ring-green-100 mb-4">
            <div className="flex items-center justify-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold">QR Code generated successfully!</span>
            </div>
          </div>
          <button
            onClick={onViewQR}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-green-900 py-4 px-8 rounded-xl font-bold hover:from-yellow-600 hover:to-yellow-500 focus:ring-4 focus:ring-yellow-200 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 ring-2 ring-green-500/30"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View QR Code
          </button>
        </div>
      )}
    </div>
  </div>
);

export default StudentForm;