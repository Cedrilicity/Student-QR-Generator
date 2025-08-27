import QRCode from "qrcode";
import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    section_year: "",
    student_id: "",
  });
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id.toLowerCase()]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setShowSuccess(false);
    
    const data = `{
      "first_name": "${form.fname}",
      "last_name": "${form.lname}",
      "section_year": "${form.section_year}",
      "student_id": "${form.student_id}"
    }`;
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const url = await QRCode.toDataURL(data, {
        width: 300,
        margin: 2,
        color: {
          dark: '#064e3b',
          light: '#ffffff'
        }
      });
      
      setQrCode(url);
      setShowSuccess(true);
      
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `qr_code_${form.fname || "student"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Failed to generate QR code");
    } finally {
      setIsGenerating(false);
    }
  };

  const isFormValid = form.fname && form.lname && form.section_year && form.student_id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
            QR Generator
          </h1>
          <p className="text-green-200">Create your student QR code instantly</p>
        </div>

        <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl animate-slide-up">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                  id="fname"
                  placeholder="First Name"
                  value={form.fname}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                  id="lname"
                  placeholder="Last Name"
                  value={form.lname}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  id="section_year"
                  className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                  placeholder="Section & Year (e.g., BSCS-2A)"
                  value={form.section_year}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                  id="student_id"
                  placeholder="Student ID"
                  value={form.student_id}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>


            <button
              className={`w-full p-4 rounded-2xl font-semibold text-white transition-all duration-300 transform relative overflow-hidden ${
                isFormValid && !isGenerating
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:scale-105 hover:shadow-xl shadow-lg'
                  : 'bg-gray-500 cursor-not-allowed opacity-50'
              }`}
              onClick={handleGenerate}
              disabled={!isFormValid || isGenerating}
            >
              <span className={`transition-opacity duration-300 ${isGenerating ? 'opacity-0' : 'opacity-100'}`}>
                Generate QR Code
              </span>
              

              {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              )}
              

              {isFormValid && !isGenerating && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
              )}
            </button>


            {showSuccess && (
              <div className="text-center animate-bounce-in">
                <div className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 py-2 text-yellow-300">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span>QR Code generated & downloaded!</span>
                </div>
              </div>
            )}


            {qrCode && (
              <div className="flex justify-center animate-zoom-in">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-green-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-white rounded-3xl p-6 hover:scale-105 transition-transform duration-300">
                    <img 
                      src={qrCode} 
                      alt="QR Code" 
                      className="w-full h-auto rounded-2xl shadow-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>


        <div className="text-center mt-8 text-green-200 text-sm animate-fade-in-delayed">
          Fill all fields to generate your QR code
        </div>
      </div>
       </div>
  );
}

export default App;