import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={'Page not found'} />
      </Routes>
    </BrowserRouter>
  );
}