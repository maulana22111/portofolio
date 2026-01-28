import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import './CardNav.css';

const CardNav = ({ items = [], baseColor = '#fff', menuColor = '#000' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tl = useRef(null);

  const calculateHeight = () => {
    const contentEl = navRef.current.querySelector('.card-nav-content');
    if (contentEl) {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      // Di Mobile, kita ambil tinggi asli konten. Di Desktop, kita batasi sedikit.
      const buffer = isMobile ? 30 : 20; 
      return 60 + contentEl.scrollHeight + buffer;
    }
    return 300;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true, defaults: { ease: "power4.inOut", duration: 0.5 } });
      tl.current
        .to(navRef.current, { height: calculateHeight() })
        .to(cardsRef.current, { opacity: 1, y: 0, stagger: 0.05, duration: 0.3 }, "-=0.2");
    });
    return () => ctx.revert();
  }, [items]);

  const toggleMenu = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      tl.current.play();
    } else {
      tl.current.reverse();
      setTimeout(() => setIsExpanded(false), 500);
    }
  };

  return (
    <div className="card-nav-container">
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">
          <div className={`hamburger-menu ${isExpanded ? 'open' : ''}`} onClick={toggleMenu} style={{ color: menuColor }}>
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>
          <div className="logo-container">
            <span className="logo-text">Hii..</span>
          </div>
        </div>

        <div className="card-nav-content" style={{ visibility: isExpanded ? 'visible' : 'hidden', opacity: isExpanded ? 1 : 0 }}>
          {items.map((item, idx) => (
            <div key={idx} className="nav-card" ref={el => (cardsRef.current[idx] = el)} style={{ backgroundColor: item.bgColor, color: item.textColor, opacity: 0, y: 20 }}>
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a key={i} className="nav-card-link" href={lnk.href} onClick={toggleMenu}>
                    <GoArrowUpRight /> {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;