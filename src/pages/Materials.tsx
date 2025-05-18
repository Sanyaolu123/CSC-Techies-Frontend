import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import type { Response, Material } from "@/interfaces"
import { fetchAllMaterials } from "@/services"

function SkeletonRow() {
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4 text-center">
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mx-auto" />
      </td>
    </tr>
  )
}

export default function MaterialsPage() {
  const [allData, setAllData] = useState<Material[]>([])
  const [materials, setMaterials] = useState<Material[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const pageSize = 5

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [loading, setLoading] = useState(false)

  // Fetch all materials on mount
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res: Response<Material[]> = await fetchAllMaterials()
      setAllData(res.data)
      setLoading(false)
    }

    load()
  }, [])

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 500)
    return () => clearTimeout(handler)
  }, [search])

  // Filter + paginate data
  useEffect(() => {
    setLoading(true)

    let filtered = [...allData]
    if (debouncedSearch.trim() !== "") {
      const searchLower = debouncedSearch.toLowerCase()
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(searchLower) ||
          m.course.courseCode.toLowerCase().includes(searchLower) ||
          m.type.toLowerCase().includes(searchLower)
      )
    }

    const totalItems = filtered.length
    const start = (page - 1) * pageSize
    const paginated = filtered.slice(start, start + pageSize)

    setMaterials(paginated)
    setTotal(totalItems)
    setLoading(false)
  }, [allData, page, debouncedSearch])

  const totalPages = Math.ceil(total / pageSize)

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p)
  }

  return (
    <div className="max-w-7xl mx-auto px-3 py-10 space-y-6">
      <h1 className="text-4xl font-extrabold text-gray-900 font-mono tracking-tight">📘 Materials</h1>

      {/* Search */}
      <div className="flex items-center space-x-4 max-w-md">
        <Input
          type="search"
          placeholder="Search materials or course codes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Button variant="outline" onClick={() => setSearch("")}>
          Clear
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Material Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Course Code</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Link</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading
              ? Array(pageSize).fill(0).map((_, i) => <SkeletonRow key={i} />)
              : materials.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500 italic">
                    No materials found.
                  </td>
                </tr>
              ) : (
                materials.map((m) => (
                  <motion.tr
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 246, 255, 0.8)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium font-mono">
                      <span className="text-2xl mr-2">
                        {m.type === "ASSIGMENT" && <span title="Assignment">📝</span>}
                        {m.type === "RECORDING" && <span title="Recording">🎤</span>}
                        {m.type === "DOCUMENT" && <span title="Document">📄</span>}
                        {m.type === "NOTE" && <span title="Notes">🗒️</span>}
                        {m.type === "VIDEO" && <span title="Videos">🎬</span>}
                        {m.type === "WEBSITE" && <span title="Website">🌐</span>}
                      </span>{m.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-mono">{m.course?.courseCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {m.available ? (
                        <motion.div
                          key={m.url}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Button variant="default" size="sm" asChild>
                            <a href={m.url} target="_blank" className="font-mono" rel="noopener noreferrer">View</a>
                          </Button>
                        </motion.div>
                      ) : (
                        <span className="text-xs italic text-red-500 font-mono">Not Available</span>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{materials.length}</span> of <span className="font-semibold">{total}</span> materials
        </p>
        <nav className="space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1 || loading}
          >
            Prev
          </Button>
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1
            return (
              <Button
                key={pageNum}
                variant={pageNum === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(pageNum)}
                disabled={loading}
              >
                {pageNum}
              </Button>
            )
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages || loading}
          >
            Next
          </Button>
        </nav>
      </div>
    </div>
  )
}
