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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id.toLowerCase()]: value }));
  };

  const handleGenerate = async () => {
    const data = `{
			"first_name": "${form.fname}",
			"last_name": "${form.lname}",
			"section_year": "${form.section_year}",
			"student_id": "${form.student_id}"
		}`;
    try {
      const url = await QRCode.toDataURL(data);
      setQrCode(url);
      // Auto-download the QR code image
      const link = document.createElement("a");
      link.href = url;
      link.download = `qr_code_${form.fname || "student"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Failed to generate QR code");
    }
  };

  return (
    <div className="join join-vertical">
      <input
        type="text"
        className=""
        id="fname"
        placeholder="Enter your first name"
        value={form.fname}
        onChange={handleInputChange}
      />
      <input
        type="text"
        className=""
        id="lname"
        placeholder="Enter your last name"
        value={form.lname}
        onChange={handleInputChange}
      />
      <input
        type="text"
        id="section_year"
        className="section_year"
        placeholder="ex: BSCS-2A"
        value={form.section_year}
        onChange={handleInputChange}
      />

      <input
        type="text"
        className=""
        id="student_id"
        placeholder="Enter your student id"
        value={form.student_id}
        onChange={handleInputChange}
      />

      <button className="" id="generate-btn" onClick={handleGenerate}>
        Generate
      </button>
      {qrCode && (
        <div style={{ marginTop: "2rem" }}>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}

    </div>
    
  );
}

export default App;
