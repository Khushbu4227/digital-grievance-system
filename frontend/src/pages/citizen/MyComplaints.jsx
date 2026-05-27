import { useEffect, useState } from "react"
import api from "../../api/axios"

export default function MyComplaints() {

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

  return (
    <div className="p-8">

      <div className="bg-white rounded-3xl p-8 shadow-sm border">

        <div className="mb-6">

          <h1 className="text-3xl font-bold text-slate-800">
            My Complaints
          </h1>

          <p className="text-slate-500 mt-2">
            Track all your submitted complaints
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b text-left">

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

              </tr>

            </thead>

            <tbody>

              {complaints.map((complaint) => (

                <tr
                  key={complaint.id}
                  className="border-b"
                >

                  <td className="py-5">
                    {complaint.ticket_id}
                  </td>

                  <td>
                    {complaint.title}
                  </td>

                  <td>
                    {complaint.category}
                  </td>

                  <td>
                    {complaint.priority}
                  </td>

                  <td>

                    <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm">
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
  )
}