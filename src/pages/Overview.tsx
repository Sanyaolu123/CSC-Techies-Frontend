import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "../components/ui/card"
import { fetchSemesterOverview } from "@/services"
import type { Response, Overview } from "@/interfaces"

// Simple skeleton component
const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
)

const OverviewPage = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Overview | null>(null)

  // Simulate loading
  useEffect(() => {
    const load = async () => {
      const overview: Response<Overview> = await fetchSemesterOverview()
      console.log(overview)
      setData(overview.data)
      setLoading(false)
    }

    load()
  }, [])

  // Replace these with actual data from backend later
  const semester = data?.semesterType == "FIRST_SEMESTER" ? "First Semester" : "Second Semester"
  const weeksRemaining = data?.endDate
    ? Math.max(
      0,
      Math.ceil(
        (new Date(data.endDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24 * 7)
      )
    )
    : 0
  const daysToExamLeft = data?.expectedExamStartDate
    ? Math.max(
      0,
      Math.ceil(
        (new Date(data.expectedExamStartDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24 * 7)
      )
    )
    : 0
  const courses = data?.courses ? data.courses.length : 0
  const compulsoryCourses = data?.courses?.filter((course) => course.courseType === "COMPULSORY").length || 0;
  const electiveCourses = data?.courses?.filter((course) => course.courseType === "ELECTIVE").length || 0;
  const now = new Date()
  const graduationDate = data?.expectedGraduationDate ? new Date(data.expectedGraduationDate) : null
  const daysLeft = graduationDate ? Math.ceil((graduationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 0

  return (
    <motion.div
      className="max-w-7xl mx-auto px-3 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-4 font-mono">🎓 Semester Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[...Array(12)].map((_, i) => (
          <Card className="shadow" key={i}>
            <CardContent className="p-6">
              <h2 className="text-sm text-gray-500 mb-1 font-mono">
                {[
                  "Countdown to Expected Date of Graduation",
                  "Session",
                  "Current Semester",
                  "Semester Start Date",
                  "Expected Semester End Date",
                  "Semester Weeks Remaining",
                  "Expected Exam Start Date",
                  "Expected Exam End Date",
                  "Countdown to Expected Exam Start Date",
                  "Available Courses To Register",
                  "Total Compulsory Courses",
                  "Total Elective Courses",
                ][i]}
              </h2>
              {loading ? (
                <Skeleton className="h-7 w-32 mt-2" />
              ) : (
                <p className="text-xl font-semibold font-mono">
                  {[
                    (() => {
                      if (daysLeft <= 0) return "0 days";
                      const years = Math.floor(daysLeft / 365);
                      const months = Math.floor((daysLeft % 365) / 30);
                      const weeks = Math.floor(((daysLeft % 365) % 30) / 7);
                      const days = ((daysLeft % 365) % 30) % 7;
                      const parts = [];
                      if (years) {
                        parts.push(`${years} year${years > 1 ? "s" : ""}`);
                        if (months) parts.push(`${months} month${months > 1 ? "s" : ""}`);
                      } else if (months) {
                        parts.push(`${months} month${months > 1 ? "s" : ""}`);
                        if (weeks) parts.push(`${weeks} week${weeks > 1 ? "s" : ""}`);
                      } else if (weeks) {
                        parts.push(`${weeks} week${weeks > 1 ? "s" : ""}`);
                        if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
                      } else {
                        parts.push(`${days} day${days > 1 ? "s" : ""}`);
                      }
                      return parts.join(" ");
                    })(),
                    data?.session != "" ? data?.session : "N/A",
                    semester,
                    (() => {
                      const date = data?.startDate ? new Date(data.startDate) : null;
                      if (date) {
                        const options: Intl.DateTimeFormatOptions = {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        };
                        return date.toLocaleDateString("en-US", options);
                      }
                      return "N/A";
                    })(),
                    (() => {
                      const date = data?.endDate ? new Date(data.endDate) : null;
                      if (date) {
                        const options: Intl.DateTimeFormatOptions = {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        };
                        return date.toLocaleDateString("en-US", options);
                      }
                      return "N/A";
                    })(),
                    (() => {
                      if (weeksRemaining > 0) {
                        return `${weeksRemaining} week${weeksRemaining !== 1 ? "s" : ""}`;
                      }
                      if (data?.endDate) {
                        const daysLeftInSemester = Math.max(
                          0,
                          Math.ceil(
                            (new Date(data.endDate).getTime() - new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                          )
                        );
                        return `${daysLeftInSemester} day${daysLeftInSemester !== 1 ? "s" : ""}`;
                      }
                      return "0 days";
                    })(),
                    (() => {
                      const date = data?.expectedExamStartDate ? new Date(data.expectedExamStartDate) : null;
                      if (date) {
                        const options: Intl.DateTimeFormatOptions = {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        };
                        return date.toLocaleDateString("en-US", options);
                      }
                      return "N/A";
                    })(),
                    (() => {
                      const date = data?.expectedExamEndDate ? new Date(data.expectedExamEndDate) : null;
                      if (date) {
                        const options: Intl.DateTimeFormatOptions = {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        };
                        return date.toLocaleDateString("en-US", options);
                      }
                      return "N/A";
                    })(),
                    (() => {
                      if (daysToExamLeft > 0) {
                        return `${daysToExamLeft} week${daysToExamLeft !== 1 ? "s" : ""}`;
                      }
                      if (data?.expectedExamStartDate) {
                        const daysToExamLeftInSemester = Math.max(
                          0,
                          Math.ceil(
                            (new Date(data.expectedExamStartDate).getTime() - new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                          )
                        );
                        return `${daysToExamLeftInSemester} day${daysToExamLeftInSemester !== 1 ? "s" : ""}`;
                      }
                      return "0 days";
                    })(),
                    `${courses} course${courses !== 1 ? "s" : ""}`,
                    `${compulsoryCourses} course${compulsoryCourses !== 1 ? "s" : ""}`,
                    `${electiveCourses} course${electiveCourses !== 1 ? "s" : ""}`,
                  ][i]}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

export default OverviewPage
