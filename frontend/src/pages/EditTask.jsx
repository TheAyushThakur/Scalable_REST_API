import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authFetch, logout } from "../api/api";

export default function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTask = async () => {
      const res = await authFetch(`/tasks/${id}/`);
      if (res.status === 401) {
        logout();
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError("Could not load task.");
        return;
      }
      setTask(data);
    };

    loadTask();
  }, []);

  const updateTask = async (e) => {
    e.preventDefault();

    const res = await authFetch(`/tasks/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (res.status === 401) {
      logout();
      return;
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.errors ? JSON.stringify(data.errors) : "Failed to update task.");
      return;
    }

    window.location.href = "/";
  };

  const deleteTask = async () => {
    const res = await authFetch(`/tasks/${id}/`, {
      method: "DELETE",
    });

    if (res.status === 401) {
      logout();
      return;
    }
    if (!res.ok) {
      setError("Failed to delete task.");
      return;
    }

    window.location.href = "/";
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2 style={{ textAlign: "center" }}>Edit Task</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form
        onSubmit={updateTask}
        style={{
          background: "#f8f8f8",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0px 0px 10px #ddd",
        }}
      >
        <input
          value={task.title || ""}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <textarea
          value={task.description || ""}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          style={{ width: "100%", padding: 10, marginBottom: 10, height: 100 }}
        ></textarea>

        <div style={{ marginBottom: 15 }}>
          <input
            type="checkbox"
            checked={task.is_completed || false}
            onChange={(e) =>
              setTask({ ...task, is_completed: e.target.checked })
            }
          />
          <label style={{ marginLeft: 8 }}>Completed</label>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#111",
            color: "white",
            border: "none",
          }}
        >
          Update Task
        </button>

        <button
          onClick={deleteTask}
          type="button"
          style={{
            width: "100%",
            padding: 10,
            marginTop: 10,
            background: "red",
            color: "white",
            border: "none",
          }}
        >
          Delete Task
        </button>
      </form>
    </div>
  );
}
