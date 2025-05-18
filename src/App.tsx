import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import { RocketIcon } from "lucide-react";
import { motion } from "framer-motion";
import Quizzes from "./pages/Quizzes";

const Landing = lazy(() => import("./pages/Landing"));
const OverviewPage = lazy(() => import("@/pages/Overview"));
const Timetable = lazy(() => import("./pages/Timetable"));
const CoursesList = lazy(() => import("./pages/Courses"));
const MaterialsPage = lazy(() => import("./pages/Materials"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ExamPage = lazy(() => import("./pages/Exams"));

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-center" />
      <Navbar />
      <Suspense
        fallback={
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: [40, 0, -10, 0], opacity: 1 }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <RocketIcon size={56} color="#4F46E5" style={{ filter: "drop-shadow(0 2px 8px #6366f1aa)" }} />
            </motion.div>
            <span style={{ marginTop: "1.5rem", color: "#4F46E5", fontWeight: 600, fontSize: "1.15rem", letterSpacing: 0.2 }}>
              Loading the page...
            </span>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/exams" element={<ExamPage />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
