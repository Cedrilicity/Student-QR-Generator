import QRCode from "qrcode";
import React, { useState, useEffect } from "react";

interface FormData {
  fname: string;
  lname: string;
  section_year: string;
  student_id: string;
}

interface FormErrors {
  fname?: string;
  lname?: string;
  section_year?: string;
  student_id?: string;
}

function App() {
  const [form, setForm] = useState<FormData>({
    fname: "",
    lname: "",
    section_year: "",
    student_id: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close modal when switching to desktop
  useEffect(() => {
    if (!isMobile && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [isMobile, isModalOpen]);

  // Open modal when QR is generated on mobile
  useEffect(() => {
    if (qrCode && isMobile) {
      setIsModalOpen(true);
    }
  }, [qrCode, isMobile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));

    // Clear error for this field when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
  };


  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.fname.trim()) newErrors.fname = "First name is required";
    if (!form.lname.trim()) newErrors.lname = "Last name is required";
    if (!form.section_year.trim()) newErrors.section_year = "Section/Year is required";
    if (!form.student_id.trim()) newErrors.student_id = "Student ID is required";
    
    // Validate student ID format (basic validation)
    if (form.student_id && !/^[A-Za-z0-9-]+$/.test(form.student_id)) {
      newErrors.student_id = "Student ID can only contain letters, numbers, and hyphens";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateForm()) return;
    
    setIsGenerating(true);
    const studentData = {
      institution: "Naga College Foundation",
      first_name: form.fname.trim(),
      last_name: form.lname.trim(),
      course_year_section: form.section_year.trim(),
      student_id: form.student_id.trim(),
      generated_at: new Date().toISOString(),
      academic_year: "2024-2025"
    };
    
    try {
      const dataString = JSON.stringify(studentData, null, 2);
      const url = await QRCode.toDataURL(dataString, {
        width: 300,
        margin: 2,
        color: {
          dark: '#166534',  // Green-800 to match NCF colors
          light: '#ffffff'
        }
      });
      
      setQrCode(url);
      setShowSuccess(true);
      
      // Show Success Notification
      setTimeout(() => setShowSuccess(true));
      
    } catch (err) {
      console.error('QR generation error:', err);
      alert("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!qrCode) return;
    
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${form.fname}_${form.lname}_QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setForm({
      fname: "",
      lname: "",
      section_year: "",
      student_id: "",
    });
    setErrors({});
    setQrCode(null);
    setShowSuccess(false);
    setIsModalOpen(false);
  };

  const handleViewQR = () => {
    if (qrCode && isMobile) {
      setIsModalOpen(true);
    }
  };

  const QRCodeContent = () => (
    <div className="text-center">
      {qrCode ? (
        <div className="space-y-8 animate-fade-in">
          {showSuccess && (
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg animate-slide-down ring-1 ring-green-100">
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold">NCF QR Code generated successfully!</span>
              </div>
            </div>
          )}
          
          <div className="relative group">
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl p-10 inline-block shadow-inner group-hover:shadow-lg transition-all duration-300 ring-2 ring-green-200/50">
              <div className="relative">
                <img 
                  src={qrCode} 
                  alt="NCF Student QR Code" 
                  className="mx-auto shadow-2xl rounded-2xl ring-4 ring-white ring-opacity-50 transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-green-600/20 to-yellow-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-yellow-500 to-green-500 rounded-full opacity-70 animate-pulse delay-500"></div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-green-900 py-4 px-8 rounded-xl font-bold hover:from-yellow-600 hover:to-yellow-500 focus:ring-4 focus:ring-yellow-200 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 ring-2 ring-green-500/30"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download NCF QR Code
            </button>
            
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-6 border border-green-200 shadow-inner ring-1 ring-green-100">
              <div className="text-sm text-green-700">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <strong className="text-green-900">Official NCF QR Code Data:</strong>
                </div>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="font-medium text-green-600">Student Name:</span>
                    <span className="text-green-900">{form.fname} {form.lname}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="font-medium text-green-600">Course/Year/Section:</span>
                    <span className="text-green-900">{form.section_year}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-green-600">Student ID:</span>
                    <span className="text-green-900 font-mono">{form.student_id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-yellow-100 rounded-3xl mx-auto flex items-center justify-center shadow-inner ring-2 ring-green-200/50">
              <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 8h4m4 0V4m0 0h4m0 0v4m0 0h4m0 4h-4M8 12V8m0 0H4m0 0v4m0 0h4" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full animate-ping"></div>
          </div>
          <h3 className="text-xl font-semibold text-green-900 mb-3">Ready to Generate NCF QR Code</h3>
          <p className="text-green-700 text-lg max-w-sm mx-auto leading-relaxed">
            Fill out the student information form and click "Generate NCF QR Code" to create your official student identification
          </p>
          
          {/* Progress indicator */}
          <div className="mt-8 flex justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              form.fname ? 'bg-green-500' : 'bg-green-300'
            }`}></div>
            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              form.lname ? 'bg-green-500' : 'bg-green-300'
            }`}></div>
            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              form.section_year ? 'bg-green-500' : 'bg-green-300'
            }`}></div>
            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              form.student_id ? 'bg-green-500' : 'bg-green-300'
            }`}></div>
          </div>
          <p className="text-xs text-green-600 mt-2 font-medium">Complete all required fields</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 py-8 px-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-yellow-400/20 to-green-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative">
        {/* College Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 via-green-700 to-green-600 bg-clip-text text-transparent mb-4">
            Student QR Code Generator
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Official student identification QR code system for Naga College Foundation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start justify-center max-h-screen">

          {/* Form Section */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-5 border border-green-200/30 hover:shadow-3xl transition-all duration-500 ring-1 ring-green-100/50">
            <div className="mb-8 p-1">
              <div className="flex items-center mb-4">
                <h2 className="text-3xl font-bold text-green-800 mb-2">Student Information</h2>
              </div>
              <p className="text-green-700">Enter the student details to generate an official NCF QR code</p>
            </div>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-1">
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
              

                <div className="group">
                  <label
                    htmlFor="section_year"
                    className="block text-sm font-semibold text-green-800 mb-3 group-focus-within:text-green-600 transition-colors"
                  >
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
                      onChange={handleInputChange}
                    >
                      <option value="">Select Course/Year/Section</option>
                      
                      {/* Fourth Year */}
                      <option value="BSCS 4">BSCS 4</option>
                      <option value="BSIS 4">BSIS 4</option>

                      {/* Third Year */}
                      <option value="BSCS 3A">BSCS 3A</option>
                      <option value="BSCS 3B">BSCS 3B</option>
                      <option value="BSIS 3A">BSIS 3A</option>
                      <option value="BSIS 3B">BSIS 3B</option>

                      {/* Second Year */}
                      <option value="BSCS 2A">BSCS 2A</option>
                      <option value="BSIS 2A">BSIS 2A</option>
                      <option value="BSIT 2A">BSIT 2A</option>
                      <option value="BSIT 2B">BSIT 2B</option>
                      <option value="BSIT 2C">BSIT 2C</option>
                      <option value="BSIT 2D">BSIT 2D</option>
                      <option value="ACT 2A">ACT 2A</option>

                      {/* First Year */}
                      <option value="BSCS 1A">BSCS 1A</option>
                      <option value="BSIS 1A">BSIS 1A</option>
                      <option value="BSIT 1A">BSIT 1A</option>
                      <option value="BSIT 1B">BSIT 1B</option>
                      <option value="BSIT 1C">BSIT 1C</option>
                      <option value="BSIT 1D">BSIT 1D</option>
                      <option value="ACT 1A">ACT 1A</option>
                    </select>

                    <div
                      className={`absolute inset-x-3 bottom-0 h-0.5 bg-gradient-to-r from-green-500 to-yellow-500 transform origin-left transition-transform duration-300 ${
                        form.section_year ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    ></div>
                  </div>

                  {errors.section_year && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2 animate-fade-in">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.section_year}
                    </p>
                  )}
                </div>


                <div className="group">
                  <label htmlFor="student_id" className="block text-sm font-semibold text-green-800 mb-3 group-focus-within:text-green-600 transition-colors">
                    Student ID *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="student_id"
                      className={`w-full px-4 py-4 rounded-xl border-2 ${
                        errors.student_id 
                          ? 'border-red-300 bg-red-50 focus:border-red-500' 
                          : 'border-green-600 focus:border-green-700 bg-green-50/50'
                      } focus:ring-4 focus:ring-green-500/10 transition-all duration-300 text-green-800 placeholder-green-500`}
                      placeholder="e.g., NCF-2024-001234"
                      value={form.student_id}
                      onChange={handleInputChange}
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

              <div className="flex gap-5 pt-6">
                <button
                  onClick={handleGenerate}
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
                      Generate QR
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
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
                    onClick={handleViewQR}
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

          {/* Desktop QR Code Preview (Right Panel) */}
          {!isMobile && (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-green-200/30 hover:shadow-3xl transition-all duration-500 ring-1 ring-green-100/50">
              <QRCodeContent />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Modal for QR Code */}
      {isMobile && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md max-h-[85vh] overflow-y-auto relative no-scrollbar shadow-2xl animate-fade-in">

            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-green-200 pb-3 mb-4">
              <h2 className="text-lg font-semibold text-green-800">Your QR Code</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-green-100 transition"
              >
                <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <QRCodeContent />

            {/* <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 shadow-md transition"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
