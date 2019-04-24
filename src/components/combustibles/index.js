import React, { Component } from 'react';
import firebase from 'firebase'

import GEmiMensuales from './gEmiMensuales'
import Formulario from './formulario'
import GEmiTotales from './gEmiTotales'
import GAcuTotales from './gAcuTotales'
import GTotalSectores from './gTotalSectores'
import GPorSectores from './gPorSectores'
import TablaMensual from './tablaMensual'
import GDatosEsta from './gDatosEsta'

/*
const emisiones = {
    'co2': 0,
    'ch4': 0,
    'n2o': 0,
    'total': 0
}

const sectores = {
    'glp': emisiones,
    'gasolina': emisiones,
    'diesel': emisiones,
    'gas': emisiones
}

const valores = {
    'enero': sectores, 
    'febrero': sectores, 
    'marzo': sectores, 
    'abril': sectores, 
    'mayo': sectores, 
    'junio': sectores, 
    'julio': sectores, 
    'agosto': sectores, 
    'septiembre': sectores, 
    'octubre': sectores, 
    'noviembre': sectores, 
    'diciembre': sectores
} */

export default class Inicio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valores: {}
        }
    }

    componentWillMount() {
        const nameRef = firebase.database().ref().child('combustibles')
        nameRef.on('value', snapshot => {

            this.setState({ valores: snapshot.val()}, () => console.log(this.state))

        })
    }

    render() {

        return (
            <div id="content-wrapper" className="d-flex flex-column">
                {/* Main Content */}
                <div id="content">
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                        {/* Page Heading */}
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">COMBUSTIBLES FÓSILES</h1>
                        </div>
                        {/* Content Row */}
                        <div className="row">
                            {/* Earnings (Monthly) Card Example */}
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Earnings (Monthly)</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-calendar fa-2x text-gray-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Content Row */}
                        <div className="row">
                            {/* Area Chart */}
                            <div className="col-xl-8 col-lg-7">
                                <div className="card shadow mb-4">
                                    {/* Card Header - Dropdown */}
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Emisiones mensuales de combustibles fósiles del municipio en el año</h6>
                                    </div>
                                    {/* Card Body */}
                                    <div className="card-body">
                                        <div className="chart-area"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className /></div><div className="chartjs-size-monitor-shrink"><div className /></div></div>
                                            <GEmiMensuales/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Pie Chart */}
                            <div className="col-xl-4 col-lg-5">
                                <div className="card shadow mb-4">
                                    {/* Card Header - Dropdown */}
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Formulario de datos</h6>
                                    </div>
                                    {/* Card Body */}
                                    <div className="card-body">
                                        <Formulario/>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Emisiones totales mensuales en el año del municipio</h6>
                                    </div>
                                    <div className="card-body">
                                        <GEmiTotales/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Emisiones totales mensuales en el año del municipio</h6>
                                    </div>
                                    <div className="card-body">
                                        <GTotalSectores />
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Emisiones totales acumuladas</h6>
                                    </div>
                                    <div className="card-body">
                                        <GAcuTotales />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Emisiones totales mensuales en el año del municipio</h6>
                                    </div>
                                    <div className="card-body">
                                        <GPorSectores />
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Promedio de emisiones por sector y desviacion estandar</h6>
                                    </div>
                                    <div className="card-body">
                                        <GDatosEsta valores={this.state.valores} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Emisiones totales mensuales en el año del municipio</h6>
                                    </div>
                                    <div className="card-body">
                                        WAITING
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">RESUMEN MENSUAL</h1> 
                        </div>
                        <div className="row">   
                            {Object.keys(this.state.valores).map((mes) =>{
                                let valores = this.state.valores
                                if(valores[mes]['emisiones']['total'] > 0) {
                                return <TablaMensual mes={mes} valores={this.state.valores}/>
                                }
                            })}
                        </div>
                    </div> 
                    {/* /.container-fluid */} 
                </div>
                {/* End of Main Content */}
                {/* Footer */}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright © Desarrollado por Jaime Daniel Luque Vega</span>
                        </div>
                    </div>
                </footer>
                {/* End of Footer */}
            </div>

        );
    }
}
