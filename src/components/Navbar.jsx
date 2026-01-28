import { useState, useEffect } from "react";
import CardNav from "./CardNav/CardNav";


const Navbar = ({ hidden = false }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 150);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hidden) return null;

  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Home", href: "#home"},
        { label: "About", href: "#about"},
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Tools",href: "#tools-section",},
        { label: "Project",href: "#pro-section",},
      ]
    },
    {
      label: "Sosmed",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Livechat",href: "#chat-section",},
        { label: "Tiktok",href: "#contact-section",},
        { label: "Whatsapp",href: "#contact-section",},
      ]
    }
  ];

  return (
    <div className={active ? "navbar-active" : "navbar-normal"}>
      {/* Wrapper Luar: Mengunci posisi fixed di paling atas layar */}
      <div style={{
        position: 'sticky', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center'
      }}>
        
        {/* Wrapper Dalam: Menjaga konten tetap di tengah & memberi padding di layar kecil */}
        <div style={{ 
          maxWidth: '1200px', 
          width: '100%', 
          padding: '10px 20px', // Jarak atas-bawah dan kiri-kanan
          boxSizing: 'border-box'
        }}>
          
          <CardNav
            logo={"/logo.png"} 
            logoAlt="Company Logo"
            items={items}
            baseColor="#333"
            menuColor="#fff"
            buttonBgColor="000"
            buttonTextColor="#000"
            ease="power3.out"
            theme="dark"
          />
          
        </div>
      </div>
      
      {/* Spacer: Agar konten di bawah tidak tertutup oleh navbar yang melayang */}
      
  );
};

export default Navbar;
