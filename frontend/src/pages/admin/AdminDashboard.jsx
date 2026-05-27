import { useEffect, useState } from "react"

import {
  Bell,
  TrendingUp,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react"

import { motion } from "framer-motion"

import api from "../../api/axios"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    total_complaints: 0,
    resolved: 0,
    pending: 0,
    in_progress: 0,
    rejected: 0,
  })

  const [recentComplaints, setRecentComplaints] = useState([])

  const fetchStats = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await api.get(
        "/admin/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setStats(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const fetchRecentComplaints = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await api.get(
        "/admin/recent-complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setRecentComplaints(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  useEffect(() => {

    fetchStats()

    fetchRecentComplaints()

  }, [])

  const pieData = [
    {
      name: "Resolved",
      value: stats.resolved,
    },
    {
      name: "Pending",
      value: stats.pending,
    },
    {
      name: "In Progress",
      value: stats.in_progress,
    },
    {
      name: "Rejected",
      value: stats.rejected,
    },
  ]

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#3b82f6",
    "#ef4444",
  ]

  const analyticsData = [
    {
      name: "Total",
      value: stats.total_complaints,
    },
    {
      name: "Pending",
      value: stats.pending,
    },
    {
      name: "Resolved",
      value: stats.resolved,
    },
    {
      name: "Progress",
      value: stats.in_progress,
    },
    {
      name: "Rejected",
      value: stats.rejected,
    },
  ]

  const resolvePercent =
    stats.total_complaints > 0
      ? (
          (stats.resolved /
            stats.total_complaints) *
          100
        ).toFixed(0)
      : 0

  return (
    <div className="bg-slate-100 min-h-screen">

      {/* Navbar */}
      <div className="bg-white border-b px-6 py-5 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Admin Dashboard
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Digital Grievance Redressal System
          </p>

        </div>

        <div className="flex items-center gap-4">

          <button className="relative bg-slate-100 p-3 rounded-full hover:bg-slate-200 transition">

            <Bell size={20} />

            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>

          </button>

          <div className="h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            A
          </div>

        </div>

      </div>

      {/* Content */}
      <div className="p-6">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl p-6 shadow-sm border"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">
                  Total Complaints
                </p>

                <h3 className="text-4xl font-bold mt-4 text-slate-800">
                  {stats.total_complaints}
                </h3>

              </div>

              <div className="bg-slate-100 p-4 rounded-2xl">
                <TrendingUp className="text-slate-700" />
              </div>

            </div>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl p-6 shadow-sm border"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">
                  Resolved
                </p>

                <h3 className="text-4xl font-bold mt-4 text-green-600">
                  {stats.resolved}
                </h3>

              </div>

              <div className="bg-green-100 p-4 rounded-2xl">
                <CheckCircle2 className="text-green-600" />
              </div>

            </div>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl p-6 shadow-sm border"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">
                  Pending
                </p>

                <h3 className="text-4xl font-bold mt-4 text-yellow-500">
                  {stats.pending}
                </h3>

              </div>

              <div className="bg-yellow-100 p-4 rounded-2xl">
                <Clock3 className="text-yellow-600" />
              </div>

            </div>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl p-6 shadow-sm border"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500">
                  Rejected
                </p>

                <h3 className="text-4xl font-bold mt-4 text-red-500">
                  {stats.rejected}
                </h3>

              </div>

              <div className="bg-red-100 p-4 rounded-2xl">
                <AlertTriangle className="text-red-600" />
              </div>

            </div>

          </motion.div>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

          {/* Pie Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border">

            <h3 className="text-xl font-semibold mb-6">
              Complaint Status
            </h3>

            <div className="h-[300px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >

                    {pieData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))}

                  </Pie>

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border">

            <h3 className="text-xl font-semibold mb-6">
              Complaint Analytics
            </h3>

            <div className="h-[300px]">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={analyticsData}>

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* Progress */}
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm border">

          <div className="flex items-center justify-between">

            <h3 className="text-2xl font-semibold">
              Resolution Progress
            </h3>

            <span className="font-bold text-green-600">
              {resolvePercent}%
            </span>

          </div>

          <div className="w-full bg-slate-200 rounded-full h-4 mt-6 overflow-hidden">

            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-700"
              style={{
                width: `${resolvePercent}%`,
              }}
            ></div>

          </div>

        </div>

        {/* Recent Complaints */}
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm border">

          <h3 className="text-2xl font-semibold">
            Recent Complaints
          </h3>

          <div className="overflow-x-auto mt-6">

            <table className="w-full">

              <thead>

                <tr className="border-b text-left text-slate-500">

                  <th className="pb-4">
                    Ticket ID
                  </th>

                  <th className="pb-4">
                    Citizen
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

                </tr>

              </thead>

              <tbody>

                {recentComplaints.map((complaint) => (

                  <tr
                    key={complaint.id}
                    className="border-b hover:bg-slate-50 transition"
                  >

                    <td className="py-5">
                      {complaint.ticket_id}
                    </td>

                    <td>
                      {complaint.citizen_name}
                    </td>

                    <td>
                      {complaint.category}
                    </td>

                    <td>
                      {complaint.priority}
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm
                        ${
                          complaint.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : complaint.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : complaint.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {complaint.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  )
}