import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <ul className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion' id="accordionSidebar" style={{ height: "100%"}}>
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-calculator"></i>
                </div>
                <div className="sidebar-brand-text mx-3">CAHUCA<sup>2</sup></div>
            </a>
            <hr className="sidebar-divider my-0"></hr>
            <li className="nav-item active">
                <Link to="/" className="nav-link"><i className="fas fa-home"></i><span>Inicio</span></Link>
                <Link to="/Generales" className="nav-link"><span>Generales</span></Link>
                <Link to="/Contact" className="nav-link"><span>Contact</span></Link>
            </li>
            <hr className="sidebar-divider"></hr>
            <div className="sidebar-heading">Sectores</div>
            <li className="nav-item">
                <Link to="/combustibles" className="nav-link">
                    <i className="fas fa-fw fa-gas-pump"></i>
                    <span>Combustibles Fósiles</span>
                </Link>
                <Link to="/electricidad" className="nav-link">
                    <i className="fas fa-fw fa-bolt"></i>
                    <span>Consumo Eléctrico</span>
                </Link>
                <Link to="/electricidad" className="nav-link">
                    <i className="fas fa-fw fa-trash-restore-alt"></i>
                    <span>Residuos Sólidos</span>
                </Link>
                <Link to="/electricidad" className="nav-link">
                    <i className="fas fa-fw fa-water"></i>
                    <span>Agua Residual</span>
                </Link>
            </li>
            <hr className="sidebar-divider"></hr>
            <div className="sidebar-heading">Addons</div>
            <li className="nav-item">
                <Link to="/" className="nav-link">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Cerrar sesión</span>
                </Link>
            </li>
        </ul>
    );
}

export default NavBar;