import React from 'react';
import { Pie } from 'react-chartjs-2';
import firebase from 'firebase'

const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const sectores = ['glp', 'diesel', 'gasolina', 'gas']

export default class GPorSectores extends React.Component {
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
            let porcentajes = []

            for (let i = 0; i < months.length; i++) {
                for (let j = 0; j < sectores.length; j++) {
                    valores[sectores[j]][i] = val[months[i]]['emisiones'][sectores[j]]['total']
                }
            }

            for (let i = 0; i < sectores.length; i++) {
                suma[i] = valores[sectores[i]].reduce((a, b) => a + b)
            }

            let total = suma.reduce((a,b) => a+b)

            for (let i = 0; i < suma.length; i++) {
                porcentajes[i] = parseFloat(((suma[i]/total)*100).toFixed(3))
            }

            this.setState({
                valores: porcentajes
            })
        })
    }

    render() {
        const data = {
            datasets: [{
                data: this.state.valores,
                backgroundColor: [
                    'rgba(10, 168, 196, 0.75)',
                    'rgba(102, 96, 151, 0.75)',
                    'rgba(57, 87, 255, 0.75)',
                    'rgba(233, 182, 233, 0.75)',
                    'rgba(108, 213, 207, 0.75)',
                    'rgba(125, 178, 230, 0.75)'
                ],
                label: 'Dataset 1'
            }],
            labels: [
                'GLP',
                'GASOLINA',
                'DIESEL',
                'GAS NATURAL'
            ]
        }

        const options = {
            responsive: true
            }
        return (
            <Pie
                data={data}
                width={100}
                height={75}
                options={options}
            />
        )
    }
}