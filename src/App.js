import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./component/Login";
import Users from "./pages/Users";
import Absensi from "./pages/Absensi";
import AddUsers from "./pages/AddUsers";
import EditUsers from "./pages/EditUsers";
import AddAbsensi from "./pages/AddAbsensi";
import EditAbsensi from "./pages/EditAbsensi";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUsers />} />
          <Route path="/users/edit/:id" element={<EditUsers />} />
          <Route path="/wfh" element={<Absensi />} />
          <Route path="/wfh/add" element={<AddAbsensi />} />
          <Route path="/wfh/edit/:id" element={<EditAbsensi />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
