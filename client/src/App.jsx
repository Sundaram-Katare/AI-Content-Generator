import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Nav from "./components/Nav";
import PunchLine from "./components/PunchLine";
import HeroImg from "./components/HeroImg";

function App() {
  const [title, setTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // useRef to prevent duplicate toasts in dev mode
  const hasWelcomed = useRef(false);
  const hasAsked = useRef(false);

  const backendUrl = 'https://ai-content-generator-server-b923.onrender.com';

  useEffect(() => {
    if (!hasWelcomed.current) {
      hasWelcomed.current = true;
      setTimeout(() => {
        toast("Welcome to AI Content Generator!");
      }, 1500);
    }
  }, []);

  if (!hasAsked.current) {
    hasAsked.current = true;
    setTimeout(() => {
      toast("Please Give a ⭐ on GitHub if you like this project!");
    }, 6000);
  }

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/content`)
      .then((res) => setHistory(res.data))
      .catch((err) => console.error(err));
  }, []);


  return (
    <>
      <Nav />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "white",
            color: "black",
            fontSize: "20px",
          },
        }}
      />
      <div className="flex flex-col gap-0 p-10  bg-black bg-cover bg-center bg-custom-opacity-50 sm:flex-row md:gap-20 lg:gap-20 xl:gap-40 2xl:gap-60">
        <PunchLine />
        <HeroImg />
      </div>

      <div className="max-w-7xl max-h-screen overflow-y-auto mx-auto p-6 font-sans bg-white">
        <h2 className="text-2xl font-semibold bg-gray-200 text-center border rounded-lg mb-4">
          History: Previous Generated Contents
        </h2>
        {history.length === 0 ? (
          <p className="text-gray-500 bg-yellow-600">No previous contents found.</p>
        ) : (
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="list-none p-4 bg-gray-600 border border-80 border-black text-black font-spaceGrotesk">
            {history.map((item) => (
              <motion.li
                key={item._id}
                whileHover={{ scale: 1.05 }}
                className="mb-4 border border-black text-white p-4 rounded-xl hover:bg-[#b0f721] hover:text-black hover:rounded-xl transition-colors duration-300"
              >
                <strong className="block">{item.title}</strong>
                <p>
                  <em className="font-bold font-sans text-red-500 bg-white rounded-lg mt-4 mb-4">Input:</em><br /> {item.inputText}
                </p>
                <p>
                  <em className="font-bold font-sans text-red-500 bg-white rounded-lg mt-4 mb-4">Generated:</em> <br /> {item.generatedText}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </>
  );
}

export default App;
