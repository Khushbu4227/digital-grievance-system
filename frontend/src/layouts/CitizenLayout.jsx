import { Outlet, Link, useLocation } from "react-router-dom"

import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
} from "lucide-react"

export default function CitizenLayout() {

  const location = useLocation()

  const userName =
    localStorage.getItem("name") || "Citizen"

  const firstLetter =
    userName.charAt(0).toUpperCase()

  const menu = [
    {
      name: "Dashboard",
      path: "/citizen/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My Complaints",
      path: "/citizen/my-complaints",
      icon: <FileText size={20} />,
    },
    {
      name: "Submit Complaint",
      path: "/citizen/submit-complaint",
      icon: <PlusCircle size={20} />,
    },
  ]

  return (

    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <div className="hidden md:flex w-80 bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white flex-col p-6 shadow-2xl">

        {/* Logo */}
        <div>

          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            GrievanceAI
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Citizen Portal
          </p>

        </div>

        {/* User Card */}
        <div className="mt-10 bg-white/10 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">

          <div className="flex items-center gap-4">

            <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold">

              {firstLetter}

            </div>

            <div>

              <h2 className="text-xl font-bold">
                {userName}
              </h2>

              <p className="text-slate-400 text-sm">
                Logged In Citizen
              </p>

            </div>

          </div>

        </div>

        {/* Menu */}
        <div className="mt-10 space-y-4">

          {menu.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg"
                  : "hover:bg-white/10"
              }`}
            >

              {item.icon}

              <span className="font-medium">
                {item.name}
              </span>

            </Link>

          ))}

        </div>

        {/* Bottom */}
        <div className="mt-auto">

          <button
            onClick={() => {
              localStorage.clear()
              window.location.href = "/login"
            }}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition py-4 rounded-2xl font-semibold"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

    </div>
  )
}