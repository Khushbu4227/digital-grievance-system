import { useState } from "react"
import api from "../../api/axios"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"

export default function SubmitComplaint() {

  const [form, setForm] = useState({
    title: "",
    description: "",
  })

  const [file, setFile] = useState(null)

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      const formData = new FormData()

      formData.append(
        "title",
        form.title
      )

      formData.append(
        "description",
        form.description
      )

      if (file) {
        formData.append(
          "file",
          file
        )
      }

      const token = localStorage.getItem("token")

      const response = await api.post(
        "/complaints",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )

      alert(
        `Complaint Submitted Successfully\nTicket ID: ${response.data.ticket_id}`
      )

      setForm({
        title: "",
        description: "",
      })

      setFile(null)

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.detail ||
        "Complaint submission failed"
      )

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border p-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Submit Complaint
          </h1>

          <p className="text-slate-500 mt-2">
            Register your grievance with proper details
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <div className="space-y-2">

            <Label>
              Complaint Title
            </Label>

            <Input
              name="title"
              placeholder="Enter complaint title"
              value={form.title}
              onChange={handleChange}
              required
            />

          </div>

          <div className="space-y-2">

            <Label>
              Description
            </Label>

            <Textarea
              name="description"
              placeholder="Describe your issue"
              rows={6}
              value={form.description}
              onChange={handleChange}
              required
            />

          </div>

          <div className="space-y-2">

            <Label>
              Upload Evidence
            </Label>

            <Input
              type="file"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />

          </div>

          <Button
            className="w-full h-12 text-base"
            disabled={loading}
          >
            {
              loading
                ? "Submitting..."
                : "Submit Complaint"
            }
          </Button>

        </form>

      </div>

    </div>
  )
}