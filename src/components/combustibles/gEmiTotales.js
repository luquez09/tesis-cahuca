import React from 'react';
import { Bar } from 'react-chartjs-2';
import firebase from 'firebase'

const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']


export default class GEmiTotales extends React.Component {
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
            let valores = []
            for (let i = 0; i < months.length; i++) {
                valores[i] = val[months[i]]['emisiones']['total']
            }
            this.setState({
                valores: valores
            })
        })
    }

    render() {
        const data = {
            labels: meses,
            datasets: [{
                label: 'Toneladas de CO2 Equivalente según fuente.',
                data: this.state.valores,
                backgroundColor: [
                    'rgba(10, 168, 196, 0.35)',
                    'rgba(10, 168, 196, 0.35)',
                    'rgba(10, 168, 196, 0.35)',
                    'rgba(10, 168, 196, 0.35)',
                    'rgba(10, 168, 196, 0.35)',
                    'rgba(10, 168, 196, 0.35)',
                    'rgba(10, 168, 196, 0.35)',
                    'rgba(10, 168, 196, 0.35)',
                    'rgba(10, 168, 196, 0.35)',
                    'rgba(10, 168, 196, 0.35)',
                    'rgba(10, 168, 196, 0.35)',
                    'rgba(10, 168, 196, 0.35)'
                ],
                borderColor: [
                    'rgba(10, 168, 196, 1)',
                    'rgba(10, 168, 196, 1)',
                    'rgba(10, 168, 196, 1)',
                    'rgba(10, 168, 196, 1)',
                    'rgba(10, 168, 196, 1)',
                    'rgba(10, 168, 196, 1)',
                    'rgba(10, 168, 196, 1)',
                    'rgba(10, 168, 196, 1)',
                    'rgba(10, 168, 196, 1)',
                    'rgba(10, 168, 196, 1)',
                    'rgba(10, 168, 196, 1)',
                    'rgba(10, 168, 196, 1)'
                ],
                borderWidth: 1
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
            <Bar
                data={data}
                width={100}
                height={75}
                options={options}
            />
        )
    }
}