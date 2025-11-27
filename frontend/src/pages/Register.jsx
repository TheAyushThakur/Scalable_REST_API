import { useState } from "react"
import { BASE_URL } from "../api/api"

export default function Register() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()

        const res = await fetch(`${BASE_URL}/auth/register/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        })

        const data = await res.json()

        if (data.message) {
            alert("Registered Successfully")
            window.location.href = "/login"
        } else {
            alert("Error: " + JSON.stringify(data))
        }
    }

    return (
        <div style={{ maxWidth: 320, margin: "80px auto", textAlign: "center" }}>
            <h2>Create Account</h2>

            <form 
                onSubmit={handleRegister} 
                style={{ background: "#f8f8f8", padding: 20, borderRadius: 10, boxShadow: "0px 0px 10px #ddd" }}
            >
                <input 
                    placeholder="Username" 
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: "100%", padding: 10, marginBottom: 10 }} 
                />

                <input 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", padding: 10, marginBottom: 10 }} 
                />

                <input 
                    placeholder="Password" 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", padding: 10, marginBottom: 15 }} 
                />

                <button 
                    type="submit"
                    style={{ width: "100%", padding: 10, background: "#111", color: "white", border: "none" }}
                >
                    Register
                </button>
            </form>

            <p style={{ marginTop: 15 }}>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    )
}
