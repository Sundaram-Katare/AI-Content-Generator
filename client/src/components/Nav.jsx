import React from "react";
import { motion } from "framer-motion";
import "@fontsource/playfair-display";

function Nav() {
    return (
        <>
         <motion.nav
            className="flex justify-between px-10 py-6 text-white bg-black"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
         >
            <div className="flex items-center ">
                <h1 className="text-White text-2xl font-semibold font-spaceGrotesk sm:text-4xl">Type<span className="text-blue-600">Craft</span></h1>
            </div>

            <p className="m-5 font-spaceGrotesk font-semibold animate-bounce text-lg">You have 3 Free Trials!</p>

            <div>
                <button className="bg-[#f3f4f6] text-black px-3 py-1 border rounded-lg text-lg hover:bg-gray-500 sm:text-xl" onClick={() => window.open("https://github.com/Sundaram-Katare/AI-Content-Generator", "_blank")}>GitHub ⭐ </button>
            </div>
         </motion.nav>
        </>
    )
}

export default Nav;