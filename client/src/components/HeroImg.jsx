import React from "react";
import { motion } from "framer-motion";

function HeroImg() {
    return (
        <motion.div
            className="r hidden sm:flex justify-center items-center h-screen bg-cover bg-cente"
            style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <img src="../Images/copilot-2.png" alt="Hero" className="w-[295px] h-[200px] rounded-xl md:h-[320px] lg:h-[500px] lg:w-[400px] xl:w-[480px]" />
        </motion.div>
    );
}

export default HeroImg;