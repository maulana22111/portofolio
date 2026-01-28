import { useState, useEffect, useRef } from "react";
import { auth, loginWithGoogle, logout, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  // 1. Monitor Status Login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // 2. Tarik Data Chat (Tetap jalan meskipun user belum login)
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // 3. Scroll Otomatis ke bawah saat ada pesan baru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;
    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        uid: user.uid,
        displayName: user.displayName || "User",
        photoURL: user.photoURL || "https://via.placeholder.com/150",
        createdAt: serverTimestamp()
      });
      setMessage("");
    } catch (err) { console.error("Gagal kirim pesan:", err); }
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-5 rounded-3xl shadow-2xl flex flex-col h-[500px] text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live Curhat
          </h2>
          {!user && <p className="text-[9px] text-zinc-500 uppercase mt-1">Mode Baca Saja (Login untuk balas)</p>}
        </div>
        {user && (
          <button onClick={logout} className="text-[10px] text-zinc-500 hover:text-red-400 font-bold uppercase tracking-widest transition-colors">
            Logout
          </button>
        )}
      </div>

      {/* Container Pesan (Bisa dilihat semua orang) */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar p-2 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-zinc-600 italic text-sm text-center">
            Memanggil history obrolan...
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.uid === user?.uid;
            return (
              <div key={msg.id} className={`flex items-start gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                <img src={msg.photoURL} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full border border-zinc-700 shadow-sm" alt="pfp" />
                <div className={`flex flex-col max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
                  <span className="text-[10px] font-bold mb-1 opacity-50 uppercase tracking-tighter">{msg.displayName}</span>
                  <div className={`p-3 rounded-2xl text-sm shadow-md break-words ${isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700"}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bagian Input */}
      <div className="pt-4">
        {user ? (
          <form onSubmit={sendMessage} className="flex gap-2 bg-zinc-800/40 p-2 rounded-2xl border border-zinc-700 focus-within:border-blue-500 transition-all">
            <input 
              type="text" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Tulis pesan..." 
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none" 
              autoComplete="off"
            />
            <button type="submit" className="bg-blue-600 px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-500 transition-all active:scale-95 text-white">
              Send
            </button>
          </form>
        ) : (
          <div className="space-y-3">
             <button onClick={loginWithGoogle} className="w-full bg-white text-black py-3 rounded-2xl font-bold text-sm hover:bg-zinc-200 flex items-center justify-center gap-2 transition-all">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4" alt="g" />
              Sign in to Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}