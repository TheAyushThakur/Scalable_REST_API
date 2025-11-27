import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import Users from "./pages/Users"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import CreateTask from "./pages/CreateTask"
import EditTask from "./pages/EditTask"

function App() {
  return (
    <>
      <Navbar /> 

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/users" element={<Users/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
