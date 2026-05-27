import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
} from "lucide-react"

import { NavLink, Outlet, useNavigate } from "react-router-dom"

export default function AdminLayout() {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const navClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-slate-800 text-slate-300"
    }`

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <div className="w-72 bg-slate-950 text-white p-6 hidden lg:flex flex-col">

        <div>
          <h1 className="text-3xl font-bold">
            DGRS
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Admin Panel
          </p>
        </div>

        <div className="mt-10 space-y-3">

          <NavLink
            to="/admin/dashboard"
            className={navClass}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/complaints"
            className={navClass}
          >
            <FileText size={20} />
            Complaints
          </NavLink>

          <NavLink
            to="/admin/users"
            className={navClass}
          >
            <Users size={20} />
            Users
          </NavLink>

        </div>

        <button
          onClick={logout}
          className="mt-auto bg-red-600 hover:bg-red-700 py-3 rounded-2xl"
        >
          <div className="flex items-center justify-center gap-2">
            <LogOut size={18} />
            Logout
          </div>
        </button>

      </div>

      {/* Main */}
      <div className="flex-1">
        <Outlet />
      </div>

    </div>
  )
}