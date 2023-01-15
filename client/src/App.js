import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import Login from "./Components/login/Login"
import Statistique from "./Components/statistique/Statistique"
import Employee from "./Components/Employee/Employee"
import Organisme from "./Components/Organisme/Organisme"
import Formation from "./Components/Formation/Formation"
import FormationEmployee from "./Components/FormationEmployee/FormationEmployee"

import MyFormation from "./Components/MyFormation/MyFormation"

export default function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          {/* Dashboard Admin */}
          <Route path="/" element={<Statistique />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/Organisme" element={<Organisme />} />
          <Route path="/Formation" element={<Formation />} />
          <Route path="/Formation-Employee" element={<FormationEmployee />} />
          {/* Dashboard Employee */}
          <Route path="/My-Formation" element={<MyFormation />} />
          {/* Page not found */}
          <Route path="*" element={'Page not found'} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}