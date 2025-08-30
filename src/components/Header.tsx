import CyberDevs from './../assets/CyberDevs.png';
import ComputerStudies from './../assets/computerstudies.png';
import StudentCouncil from './../assets/csc.png';

const Header: React.FC = () => (
  <header className="w-full h-30 bg-gradient-to-r from-green-100 via-yellow-50 to-green-50 border-b border-green-200/40 flex justify-center items-center px-4 md:px-12">
    <div className="relative flex justify-center items-center w-full max-w-2xl h-28">
      {/* First Logo */}
      <img
        src={ComputerStudies}
        alt="Computer Studies Logo"
        className="absolute h-16 w-16 object-contain"
        style={{ transform: 'rotate(-30deg) translate(-100px, -50px) rotate(30deg)' }}
      />

      {/* Center Logo */}
      <img
        src={CyberDevs}
        alt="CyberDevs Logo"
        className="absolute h-24 w-24 object-contain"
        style={{ transform: 'translateY(-10px)' }} // Raise center logo slightly
      />

      {/* Third Logo */}
      <img
        src={StudentCouncil}
        alt="Student Council Logo"
        className="absolute h-16 w-16 rounded-full bg-white border border-green-200 object-contain"
        style={{ transform: 'rotate(30deg) translate(100px, -50px) rotate(-30deg)' }}
      />
    </div>
  </header>
);

export default Header;
