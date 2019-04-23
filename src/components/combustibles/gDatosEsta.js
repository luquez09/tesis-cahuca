import React from 'react';
import firebase from 'firebase'
import { Bar } from 'react-chartjs-2';

const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const sectores = ['glp', 'diesel', 'gasolina', 'gas']

export default class GDatosEsta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promedios: [],
            desviaciones: []
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
            let promedios = []
            let desviaciones = {}

            for (let i = 0; i < months.length; i++) {
                for (let j = 0; j < sectores.length; j++) {
                    if (val[months[i]]['emisiones'][sectores[j]]['total'] > 0){
                        valores[sectores[j]][i] = val[months[i]]['emisiones'][sectores[j]]['total']
                    }
                    
                }
            }

            console.log(valores)

            for (let i = 0; i < sectores.length; i++) {
                suma[i] = valores[sectores[i]].reduce((a, b) => a + b)
            }

            console.log(suma);

            for (let i = 0; i < sectores.length; i++) {
                promedios[i] = suma[i]/valores[sectores[i]].length
            }

            console.log(promedios)

            for (let i = 0; i < sectores.length; i++) {
                desviaciones[sectores[i]] = valores[sectores[i]].map(function (item) {
                    return (item - promedios[i]) * (item - promedios[i])
                }) 
                desviaciones[sectores[i]] = desviaciones[sectores[i]].reduce((a, b) => a + b)
                desviaciones[i] = Math.sqrt(desviaciones[sectores[i]]) / Math.sqrt(valores[sectores[i]].length)
            }

            console.log(desviaciones)

            
            this.setState({promedios: promedios, desviaciones: desviaciones}, ()=>console.log(this.state))

        })
    }

    render() {
        const data = {
            labels: ['GLP', 'DIESEL', 'GASOLINA', 'GAS'],
            datasets: [{
                label: 'Promedio mensual',
                backgroundColor: 'rgba(10, 168, 196, 0.35)',
                borderColor: 'rgba(10, 168, 196, 1)',
                borderWidth: 1,
                data: this.state.promedios
            }, {
                label: 'Desviación estandar',
                backgroundColor: 'rgba(57, 87, 255, 0.35)',
                borderColor: 'rgba(57, 87, 255, 1)',
                borderWidth: 1,
                data: Object.values(this.state.desviaciones)
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