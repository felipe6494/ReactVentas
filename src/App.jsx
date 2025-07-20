import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Formulario } from './componentes/Formulario'
import { Home } from './componentes/Home'
import { CompraFormulario } from './componentes/CompraFormulario'
import {KardexVista} from './componentes/KardexVista';
import {VentaFormulario} from './componentes/VentaFormulario';
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
const [User,setUser] = useState([])
  return (
    

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario setUser={setUser} />} />
        <Route path="/componentes/Home" element={<Home />} />
        <Route path="/componentes/CompraFormulario" element={<CompraFormulario />} />
        <Route path="/componentes/KardexVista" element={<KardexVista />} />
        <Route path="/componentes/VentaFormulario" element={<VentaFormulario />} />      
      </Routes>
    </BrowserRouter>
     
  );
}

export default App
