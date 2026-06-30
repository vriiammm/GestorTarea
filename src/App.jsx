import { Router, Route, Switch } from "wouter";

import Listado from "./pages/listado/Listado.jsx";
import CrearTarea from "./pages/crearTarea/CrearTarea.jsx";
import Botonera from "./pages/botonera/Botonera.jsx";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import Nav from "./components/nav/Nav.jsx";



export default function App() {
  const verificador = JSON.parse(localStorage.getItem("tareasLocal"));

  const tareasLocalStorage = verificador ? [...verificador] : [];

  const [tareas, setTareas] = useState(tareasLocalStorage);

  const [filtro, setFiltro] = useState("none");

  const tareasMostradas =
    filtro === "none"
      ? tareas
      : tareas.filter((tarea) => tarea.categoria === filtro);

  const ordenarTareas = (ordenSeleccionado) => {
    let tareasOrdenadas = [...tareas];
    if (ordenSeleccionado === "asc") {
      //orden asc = NoUrg a MuyUrg
      tareasOrdenadas.sort((a, b) => a.tipoUrgencia - b.tipoUrgencia);
    } else if (ordenSeleccionado === "desc") {
      //orden desc = MuyUrg a NoUrg
      tareasOrdenadas.sort((a, b) => b.tipoUrgencia - a.tipoUrgencia);
    } else {
      //por fecha de creacion desc
      const tareasOriginales =
        JSON.parse(localStorage.getItem("tareasLocal")) || [];
      tareasOrdenadas = tareasOriginales;
    }
    setTareas(tareasOrdenadas);
    console.log(tareasOrdenadas);
  };

  const guardar = (tarea) => {
    let nuevasTareas = [...tareas];
    nuevasTareas.push(tarea);
    setTareas(nuevasTareas);
    localStorage.setItem("tareasLocal", JSON.stringify(nuevasTareas));
  };

  const eliminar = (tarea_id) => {
    const nuevasTareas = tareas.filter((tareas) => tareas.id != tarea_id);
    console.log(nuevasTareas);
    setTareas(nuevasTareas);
    localStorage.setItem("tareasLocal", JSON.stringify(nuevasTareas));
  };

  const cambiarEstado = (tarea_id, nuevoEstado) => {
    const tareasActualizadas = tareas.map((tarea) => {
      if (tarea.id === tarea_id) {
        return { ...tarea, estado: nuevoEstado }; // Modificamos solo el estado de esta tarea
      }
      return tarea;
    });
    setTareas(tareasActualizadas);
    localStorage.setItem("tareasLocal", JSON.stringify(tareasActualizadas));
  };

  return (
    <div className="App">
      <header>
        <img className="fotologo" src="./CS2_steam_icon.webp" alt="icono de pagina"/>
        <div className="tituloPagina">
          <h1>Tareas Brian</h1>
        </div>
      </header>
    <Nav />
      <Router>
        <Switch>

          <Route path="/inicio">
            <div className="inicio">
              <h1>Bienvenido al gestor de tareas</h1>
              <p>Para comenzar, elige una opción del menú.</p>
            </div>
          </Route>
          <Route path="/formulario">
            <div className="App-paneles">
              <CrearTarea guardar={(tarea) => guardar(tarea)} />
           </div>
          </Route>

          <Route path="/listado">
           <div className="App-panelesPares">

              <Botonera onCambiarOrden={ordenarTareas} onCambiarFiltro={setFiltro} />

                 <Listado
                tareas={tareasMostradas}
                eliminar={(tarea_id) => eliminar(tarea_id)}
                cambiarEstado={(tarea_id, nuevoEstado) =>
                  cambiarEstado(tarea_id, nuevoEstado)
                }
              />

            </div>
        
            
          </Route>

          <Route path="/">
              <div className="inicio">
                <h1>Bienvenido al gestor de tareas</h1>
                <p>Para comenzar, elige una opción del menú.</p>
              </div>
          </Route>

          <Route>
            <h1>Pagina no encontrada - error 404</h1>
          </Route>
        </Switch>
      </Router>

    
      
    </div>
  );
}
