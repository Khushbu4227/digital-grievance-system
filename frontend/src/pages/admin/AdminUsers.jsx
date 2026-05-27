import { useEffect, useState } from "react"

import api from "../../api/axios"

export default function AdminUsers() {

  const [users, setUsers] = useState([])

  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await api.get(
        "/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setUsers(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="p-8">

      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border shadow-sm">

        <h1 className="text-3xl font-bold text-slate-800">
          Users Management
        </h1>

        <p className="text-slate-500 mt-2">
          Manage all registered citizens
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <p className="text-slate-500">
            Total Citizens
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {users.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <p className="text-slate-500">
            Active Citizens
          </p>

          <h2 className="text-4xl font-bold mt-4 text-green-600">
            {
              users.filter(
                (u) => u.is_active
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <p className="text-slate-500">
            Inactive Citizens
          </p>

          <h2 className="text-4xl font-bold mt-4 text-red-600">
            {
              users.filter(
                (u) => !u.is_active
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-8 border shadow-sm mt-6 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b text-left text-slate-500">

              <th className="pb-4">
                Name
              </th>

              <th className="pb-4">
                Email
              </th>

              <th className="pb-4">
                Role
              </th>

              <th className="pb-4">
                Complaints
              </th>

              <th className="pb-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b"
              >

                <td className="py-5 font-medium">
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>

                  <span
                    className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700"
                  >
                    Citizen
                  </span>

                </td>

                <td>
                  {user.complaints}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm
                    ${
                      user.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {
                      user.is_active
                        ? "Active"
                        : "Inactive"
                    }
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}