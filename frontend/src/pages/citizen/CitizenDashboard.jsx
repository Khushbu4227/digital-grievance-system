import { useEffect, useState } from "react"
import api from "../../api/axios"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

export default function CitizenDashboard() {

  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await api.get(
        "/my-complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setComplaints(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const stats = {
    total: complaints.length,

    pending: complaints.filter(
      (c) => c.status === "Pending"
    ).length,

    resolved: complaints.filter(
      (c) => c.status === "Resolved"
    ).length,

    progress: complaints.filter(
      (c) => c.status === "In Progress"
    ).length,
  }

  const pieData = [
    {
      name: "Pending",
      value: stats.pending,
    },
    {
      name: "Resolved",
      value: stats.resolved,
    },
    {
      name: "In Progress",
      value: stats.progress,
    },
  ]

  const COLORS = [
    "#facc15",
    "#22c55e",
    "#3b82f6",
  ]

  const barData = [
    {
      name: "Pending",
      complaints: stats.pending,
    },
    {
      name: "Resolved",
      complaints: stats.resolved,
    },
    {
      name: "Progress",
      complaints: stats.progress,
    },
  ]

  return (
    <div className="p-8">

      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Citizen Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor and track your grievances
          </p>

        </div>

        <div className="bg-white px-5 py-3 rounded-2xl border shadow-sm">

          <p className="text-sm text-slate-500">
            Logged In As
          </p>

          <h3 className="font-semibold text-slate-800">
            Citizen User
          </h3>

        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-6 shadow-lg">

          <p className="text-sm">
            Total Complaints
          </p>

          <h2 className="text-5xl font-bold mt-5">
            {stats.total}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">

          <p className="text-slate-500">
            Pending
          </p>

          <h2 className="text-5xl font-bold mt-5 text-yellow-500">
            {stats.pending}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">

          <p className="text-slate-500">
            Resolved
          </p>

          <h2 className="text-5xl font-bold mt-5 text-green-600">
            {stats.resolved}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">

          <p className="text-slate-500">
            In Progress
          </p>

          <h2 className="text-5xl font-bold mt-5 text-blue-600">
            {stats.progress}
          </h2>

        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl p-6 border shadow-sm">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-800">
              Complaint Status Overview
            </h2>

            <p className="text-slate-500 mt-1">
              Distribution of complaint statuses
            </p>

          </div>

          <div className="h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >

                  {pieData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-3xl p-6 border shadow-sm">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-800">
              Complaint Analytics
            </h2>

            <p className="text-slate-500 mt-1">
              Comparative complaint analysis
            </p>

          </div>

          <div className="h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={barData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="complaints"
                  fill="#2563eb"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* Recent Complaints
      <div className="mt-8 bg-white rounded-3xl p-8 border shadow-sm">

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-slate-800">
            Recent Complaints
          </h2>

          <p className="text-slate-500 mt-1">
            Latest complaints submitted by you
          </p>

        </div>

        <div className="space-y-4">

          {complaints.slice(0, 5).map((complaint) => (

            <div
              key={complaint.id}
              className="border rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 hover:shadow-md transition"
            >

              <div>

                <h3 className="font-semibold text-lg text-slate-800">
                  {complaint.title}
                </h3>

                <p className="text-slate-500 text-sm mt-1">
                  Ticket ID: {complaint.ticket_id}
                </p>

              </div>

              <div className="flex items-center gap-3 flex-wrap">

                <span className="bg-slate-100 text-slate-700 px-4 py-1 rounded-full text-sm">
                  {complaint.category}
                </span>

                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
                  {complaint.priority}
                </span>

                <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm">
                  {complaint.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div> */
      }

    </div>
  )
}