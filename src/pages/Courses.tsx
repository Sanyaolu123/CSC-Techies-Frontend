import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import type { Response, Courses } from "@/interfaces";
import { fetchCourses } from "@/services";

// Skeleton component
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export default function CoursesList() {
  const [selectedCourse, setSelectedCourse] = useState<Courses | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [data, setData] = useState<Courses[] | null>(null)

  useEffect(() => {
    const load = async () => {
      const courses: Response<Courses[]> = await fetchCourses()
      setData(courses.data)
      setLoading(false)
    }

    load()
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      setModalLoading(true);
      const timer = setTimeout(() => setModalLoading(false), 900);
      return () => clearTimeout(timer);
    }
  }, [selectedCourse]);

  return (
    <div className="max-w-7xl mx-auto px-3 py-10 space-y-8">
      <h1 className="text-3xl font-bold mb-4 font-mono">🎓 Courses</h1>

      <div className="flex space-x-6 text-gray-700 text-sm font-medium select-none">
        <div className="flex items-center space-x-2">
          <span className="block w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center font-semibold">C</span>
          <span>Compulsory</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="block w-5 h-5 rounded bg-purple-600 text-white flex items-center justify-center font-semibold">E</span>
          <span>Elective</span>
        </div>
      </div>

      <div className={
        data?.length === 0
          ? ""
          : "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      }>
        {loading ? (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white"
              >
                <Skeleton className="h-6 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </>
        ) : data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 space-y-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/8125/8125453.png"
              alt="No courses"
              className="w-28 h-28 opacity-70"
            />
            <p className="text-lg font-mono font-semibold">No courses available yet</p>
          </div>
        ) : (
          <>
            {data?.map((course) => (
              <div
                key={course.id}
                className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white cursor-pointer transition-shadow duration-300 hover:shadow-lg"
                onClick={() => setSelectedCourse(course)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedCourse(course)}
              >
                <h2 className="font-mono tracking-tight text-xl font-semibold text-gray-800 mb-2">{course.courseCode}</h2>
                <p className="text-sm font-mono text-gray-500 tracking-widest mb-4">{course.courseTitle} </p>
                <p className="text-sm font-mono text-gray-500 tracking-widest mb-4">{course.units} units {course.courseType == 'COMPULSORY' ? 'C' : 'E'}</p>
                <p className="font-mono tracking-tight text-sm text-gray-600 font-medium">
                  {course.materials.length} materials available
                </p>
              </div>
            ))}
          </>
        )}

      </div>

      {/* Modal for showing materials */}
      {selectedCourse && (
        <Dialog open={true} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="sm:max-w-l mx-w-sm max-w-2xl p-8 py-4 rounded-2xl shadow-2xl" aria-describedby="dialog-description">
            <DialogHeader>
              <DialogTitle className="font-mono">
                <span className="font-bold text-2xl text-gray-900">{selectedCourse.courseCode}</span> <br />
                <span className="text-gray-500"><small>{selectedCourse.courseTitle}</small></span>
              </DialogTitle>
            </DialogHeader>

            {/* Scrollable container */}
            <div className="mt-6 space-y-4 max-h-[30vh] overflow-y-auto pr-2">
              {modalLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center p-4 rounded-lg border border-gray-300 bg-gray-50 opacity-90">
                    <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))
              ) : selectedCourse.materials.length === 0 ? (
                <p className="text-gray-500 italic">No materials found.</p>
              ) : (
                selectedCourse.materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex justify-between items-center p-4 rounded-lg border border-gray-300 bg-gray-50 opacity-90 gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">
                        {material.type === "ASSIGMENT" && <span title="Assignment">📝</span>}
                        {material.type === "RECORDING" && <span title="Recording">🎤</span>}
                        {material.type === "DOCUMENT" && <span title="Document">📄</span>}
                        {material.type === "NOTE" && <span title="Notes">🗒️</span>}
                        {material.type === "VIDEO" && <span title="Videos">🎬</span>}
                        {material.type === "WEBSITE" && <span title="Website">🌐</span>}
                      </span>
                      <div className="flex flex-col gap-1">
                        <small className="font-semibold text-gray-900 text-base font-mono">{material.title}</small>
                        <p className="text-xs capitalize text-gray-600 tracking-wide font-mono">{material.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {material.available ? (
                        <motion.div
                          key={material.url}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Button variant="default" className="whitespace-nowrap" size="sm" asChild>
                            <a href={material.url} rel="" className="font-mono" target="_blank">View</a>
                          </Button>
                        </motion.div>
                      ) : (
                        <p className="text-xs italic text-red-600 tracking-wide">Not Available</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end mt-8">
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer" size="sm">
                  Close
                </Button>
              </DialogClose>
            </div>
          </DialogContent>

        </Dialog>
      )}
    </div>
  );
}
