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

export default function LoginPage() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
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

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      const response = await api.post(
        "/login",
        form
      )

      const data = response.data

      console.log(data)

      // Save Token
      localStorage.setItem(
        "token",
        data.access_token
      )

      // Save Role
      localStorage.setItem(
        "role",
        data.role
      )

      // Save User Name
      localStorage.setItem(
        "name",
        data.name
      )

      alert("Login successful!")

      // Redirect
      if (data.role === "admin") {

        navigate("/admin/dashboard")

      } else {

        navigate("/citizen/dashboard")

      }

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.detail ||
        "Login failed"
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-between p-12 text-white bg-gradient-to-br from-blue-600/30 to-cyan-500/10">

          <div>

            <p className="text-sm tracking-[0.3em] text-slate-300">
              GOVERNMENT PORTAL
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight">

              Digital
              <br />

              Grievance
              <br />

              Redressal

            </h1>

            <p className="mt-8 text-slate-300 leading-relaxed">

              Smart AI-powered complaint management system
              for citizens and government authorities.

            </p>

          </div>

          <div className="text-slate-400 text-sm">
            © 2026 Digital Grievance System
          </div>

        </div>

        {/* Right Login Card */}
        <div className="flex items-center justify-center p-6 md:p-12">

          <Card className="w-full max-w-md border-0 shadow-none bg-white rounded-2xl">

            <CardContent className="p-8">

              <form
                onSubmit={handleLogin}
                className="space-y-6"
              >

                <div className="space-y-2 text-center">

                  <h2 className="text-3xl font-bold text-slate-900">
                    Welcome Back
                  </h2>

                  <p className="text-slate-500">
                    Login to continue
                  </p>

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
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                  />

                </div>

                <Button
                  className="w-full"
                  disabled={loading}
                >

                  {
                    loading
                      ? "Logging in..."
                      : "Login"
                  }

                </Button>

                <p className="text-sm text-center text-slate-600">

                  Don’t have an account?{" "}

                  <Link
                    to="/register"
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
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