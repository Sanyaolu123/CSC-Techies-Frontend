import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import OverviewPage from "@/pages/Overview";
import Timetable from "./pages/Timetable";
import CoursesList from "./pages/Courses";
import MaterialsPage from "./pages/Materials";
import { Toaster } from "sonner";
import NotFound from "./pages/NotFound";
import ExamPage from "./pages/Exams";

function App() {
  return (
    <BrowserRouter>
    <Toaster richColors position="bottom-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/exams" element={<ExamPage />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
