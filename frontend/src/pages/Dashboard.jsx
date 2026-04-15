import { useEffect, useState } from "react";
import { authFetch, getToken, logout } from "../api/api";
import Loader from "../components/Loader";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      const token = getToken();
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setUsername(decoded.username);
      } catch (err) {
        console.error("Token decode error:", err);
      }

      try {
        const res = await authFetch("/tasks/");
        if (res.status === 401) {
          logout();
          return;
        }

        const data = await res.json();
        if (!res.ok) {
          setError("Failed to fetch tasks.");
          setTasks([]);
        } else {
          setTasks(Array.isArray(data) ? data : []);
          setError("");
        }
      } catch (err) {
        setError("Network error while fetching tasks.");
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (loading) return <Loader />;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>{role === "admin" ? "All Tasks" : "Your Tasks"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {tasks.length === 0 && (
        <p>{role === "admin" ? "No tasks found." : "No tasks found. Create one!"}</p>
      )}

      {tasks.map((task) => {
        return (
          <div
            key={task.id}
            style={{
              padding: 15,
              border: "1px solid #ccc",
              marginBottom: 10,
              borderRadius: 6,
              background: task.is_completed ? "#d4ffd4" : "#ffecec",
            }}
          >
            <h3>
              {task.title} {task.is_completed ? "(Completed)" : "(Pending)"}
            </h3>

            <p>{task.description}</p>

            {/* Task owner visible to admin */}
            {role === "admin" && (
              <p>
                <strong>Created by:</strong> {task.owner}
              </p>
            )}

            <p>
              <strong>Status:</strong>{" "}
              {task.is_completed ? "Completed" : "Not Completed"}
            </p>

            {/* Admins can edit all tasks, users can edit only their own */}
            {(role === "admin" || task.owner === username) && (
              <button
                style={{ marginRight: 10 }}
                onClick={() => (window.location.href = `/edit/${task.id}`)}
              >
                Edit
              </button>
            )}
          </div>
        );
})}

    </div>
  );
}
