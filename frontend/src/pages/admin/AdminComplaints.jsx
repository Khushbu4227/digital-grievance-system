import { useEffect, useState } from "react"

import api from "../../api/axios"

import {
  Search,
  Filter,
  Eye,
  X,
  Download,
  Calendar,
} from "lucide-react"

import { toast } from "sonner"

export default function AdminComplaints() {

  const [complaints, setComplaints] = useState([])

  const [search, setSearch] = useState("")

  const [statusFilter, setStatusFilter] = useState("All")

  const [loading, setLoading] = useState(false)

  const [selectedComplaint, setSelectedComplaint] = useState(null)

  const fetchComplaints = async () => {

    try {

      setLoading(true)

      const token = localStorage.getItem("token")

      const response = await api.get(
        "/admin/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setComplaints(response.data)

    } catch (error) {

      console.log(error)

      toast.error("Failed to fetch complaints")

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  const updateStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("token")

      await api.put(
        `/admin/complaints/${id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success("Complaint status updated")

      fetchComplaints()

    } catch (error) {

      console.log(error)

      toast.error("Failed to update status")

    }
  }

  const getStatusColor = (status) => {

    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700"
    }

    if (status === "Resolved") {
      return "bg-green-100 text-green-700"
    }

    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700"
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700"
    }

    return "bg-slate-100 text-slate-700"
  }

  const getPriorityColor = (priority) => {

    if (priority === "High") {
      return "text-red-600 font-semibold"
    }

    if (priority === "Medium") {
      return "text-yellow-600 font-semibold"
    }

    return "text-green-600 font-semibold"
  }

  const filteredComplaints = complaints.filter((complaint) => {

    const matchesSearch =
      complaint.ticket_id
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      complaint.title
        ?.toLowerCase()
        .includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === "All" ||
      complaint.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-8">

      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border shadow-sm">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Complaint Management
            </h1>

            <p className="text-slate-500 mt-2">
              Manage and track all citizen complaints
            </p>

          </div>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-4">

            <div className="relative">

              <Search
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search ticket or title"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="pl-10 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-72"
              />

            </div>

            <div className="relative">

              <Filter
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="pl-10 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="All">
                  All Status
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Resolved">
                  Resolved
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

            </div>

          </div>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-8 border shadow-sm mt-6 overflow-x-auto">

        {loading ? (

          <div className="text-center py-20 text-slate-500">
            Loading complaints...
          </div>

        ) : filteredComplaints.length === 0 ? (

          <div className="text-center py-20 text-slate-500">
            No complaints found
          </div>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="border-b text-left text-slate-500">

                <th className="pb-4">
                  Ticket ID
                </th>

                <th className="pb-4">
                  Title
                </th>

                <th className="pb-4">
                  Category
                </th>

                <th className="pb-4">
                  Priority
                </th>

                <th className="pb-4">
                  Status
                </th>

                <th className="pb-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredComplaints.map((complaint) => (

                <tr
                  key={complaint.id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="py-5 font-medium text-slate-700">
                    {complaint.ticket_id}
                  </td>

                  <td className="max-w-[250px]">
                    {complaint.title}
                  </td>

                  <td>
                    {complaint.category}
                  </td>

                  <td>

                    <span
                      className={getPriorityColor(
                        complaint.priority
                      )}
                    >
                      {complaint.priority}
                    </span>

                  </td>

                  <td>

                    <span
                      className={`px-4 py-1 rounded-full text-sm ${getStatusColor(complaint.status)}`}
                    >
                      {complaint.status}
                    </span>

                  </td>

                  <td>

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() =>
                          setSelectedComplaint(complaint)
                        }
                        className="bg-slate-100 hover:bg-slate-200 p-2 rounded-xl transition"
                      >
                        <Eye size={18} />
                      </button>

                      <select
                        value={complaint.status}
                        onChange={(e) =>
                          updateStatus(
                            complaint.id,
                            e.target.value
                          )
                        }
                        className="border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Resolved">
                          Resolved
                        </option>

                        <option value="Rejected">
                          Rejected
                        </option>

                      </select>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* Modal */}
      {selectedComplaint && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto">

            <button
              onClick={() =>
                setSelectedComplaint(null)
              }
              className="absolute top-5 right-5 bg-slate-100 hover:bg-slate-200 p-2 rounded-xl"
            >
              <X size={18} />
            </button>

            <h2 className="text-3xl font-bold text-slate-800">
              Complaint Details
            </h2>

            <div className="mt-8 space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <p className="text-slate-500 text-sm">
                    Ticket ID
                  </p>

                  <h3 className="text-lg font-semibold">
                    {selectedComplaint.ticket_id}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-500 text-sm">
                    Current Status
                  </p>

                  <span
                    className={`inline-block mt-2 px-4 py-2 rounded-full text-sm ${getStatusColor(selectedComplaint.status)}`}
                  >
                    {selectedComplaint.status}
                  </span>
                </div>
                {/* Complaint Image */}
{
  selectedComplaint.file_url && (
    <div>

      <p className="text-slate-500 text-sm mb-3">
        Uploaded Proof
      </p>

      <img
        src={`http://127.0.0.1:8000${selectedComplaint.file_url}`}
        alt="Complaint"
        className="w-full max-h-[400px] object-cover rounded-2xl border"
      />

    </div>
  )
}

              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Title
                </p>

                <h3 className="text-lg font-semibold mt-1">
                  {selectedComplaint.title}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Description
                </p>

                <p className="mt-2 text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl">
                  {selectedComplaint.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <p className="text-slate-500 text-sm">
                    Category
                  </p>

                  <h3 className="font-semibold mt-1">
                    {selectedComplaint.category}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-500 text-sm">
                    Priority
                  </p>

                  <h3
                    className={`mt-1 ${getPriorityColor(
                      selectedComplaint.priority
                    )}`}
                  >
                    {selectedComplaint.priority}
                  </h3>
                </div>

              </div>

              <div>
                <p className="text-slate-500 text-sm mb-3">
                  Update Complaint Status
                </p>

                <select
                  value={selectedComplaint.status}
                  onChange={(e) => {

                    updateStatus(
                      selectedComplaint.id,
                      e.target.value
                    )

                    setSelectedComplaint({
                      ...selectedComplaint,
                      status: e.target.value,
                    })
                  }}
                  className="border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Resolved">
                    Resolved
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>

              {selectedComplaint.file_url && (

                <div>

                  <p className="text-slate-500 text-sm mb-3">
                    Attached File
                  </p>

                  <a
                    href={`http://127.0.0.1:8000${selectedComplaint.file_url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl transition"
                  >
                    <Download size={18} />

                    View Attachment
                  </a>

                </div>

              )}

              <div className="flex items-center gap-2 text-slate-500 text-sm">

                <Calendar size={16} />

                Created At:
                {
                  selectedComplaint.created_at
                    ? new Date(
                        selectedComplaint.created_at
                      ).toLocaleString()
                    : "N/A"
                }

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}