import React from "react";

interface QRCodePreviewProps {
  qrCode: string | null;
  showSuccess: boolean;
  form: {
    fname: string;
    lname: string;
    section_year: string;
    student_id: string;
    email: string;
  };
  onDownload: () => void;
}

const QRCodePreview: React.FC<QRCodePreviewProps> = ({ qrCode, showSuccess, form, onDownload }) => (
  <div className="text-center">
    {qrCode ? (
      <div className="space-y-8 animate-fade-in">
        {showSuccess && (
          // SuccessNotification can be used here if desired
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
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-yellow-500 to-green-500 rounded-full opacity-70 animate-pulse delay-500"></div>
        </div>
        <div className="space-y-4">
          <button
            onClick={onDownload}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-green-900 py-4 px-8 rounded-xl font-bold hover:from-yellow-600 hover:to-yellow-500 focus:ring-4 focus:ring-yellow-200 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 ring-2 ring-green-500/30"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
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
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="font-medium text-green-600">Student ID:</span>
                  <span className="text-green-900 font-mono">{form.student_id}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-green-600">Email:</span>
                  <span className="text-green-900 font-mono">{form.email}</span>
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
      </div>
    )}
  </div>
);

export default QRCodePreview;
