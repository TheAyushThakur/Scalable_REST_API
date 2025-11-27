import { getToken, logout } from "../api/api"
import { jwtDecode } from "jwt-decode"

export default function Navbar() {
    
    const token = getToken()
    let role = null
    if (token) {
        try {
            const decoded = jwtDecode(token)
            role = decoded.role
        } catch (error) {
            console.error("Invalid token:", error)
        }
    }

    return (
        <nav
            style={{
                padding: "12px 20px",
                background: "#111",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
            }}
        >
            <h2 style={{ margin: 0 }}>Task Manager</h2>

            <div style={{ display: "flex", alignItems: "center" }}>

                {token && (
                    <>
                        {/* Dashboard */}
                        <a
                            href="/"
                            style={{
                                color: "white",
                                marginRight: 25,
                                textDecoration: "none",
                            }}
                        >
                            Dashboard
                        </a>

                        {/* Create Task */}
                        <a
                            href="/create"
                            style={{
                                color: "white",
                                marginRight: 25,
                                textDecoration: "none",
                            }}
                        >
                            Create Task
                        </a>

                        {/* Admin-only links */}
                        {role === "admin" && (
                            <>
                                <a
                                    href="/users"
                                    style={{
                                        color: "lightblue",
                                        marginRight: 25,
                                        textDecoration: "none",
                                    }}
                                >
                                    View Users
                                </a>
                            </>
                        )}

                        {/* Logout Button */}
                        <button
                            onClick={logout}
                            style={{
                                background: "red",
                                color: "white",
                                padding: "8px 15px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}

                {/* If not logged in */}
                {!token && (
                    <>
                        <a
                            href="/login"
                            style={{
                                color: "white",
                                marginRight: 20,
                                textDecoration: "none",
                            }}
                        >
                            Login
                        </a>
                        <a
                            href="/register"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            Register
                        </a>
                    </>
                )}
            </div>
        </nav>
    )
}
