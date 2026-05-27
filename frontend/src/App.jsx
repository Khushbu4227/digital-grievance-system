import { Routes, Route } from "react-router-dom"

import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"

import CitizenDashboard from "./pages/citizen/CitizenDashboard"
import SubmitComplaint from "./pages/citizen/SubmitComplaint"
import MyComplaints from "./pages/citizen/MyComplaints"

import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminComplaints from "./pages/admin/AdminComplaints"
import AdminUsers from "./pages/admin/AdminUsers"

import ProtectedRoute from "./routes/ProtectedRoute"

import CitizenLayout from "./layouts/CitizenLayout"
import AdminLayout from "./layouts/AdminLayout"

import {
  ShieldCheck,
  FileWarning,
  Search,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  BrainCircuit,
  Clock3,
} from "lucide-react"

import { Link } from "react-router-dom"


function HomePage() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">

      {/* Navbar */}
      <div className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 bg-black/20">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              GrievanceAI
            </h1>

          </div>

          <div className="flex items-center gap-4">

            <Link
              to="/login"
              className="px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition text-white font-semibold"
            >
              Sign Up
            </Link>

          </div>

        </div>

      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 mb-8">

            <BrainCircuit size={18} />

            AI Powered Smart Grievance System

          </div>

          <h1 className="text-6xl font-black leading-tight">

            Digital
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              {" "}Complaint
            </span>
            <br />

            Resolution Platform

          </h1>

          <p className="text-slate-300 text-xl mt-8 leading-relaxed">

            A next-generation grievance redressal platform where citizens
            can report issues, upload evidence, track complaint status,
            and get faster resolutions using AI-based classification
            and smart priority prediction.

          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            <Link
              to="/citizen/submit-complaint"
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition duration-300 shadow-2xl"
            >
              Submit Complaint
              <ArrowRight size={22} />
            </Link>

            <Link
              to="/register"
              className="bg-white/10 border border-white/20 hover:bg-white/20 px-8 py-4 rounded-2xl font-semibold transition"
            >
              Create Account
            </Link>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5">
              <h3 className="text-4xl font-black text-cyan-400">
                10K+
              </h3>

              <p className="text-slate-400 mt-2">
                Complaints Solved
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5">
              <h3 className="text-4xl font-black text-green-400">
                95%
              </h3>

              <p className="text-slate-400 mt-2">
                Resolution Rate
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5">
              <h3 className="text-4xl font-black text-yellow-400">
                AI
              </h3>

              <p className="text-slate-400 mt-2">
                Smart Prediction
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5">
              <h3 className="text-4xl font-black text-pink-400">
                24/7
              </h3>

              <p className="text-slate-400 mt-2">
                Support System
              </p>
            </div>

          </div>

        </div>

        {/* Right Card */}
        <div className="relative">

          <div className="absolute -top-10 -left-10 h-72 w-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>

          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 relative z-10 shadow-[0_0_80px_rgba(0,0,0,0.4)]">

            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt="AI Complaint"
              className="w-full max-w-lg mx-auto"
            />

          </div>

        </div>

      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center">

          <h2 className="text-5xl font-black">
            Powerful Features
          </h2>

          <p className="text-slate-400 text-lg mt-5">
            Designed for modern grievance management and citizen transparency
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition duration-300">

            <div className="h-16 w-16 rounded-2xl bg-blue-500/20 flex items-center justify-center">

              <FileWarning
                className="text-blue-400"
                size={32}
              />

            </div>

            <h3 className="text-2xl font-bold mt-6">
              Complaint Submission
            </h3>

            <p className="text-slate-400 mt-4 leading-relaxed">
              Submit complaints with proof images and receive instant ticket IDs.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition duration-300">

            <div className="h-16 w-16 rounded-2xl bg-green-500/20 flex items-center justify-center">

              <Search
                className="text-green-400"
                size={32}
              />

            </div>

            <h3 className="text-2xl font-bold mt-6">
              Live Tracking
            </h3>

            <p className="text-slate-400 mt-4 leading-relaxed">
              Track complaint progress in real time with instant updates.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition duration-300">

            <div className="h-16 w-16 rounded-2xl bg-red-500/20 flex items-center justify-center">

              <ShieldCheck
                className="text-red-400"
                size={32}
              />

            </div>

            <h3 className="text-2xl font-bold mt-6">
              Secure Platform
            </h3>

            <p className="text-slate-400 mt-4 leading-relaxed">
              JWT authentication and secure complaint management system.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition duration-300">

            <div className="h-16 w-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">

              <BrainCircuit
                className="text-cyan-400"
                size={32}
              />

            </div>

            <h3 className="text-2xl font-bold mt-6">
              AI Prediction
            </h3>

            <p className="text-slate-400 mt-4 leading-relaxed">
              AI automatically predicts category and complaint priority.
            </p>

          </div>

        </div>

      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center">

          <h2 className="text-5xl font-black">
            How It Works
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">

          <div className="text-center">

            <div className="h-24 w-24 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">

              <FileWarning
                size={40}
                className="text-blue-400"
              />

            </div>

            <h3 className="text-2xl font-bold mt-8">
              Submit Complaint
            </h3>

            <p className="text-slate-400 mt-4">
              Citizens register complaints with title, description and evidence.
            </p>

          </div>

          <div className="text-center">

            <div className="h-24 w-24 mx-auto rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">

              <BrainCircuit
                size={40}
                className="text-cyan-400"
              />

            </div>

            <h3 className="text-2xl font-bold mt-8">
              AI Analysis
            </h3>

            <p className="text-slate-400 mt-4">
              AI predicts complaint category and priority automatically.
            </p>

          </div>

          <div className="text-center">

            <div className="h-24 w-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">

              <CheckCircle2
                size={40}
                className="text-green-400"
              />

            </div>

            <h3 className="text-2xl font-bold mt-8">
              Resolution
            </h3>

            <p className="text-slate-400 mt-4">
              Admin resolves complaints and updates live complaint status.
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-white/10 py-10 mt-10">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">

          <div>

            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              GrievanceAI
            </h2>

            <p className="text-slate-400 mt-2">
              Smart Digital Grievance Redressal System
            </p>

          </div>

          <div className="flex items-center gap-6 text-slate-400">

            <div className="flex items-center gap-2">
              <Clock3 size={18} />
              24/7 Support
            </div>

            <div className="flex items-center gap-2">
              <BarChart3 size={18} />
              AI Analytics
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* Citizen Routes */}
      <Route
        path="/citizen"
        element={<CitizenLayout />}
      >

        <Route
          path="dashboard"
          element={<CitizenDashboard />}
        />

        <Route
          path="submit-complaint"
          element={<SubmitComplaint />}
        />

        <Route
          path="my-complaints"
          element={<MyComplaints />}
        />

      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="complaints"
          element={<AdminComplaints />}
        />

        <Route
          path="users"
          element={<AdminUsers />}
        />

      </Route>

    </Routes>
  )
}