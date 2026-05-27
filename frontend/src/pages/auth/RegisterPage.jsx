import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../../api/axios"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Card,
  CardContent,
} from "../../components/ui/card"

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      await api.post("/register", form)

      alert("Registration successful!")

      navigate("/login")
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          "Registration failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

        <div className="hidden lg:flex flex-col justify-between p-12 text-white bg-gradient-to-br from-emerald-600/30 to-cyan-500/10">
          <div>
            <p className="text-sm tracking-[0.3em] text-slate-300">
              CITIZEN REGISTRATION
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight">
              Create
              <br />
              Your
              <br />
              Account
            </h1>

            <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-md">
              Join the Digital Grievance Redressal platform.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 md:p-12">
          <Card className="w-full max-w-md border-0 shadow-none bg-white rounded-2xl">
            <CardContent className="p-8 space-y-6">
              <form
                onSubmit={handleRegister}
                className="space-y-6"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold text-slate-900">
                    Create Account
                  </h2>
                </div>

                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Create password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  className="w-full"
                  disabled={loading}
                >
                  {loading
                    ? "Creating..."
                    : "Create Account"}
                </Button>

                <p className="text-sm text-center text-slate-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}