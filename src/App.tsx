import QRCode from "qrcode";
import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import QRCodePreview from "./components/QRCodePreview";
import MobileQRModal from "./components/MobileQRModal";
import ProgressIndicator from "./components/ProgressIndicator";
import Footer from "./components/Footer";
import Header from "./components/Header";

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
    if (id === "student_id") {
      // Only allow numbers and hyphen, auto-insert hyphen after two digits
      let sanitized = value.replace(/[^0-9-]/g, "");
      if (sanitized.length === 2 && !sanitized.includes("-")) {
        sanitized = sanitized + "-";
      }
      // Prevent more than 8 chars (2 digits + hyphen + 5 digits)
      sanitized = sanitized.slice(0, 8);
      setForm((prev) => ({ ...prev, student_id: sanitized }));
    } else {
      setForm((prev) => ({ ...prev, [id]: value }));
    }
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
  };


  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (typeof form.fname.trim() == 'string') newErrors.fname = "First Name must be String";
    if (typeof form.lname.trim() == 'string') newErrors.lname = "Last Name must be String";
    if (!form.fname.trim()) newErrors.fname = "First name is required";
    if (!form.lname.trim()) newErrors.lname = "Last name is required";
    if (!form.section_year.trim()) newErrors.section_year = "Section/Year is required";
    if (!form.student_id.trim()) {
      newErrors.student_id = "Student ID is required";
    } else if (!/^\d{2}-\d{5}$/.test(form.student_id)) {
      newErrors.student_id = "Student ID must be in the format 00-00000 (two digits, hyphen, five digits)";
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
      setTimeout(() => setShowSuccess(false),2000);
      
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


  // Progress steps for indicator
  const progressSteps = [
    !!form.fname,
    !!form.lname,
    !!form.section_year,
    !!form.student_id,
  ];

  return (
    <>
    <Header/>
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
          <StudentForm
            form={form}
            errors={errors}
            isGenerating={isGenerating}
            qrCode={qrCode}
            isMobile={isMobile}
            onInputChange={handleInputChange}
            onGenerate={handleGenerate}
            onReset={handleReset}
            onViewQR={handleViewQR}
            disabled={!!qrCode}
          />

          {/* Desktop QR Code Preview (Right Panel) */}
          {!isMobile && (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-green-200/30 hover:shadow-3xl transition-all duration-500 ring-1 ring-green-100/50">
              <QRCodePreview
                qrCode={qrCode}
                showSuccess={showSuccess}
                form={form}
                onDownload={handleDownload}
              />
              <ProgressIndicator steps={progressSteps} />
              <p className="text-xs text-green-600 mt-2 font-medium text-center">Complete all required fields</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Modal for QR Code */}
      {isMobile && (
        <MobileQRModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <QRCodePreview
            qrCode={qrCode}
            showSuccess={showSuccess}
            form={form}
            onDownload={handleDownload}
          />
        </MobileQRModal>
      )}
      
    </div>
    <Footer />
    </>
  );
}

export default App;
