import React from 'react';
import { Line } from 'react-chartjs-2';
import firebase from 'firebase'

const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const sectores = ['glp', 'diesel', 'gasolina', 'gas']

export default class GEmiMensuales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            glp: [],
            diesel: [],
            gasolina: [],
            gas: []
        }
    }

    componentWillMount() {
        const nameRef = firebase.database().ref().child('combustibles')
        nameRef.on('value', snapshot => {
            let val = snapshot.val()
            let valores = {
                'glp': [],
                'diesel': [],
                'gasolina': [],
                'gas': [],
            }
           
            for (let i = 0; i < months.length; i++) {
                for (let j = 0; j < sectores.length; j++) {
                    if (val[months[i]]['emisiones'][sectores[j]]['total']){
                    valores[sectores[j]][i] = val[months[i]]['emisiones'][sectores[j]]['total']
                    }
                }
            }
            this.setState({
                glp: valores.glp,
                diesel: valores.diesel,
                gasolina: valores.gasolina,
                gas: valores.gas
            })
        })
    }

    render() {
        const data = {
            labels: meses,
            datasets: [{
                label: 'GLP',
                backgroundColor: 'rgba(10, 168, 196, 0.35)',
                borderColor: 'rgba(10, 168, 196, 1)',
                data: this.state.glp,
                fill: false,
                lineTension: 0.1
            }, {
                label: 'GASOLINA',
                backgroundColor: 'rgba(102, 96, 151, 0.35)',
                borderColor: 'rgba(102, 96, 151, 1)',
                data: this.state.gasolina,
                fill: false,
                lineTension: 0.1
            }, {
                label: 'DIESEL',
                backgroundColor: 'rgba(57, 87, 255, 0.35)',
                borderColor: 'rgba(57, 87, 255, 1)',
                data: this.state.diesel,
                fill: false,
                lineTension: 0.1
            }, {
                label: 'GAS',
                backgroundColor: 'rgba(233, 182, 233, 0.35)',
                borderColor: 'rgba(233, 182, 233, 1)',
                data: this.state.gas,
                fill: false,
                lineTension: 0.1
            }]
        }

        const options = {
            responsive: true,
                tooltips: {
                mode: 'index',
                    intersect: false,
                },
            hover: {
                mode: 'nearest',
                    intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Meses'
                    }
                }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'TonCO2eq'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        }
        return (
            <Line
                data={data}
                width={100}
                height={50}
                options={options}
            />
        )
    }
}