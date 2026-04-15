import { useEffect, useState } from "react"
import { authFetch, getToken, logout } from "../api/api"
import { jwtDecode } from "jwt-decode";


export default function Users() {

    const [users, setUsers] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        const token = getToken()
        if (!token) { window.location.href = "/login"; return }

        const decoded = jwtDecode(token)
        if (decoded.role !== "admin") {
            window.location.href = "/"
            return
        }

        authFetch("/auth/users/")
            .then(async (res) => {
                if (res.status === 401) {
                    logout()
                    return
                }
                const data = await res.json().catch(() => ([]))
                if (!res.ok) {
                    setError("Failed to fetch users.")
                    setUsers([])
                    return
                }
                setError("")
                setUsers(Array.isArray(data) ? data : [])
            })
            .catch(() => {
                setError("Network error while fetching users.")
                setUsers([])
            })
    }, [])

    return (
        <div style={{ maxWidth: 600, margin: "50px auto" }}>
            <h2>All Users</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {users.map(user => (
                <div 
                    key={user.id}
                    style={{ padding: 10, border: "1px solid #ddd", marginBottom: 10 }}
                >
                    <h3>{user.username}</h3>
                    <p>Email: {user.email || "N/A"}</p>
                    <p>Role: {user.role}</p>
                </div>
            ))}
        </div>
    )
}
