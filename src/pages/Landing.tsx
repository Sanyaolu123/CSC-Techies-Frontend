import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-250px)] px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground cascadia-mono-400">
          Made with{" "}
          <motion.span
            role="img"
            aria-label="hand"
            style={{ display: "inline-block" }}
            animate={{ rotate: [0, 20, -20, 20, 0] }}
            transition={{
              repeat: Infinity,
              repeatDelay: 2,
              duration: 1,
              ease: "easeInOut",
            }}
          >
            🫶
          </motion.span>{" "}
          by Abideen Sanyaolu
        </h1>

        <p className="text-muted-foreground text-lg md:text-lg leading-relaxed ">
          Track your semester, view your courses, access materials, view current and updated timetable and stay updated with events, all in one place.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a href="/timetable">
            <Button className="px-6 py-3 text-base rounded-xl shadow font-mono cursor-pointer">
              View Timetable
            </Button>
          </a>

          <a href="/courses">
            <Button variant="secondary" className="font-mono shadow bg-gray-200 px-6 py-3 text-base rounded-xl cursor-pointer">
              View Courses
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
