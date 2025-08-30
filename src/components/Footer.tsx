import React from "react";

const Footer: React.FC = () => (
  <footer
    className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur border-t border-green-200/40 text-center text-green-800 text-sm"
    style={{
      zIndex: window.innerWidth < 768 ? -1 : 50, // 👈 Mobile/tablet: z-1, Desktop: z-50
    }}
  >
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-2">
      <div>
        &copy; {new Date().getFullYear()} Naga College Foundation College of Computer Studies &mdash; Student QR Code Generator
      </div>
      <div className="flex items-center gap-2">
        <span>Made with</span>
        <svg
          className="w-4 h-4 text-red-500 inline"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
        <span>
          by{" "}
          <a
            href="https://github.com/theheavenlyhaxxor/Student-QR-Generator"
            className="underline hover:text-green-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            CyberDevs Team
          </a>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
