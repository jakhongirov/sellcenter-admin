import { Routes, Route } from "react-router-dom";
import useToken from "./Hooks/useToken";

import Login from "./Pages/Login/Login";
import Admin from "./Pages/Admin/Admin";
import "./Hooks/useToken";

function App() {
  const [token] = useToken();

  if (token) {
    return (
        <Routes>
          <Route path="/*" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    );
  } else {
    return <Login />;
  }
}

export default App;
