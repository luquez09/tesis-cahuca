import React from 'react';
import { Line } from 'react-chartjs-2';
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

            for (let i = 1; i < months.length; i++) {
                valores[i] = valores[i-1] + valores[i]
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
                label: "Earnings",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.10)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: this.state.valores,
            }],
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
                height={75}
                options={options}
            />
        )
    }
}