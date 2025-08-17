"use client"
import { signIn } from "next-auth/react"; 
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
export default function LoginPage(){
        return(
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex items-center justify-center min-h-[50vh] bg-white p-4 max-w-md mx-auto mt-20"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Welcome!
        </h2>
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-md hover:bg-gray-200 transition colors focus:outline-none  duration-450 active:shadow-lg active:scale-95"
        >
          <FaGoogle size={20} />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
    </motion.div>
  );
        
}