import "remixicon/fonts/remixicon.css";
import Dock from "./Dock/Dock";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";

const Footer = () => {
  const items = [
    { 
      icon: <VscHome size={18} />, 
      label: "Home", 
      onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) 
    },
    { 
      icon: <VscAccount size={18} />, 
      label: "Skills", 
      onClick: () => document.getElementById("tools-section")?.scrollIntoView({ behavior: "smooth" }) 
    },
    { 
      icon: <VscArchive size={18} />, 
      label: "Projects", 
      onClick: () => document.getElementById("pro-section")?.scrollIntoView({ behavior: "smooth" }) 
    },
  ];

  return (
    <footer className="w-full py-16 flex flex-col items-center border-t border-zinc-800/50 mt-20 relative z-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10 px-6">
        
        {/* Logo/Sign */}
        <h1 className="text-3xl font-bold text-zinc-700 hover:text-white transition-all cursor-pointer">
          :)
        </h1>

        {/* Social Links */}
        <div id="contact-section" className="flex gap-10 items-center">
          <a href="https://github.com/maulana22111" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-all hover:scale-125">
            <i className="ri-github-fill ri-2x"></i>
          </a>
          <a href="https://www.tiktok.com/@_tasyaaa22/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-pink-500 transition-all hover:scale-125">
            <i className="ri-tiktok-fill ri-2x"></i>
          </a>
          <a href="https://wa.me/6285817252664" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-green-500 transition-all hover:scale-125">
            <i className="ri-whatsapp-fill ri-2x"></i>
          </a>
        </div>

        {/* Navigation Dock */}
        <div className="mt-2 md:mt-0">
          <Dock items={items} panelHeight={40} baseItemSize={50} magnification={80} />
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-16 text-center">
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-medium">
          © {new Date().getFullYear()} Abdulah Maulana • Built with React & Coffee
        </p>
      </div>
    </footer>
  );
};

export default Footer;
