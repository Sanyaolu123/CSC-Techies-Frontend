import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      className="min-h-[calc(100vh-300px)] flex flex-col items-center justify-center text-center px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="404"
        className="w-48 h-48 mb-6"
        initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
      />
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        404 - Page Not Found
      </motion.h1>
      <motion.p
        className="text-gray-600 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Oops! The page you're looking for doesn't exist or has been moved.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
