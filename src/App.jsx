import Login from './auth/login/Login';
import Home from './components/Home';
import ProtectedRoute from './auth/protected/ProtectedRoute';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from './views/Inicio';
import CrearUsuario from './views/CrearUsuario';
import Calendario from './views/Calendario';
import Deportes from './components/Deportes';
import Perfil from './components/Perfil';
import SubirComprobante from './views/SubirComprobante';
import VerComprobante from './views/VerComprobante';
import VerUsuario from './views/VerUsuario';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
        <Route index element={<Inicio />} />
        <Route path="/crearusuario" element={<CrearUsuario />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/subircomprobante" element={<SubirComprobante />} />
        <Route path="/vercomprobante" element={<VerComprobante />} />
        <Route path="/verusuario" element={<VerUsuario />} />
        
        </Route>
        <Route path="/deportes" element={<Deportes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
