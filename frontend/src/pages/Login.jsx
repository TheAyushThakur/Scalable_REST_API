import { useState } from "react"
import { BASE_URL, setToken } from "../api/api"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

        const res = await fetch(`${BASE_URL}/auth/login/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        })

        const data = await res.json()

        if (data.access) {
            setToken(data.access)
            window.location.href = "/"
        } else {
            alert("Invalid login credentials")
        }
    }

    return (
        <div style={{ maxWidth: 300, margin: "80px auto", textAlign: "center" }}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input 
                    placeholder="Username" 
                    onChange={e => setUsername(e.target.value)}
                    style={{ width: "100%", padding: 10, marginBottom: 15 }} />

                <input 
                    placeholder="Password" 
                    type="password" 
                    onChange={e => setPassword(e.target.value)}
                    style={{ width: "100%", padding: 10, marginBottom: 15 }} />

                <button style={{ width: "100%", padding: 10 }}>Login</button>
            </form>

            <p style={{ marginTop: 15 }}>
                <a href="/register">Create an account</a>
            </p>
        </div>
    )
}
