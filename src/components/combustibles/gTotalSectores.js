import React from 'react';
import { Bar } from 'react-chartjs-2';
import firebase from 'firebase'

const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const sectores = ['glp', 'diesel', 'gasolina', 'gas']

export default class GTotalSectores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valores: []
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

            let suma = []

            for (let i = 0; i < months.length; i++) {
                for (let j = 0; j < sectores.length; j++) {
                    valores[sectores[j]][i] = val[months[i]]['emisiones'][sectores[j]]['total']
                }
            }
            
            for (let i = 0; i < sectores.length; i++) {
                suma[i] = valores[sectores[i]].reduce((a,b)=>a+b)
            }

            this.setState({
                valores: suma
            })
        })
    }

    render() {
        const data = {
            labels: ['GLP', 'DIESEL', 'GASOLINA', 'GAS'],
            datasets: [{
                label: 'Toneladas de CO2 Equivalente según fuente.',
                data: this.state.valores,
                backgroundColor: [
                    'rgba(10, 168, 196, 0.35)',
                    'rgba(102, 96, 151, 0.35)',
                    'rgba(57, 87, 255, 0.35)',
                    'rgba(233, 182, 233, 0.35)',
                    'rgba(108, 213, 207, 0.35)',
                    'rgba(125, 178, 230, 0.35)'
                ], 
                borderColor: [
                    'rgba(10, 168, 196, 1)',
                    'rgba(102, 96, 151, 1)',
                    'rgba(57, 87, 255, 1)',
                    'rgba(233, 182, 233, 1)',
                    'rgba(108, 213, 207, 1)',
                    'rgba(125, 178, 230, 1)'
                ],
                borderWidth: 1
            }]
        }

        const options = {
            responsive: true,
            legend: false,
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
                        labelString: 'Sectores'
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
            <Bar
                data={data}
                width={100}
                height={75}
                options={options}
            />
        )
    }
}