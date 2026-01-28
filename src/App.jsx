import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import { listTools, listProyek } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import AOS from 'aos';
import ChatRoom from "./components/ChatRoom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import 'aos/dist/aos.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleProjectClick = (project) => setSelectedProject(project);
  const handleCloseModal = () => setSelectedProject(null);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Aurora colorStops={["#577870", "#1F97A6", "#127B99"]} blend={0.5} amplitude={1.0} speed={0.5} />
      </div>      

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HERO SECTION - ID: home */}
        <div id="home" className="hero grid md:grid-cols-2 items-center pt-20 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6 bg-zinc-800 w-fit p-4 rounded-2xl border border-zinc-700 shadow-lg">
              <img src="./assets/mlna.jpg" className="w-10 rounded-md" alt="me" />
              <q className="text-zinc-400 font-medium">Makan. Tidur. Nyari error(:)</q>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <ShinyText text="Hi I'm Abdulah Maulana" speed={3} />
            </h1>
            
            {/* INI BAGIAN TEKS NYELENEH YANG SUDAH DISATUKAN */}
            <BlurText 
              text="Pengrajin kode yang hidupnya habis buat berantem sama titik dua (:) dan ketikan typo. Spesialis mengubah kopi instan dan rasa panik jadi website yang (alhamdulillah) bisa dibuka tanpa meledak. Kalau kodenya udah jalan, JANGAN DISENTUH, karena kodingan saya lebih sensitif daripada perasaan mantan." 
              delay={50} 
              animateBy="words" 
              className="mb-8 text-zinc-400 text-lg leading-relaxed" 
            />
            
            <div className="flex flex-wrap gap-4">
               <a href="#pro-section" className="inline-block font-semibold bg-zinc-900 p-4 px-8 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-all shadow-xl text-white">
                 <ShinyText text="Lihat Proyek" speed={3} />
               </a>
               
               <a href="/cv-maulana.pdf" download className="inline-flex items-center gap-2 font-semibold bg-blue-600 p-4 px-8 rounded-full hover:bg-blue-500 transition-all shadow-xl text-white active:scale-95 group">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                 Download CV
               </a>
            </div>
          </div>

          <div className="md:ml-auto">
            <ProfileCard name="A Maulana" title="Web Developer" handle="mlnatwtw" status="Lagi Debugging" avatarUrl="./assets/mlna.jpg" showUserInfo={true} enableTilt={true} />
          </div>
        </div>

        {/* TOOLS SECTION - ID: tools-section */}
        <div id="tools-section" className="mt-40">
            <h1 className="text-4xl font-bold mb-4">Tools & Technologies</h1>
            <p className="text-base opacity-50 mb-14">Senjata saya buat nyari error</p>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {listTools.map((tool) => (
                <div key={tool.id} className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all group shadow-lg">
                  <img src={tool.gambar} alt={tool.nama} className="w-12 h-12 object-contain bg-zinc-800 p-2 rounded-lg" />
                  <div className="flex flex-col overflow-hidden text-white">
                    <ShinyText text={tool.nama} speed={3} className="text-lg font-semibold" />
                    <p className="text-xs text-zinc-400 truncate">{tool.ket}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* PROJECT SECTION - ID: pro-section */}
        <div id="pro-section" className="mt-40">
          <h1 className="text-4xl font-bold text-center mb-10 text-white">Koleksi Proyek</h1>
          <div className="min-h-[500px]">
            <ChromaGrid items={listProyek} onItemClick={handleProjectClick} radius={500} />
          </div>
        </div>

        {/* CHAT SECTION - ID: chat-section */}
        <div className="mt-40 mb-20" id="chat-section">
          <h1 className="text-4xl font-bold text-center mb-10 text-white">Pojok Curhat & Kontak</h1>
          <div className="grid md:grid-cols-2 gap-10">
            <ChatRoom />
            <form action="https://formsubmit.co/maulanatetew22@gmail.com" method="POST" className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 space-y-4 shadow-2xl backdrop-blur-sm">
                <input type="text" name="Name" placeholder="Nama Lengkap" className="w-full bg-zinc-800/50 border border-zinc-700 p-3 rounded-xl outline-none text-white" required />
                <input type="email" name="Email" placeholder="Email" className="w-full bg-zinc-800/50 border border-zinc-700 p-3 rounded-xl outline-none text-white" required />
                <textarea name="message" rows="5" placeholder="Pesan Anda (Jangan nanya error koding ya...)" className="w-full bg-zinc-800/50 border border-zinc-700 p-3 rounded-xl outline-none text-white" required></textarea>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-white transition-all shadow-lg">Kirim Pesan</button>
            </form>
          </div>
        </div>
      </main>


      <div id="contact-section" >
      </div>
      <Footer />
      <ProjectModal isOpen={!!selectedProject} onClose={handleCloseModal} project={selectedProject} />
    </>
  );
}

export default App;
