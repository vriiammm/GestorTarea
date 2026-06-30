import { Link } from "wouter";
import "./Nav.css";

export default function Nav() {
    return (
        <nav className="barra-navegacion">
            <ul className="lista-enlaces">
                <li className="item-enlace">
                    <Link to="/" className="link-menu">Inicio</Link>
                </li>
                <li className="item-enlace">
                    <Link to="/formulario" className="link-menu">Crear Tarea</Link>
                </li>
                <li className="item-enlace">
                    <Link to="/listado" className="link-menu">Listado</Link>
                </li>
            </ul>
        </nav> 
    );
}