import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./login/Login"
import Statistique from "./statistique/Statistique"


export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Statistique />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={'Page not found'} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}