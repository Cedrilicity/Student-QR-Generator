import CyberDevs from './../assets/CyberDevs.png'; 
import ComputerStudies from './../assets/computerstudies.png';
import StudentCouncil from './../assets/csc.png';



const Header: React.FC = () => (
  <header className="w-full py-4 bg-gradient-to-r from-green-100 via-yellow-50 to-green-50 border-b border-green-200/40 flex justify-center items-center px-4 md:px-12">
    <div className="flex flex-row items-center justify-center gap-12 w-full max-w-2xl">
      <img src={ComputerStudies} alt="Computer Studies Logo" className="h-18 w-18 object-contain" />
      <img src={CyberDevs} alt="CyberDevs Logo" className="h-24 w-24 object-contain" />
      <img src={StudentCouncil} alt="Student Council Logo" className="h-18 w-18 rounded-full bg-white border border-green-200 object-contain" />
    </div>
  </header>
);


export default Header;