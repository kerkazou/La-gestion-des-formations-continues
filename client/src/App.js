import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import Login from "./login/Login"
import Statistique from "./statistique/Statistique"
import Employee from "./Employee/Employee"
import Organisme from "./Organisme/Organisme"


export default function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Statistique />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/Organisme" element={<Organisme />} />
          <Route path="/Formation" element={<div>Formation</div>} />
          <Route path="*" element={'Page not found'} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}