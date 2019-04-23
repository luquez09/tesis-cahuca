import React from 'react';

export default class TablaMensual extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valores: []
        }
    }

    render() {

        var valores = this.props.valores

        return (
            <div className="col-lg-6 mb-2">
                <div className="card shadow mb-2">
                    {/* Card Header - Dropdown */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">{this.props.mes}</h6>
                    </div>
                    {/* Card Body */}
                    <div >
                        <table className="table table-borderless" >
                            <thead>
                                <tr>
                                    <th >Sector</th>
                                    <th className="text-center">Consumo</th>
                                    <th className="text-center">CO<sub>2</sub></th>
                                    <th className="text-center">CH<sub>4</sub></th>
                                    <th className="text-center">N<sub>2</sub>O</th>
                                    <th className="text-center">CO<sub>2</sub>eq</th>
                                    <th className="text-center">%</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">GPL</th>
                                    <td className="text-center">{valores[this.props.mes]['consumo']['glp']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['glp']['co2']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['glp']['ch4']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['glp']['n2o']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['glp']['total']}</td>
                                    <td className="text-center">{((valores[this.props.mes]['emisiones']['glp']['total'] / valores[this.props.mes]['emisiones']['total'])*100).toFixed(1)}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Gasolina</th>
                                    <td className="text-center">{valores[this.props.mes]['consumo']['gasolina']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['gasolina']['co2']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['gasolina']['ch4']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['gasolina']['n2o']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['gasolina']['total']}</td>
                                    <td className="text-center">{((valores[this.props.mes]['emisiones']['gasolina']['total'] / valores[this.props.mes]['emisiones']['total']) * 100).toFixed(1)}</td>
                                    
                                </tr>
                                <tr>
                                    <th scope="row">Diesel</th>
                                    <td className="text-center">{valores[this.props.mes]['consumo']['diesel']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['diesel']['co2']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['diesel']['ch4']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['diesel']['n2o']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['diesel']['total']}</td>
                                    <td className="text-center">{((valores[this.props.mes]['emisiones']['diesel']['total'] / valores[this.props.mes]['emisiones']['total']) * 100).toFixed(1)}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Gas N</th>
                                    <td className="text-center">{valores[this.props.mes]['consumo']['gas']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['gas']['co2']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['gas']['ch4']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['gas']['n2o']}</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['gas']['total']}</td>
                                    <td className="text-center">{((valores[this.props.mes]['emisiones']['gas']['total'] / valores[this.props.mes]['emisiones']['total']) * 100).toFixed(1)}</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-center">TOTAL</td>
                                    <td className="text-center">{valores[this.props.mes]['emisiones']['total']}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}