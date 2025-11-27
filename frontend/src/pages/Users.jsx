import { useEffect, useState } from "react"
import { BASE_URL, getToken } from "../api/api"
import { jwtDecode } from "jwt-decode";


export default function Users() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const token = getToken()
        if (!token) { window.location.href = "/login"; return }

        const decoded = jwtDecode(token)
        if (decoded.role !== "admin") {
            window.location.href = "/"
            return
        }

        fetch(`${BASE_URL}/auth/users/`, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [])

    return (
        <div style={{ maxWidth: 600, margin: "50px auto" }}>
            <h2>All Users</h2>

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
