
import React from 'react';
import firebase from 'firebase'

const sectores = ['glp', 'gasolina', 'diesel', 'gas']

export default class Formulario extends React.Component {
    constructor(props) {
        super();
        this.state = {
            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center" >
                    <div className="form-group row justify-content-center">
                        <div className="col-xs-6 col-centered">
                            <select class="form-control" ref={input => { this.mes = input }}>
                                <option>enero</option>
                                <option>febrero</option>
                                <option>marzo</option>
                                <option>abril</option>
                                <option>mayo</option>
                                <option>junio</option>
                                <option>julio</option>
                                <option>agosto</option>
                                <option>septiembre</option>
                                <option>octubre</option>
                                <option>noviembre</option>
                                <option>diciembre</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span class="input-group-text">GLP</span>
                    </div>
                    <input type="number" className="form-control" ref={input => { this.glp = input }} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span class="input-group-text">DIESEL</span>
                    </div>
                    <input type="number" className="form-control" ref={input => { this.diesel = input }} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span class="input-group-text">GASOLINA</span>
                    </div>
                    <input type="number" className="form-control" ref={input => { this.gasolina = input }} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span class="input-group-text">GAS NATURAL</span>
                    </div>
                    <input type="number" className="form-control" ref={input => { this.gas = input }} />
                </div>
                <div className="row justify-content-center" >
                    <div className="form-group row justify-content-center">
                        <div className="col-xs-6 col-centered">
                            <button class="btn btn-primary" onClick={this.handleSubmit}>GRAFICAR</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleSubmit(e) {

        e.preventDefault();

        let glp = parseFloat(this.glp.value)
        let diesel = parseFloat(this.diesel.value)
        let gasolina = parseFloat(this.gasolina.value)
        let gas = parseFloat(this.gas.value)

        let datos = {
            'glp': [(glp * 3.051) / 1000, (glp * 0.045 * 21) / 1000, (glp * 0.005 * 310) / 1000],
            'diesel': [(diesel * 8.808) / 1000, (diesel * 0.000293 * 21) / 1000, (diesel * 0.000028 * 310) / 1000],
            'gasolina': [(gasolina * 10.149) / 1000, (gasolina * 0.00004 * 21) / 1000, (gasolina * 0.00004 * 310) / 1000],
            'gas': [(gas * 1.981) / 1000, (gas * 0.0000335 * 21) / 1000, (gas * 0.0000033 * 310) / 1000],
            'total': 0
        }

        datos.glp[3] = datos.glp[0] + datos.glp[1] + datos.glp[2]
        datos.gasolina[3] = datos.gasolina[0] + datos.gasolina[1] + datos.gasolina[2]
        datos.diesel[3] = datos.diesel[0] + datos.diesel[1] + datos.diesel[2]
        datos.gas[3] = datos.gas[0] + datos.gas[1] + datos.gas[2]
        datos.total = datos.glp[3] + datos.gasolina[3] + datos.diesel[3] + datos.gas[3]

        const consumoRef = firebase.database().ref().child('combustibles').child(this.mes.value).child('consumo')
        consumoRef.update({
            glp: glp,
            diesel: diesel,
            gasolina: gasolina,
            gas: gas
        })

        for (let i = 0; i < sectores.length; i++) {
            let Ref = firebase.database().ref().child('combustibles').child(this.mes.value).child('emisiones').child(sectores[i])
            Ref.update({
                co2: parseFloat(datos[sectores[i]][0].toFixed(3)),
                ch4: parseFloat(datos[sectores[i]][1].toFixed(3)),
                n2o: parseFloat(datos[sectores[i]][2].toFixed(3)),
                total: parseFloat(datos[sectores[i]][3].toFixed(3))
            })
        }

        const totalRef = firebase.database().ref().child('combustibles').child(this.mes.value).child('emisiones')
        totalRef.update({
            total: parseFloat(datos.total.toFixed(3))
        })


        this.glp.value = ""
        this.diesel.value = ""
        this.gasolina.value = ""
        this.gas.value = ""

    }
}

/* const glpRef = firebase.database().ref().child('combustibles').child(this.mes.value).child('emisiones').child('glp')
glpRef.update({
    co2: datos.glp[0],
    ch4: datos.glp[1],
    n2o: datos.glp[2],
    total: datos.glp[3]
})

const dieselRef = firebase.database().ref().child('combustibles').child(this.mes.value).child('emisiones').child('diesel')
dieselRef.update({
    co2: datos.diesel[0],
    ch4: datos.diesel[1],
    n2o: datos.diesel[2],
    total: datos.diesel[3]
})

const gasolinaRef = firebase.database().ref().child('combustibles').child(this.mes.value).child('emisiones').child('gasolina')
gasolinaRef.update({
    co2: datos.gasolina[0],
    ch4: datos.gasolina[1],
    n2o: datos.gasolina[2],
    total: datos.gasolina[3]
})

const gasRef = firebase.database().ref().child('combustibles').child(this.mes.value).child('emisiones').child('gas')
gasRef.update({
    co2: datos.gas[0],
    ch4: datos.gas[1],
    n2o: datos.gas[2],
    total: datos.gas[3]
}) */