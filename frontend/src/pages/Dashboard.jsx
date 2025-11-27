import { useEffect, useState } from "react";
import { BASE_URL, getToken } from "../api/api";
import Loader from "../components/Loader";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
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

    fetch(`${BASE_URL}/tasks/`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>{role === "admin" ? "All Tasks" : "Your Tasks"}</h2>

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

            {/* Only users can edit their tasks */}
            {(role !== "admin" || task.owner === username) && (
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
