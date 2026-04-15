import { useState } from "react"
import { authFetch, logout } from "../api/api"

export default function CreateTask() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const createTask = async (e) => {
        e.preventDefault()

        const res = await authFetch("/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description })
        })

        if (res.ok) {
            window.location.href = "/"
        } else if (res.status === 401) {
            logout()
        } else {
            const data = await res.json().catch(() => ({}))
            alert(data?.errors ? JSON.stringify(data.errors) : "Failed to create task")
        }
    }

    return (
        <div style={{ maxWidth: 400, margin: "80px auto" }}>
            <h2 style={{ textAlign: "center" }}>Create New Task</h2>

            <form 
                onSubmit={createTask}
                style={{ background: "#f8f8f8", padding: 20, borderRadius: 10, boxShadow: "0px 0px 10px #ddd" }}
            >
                <input
                    placeholder="Task Title"
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: "100%", padding: 10, marginBottom: 10 }}
                />

                <textarea
                    placeholder="Task Description"
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: "100%", padding: 10, marginBottom: 15, height: 100 }}
                ></textarea>

                <button 
                    type="submit"
                    style={{ width: "100%", padding: 10, background: "#1e1e1e", color: "white", border: "none" }}
                >
                    Create
                </button>
            </form>
        </div>
    )
}
