import React, { Component } from 'react';

export default class Tabla extends Component {

    render(){
        return(

            <div className="row justify-content-center" >
                <div className="form-group row justify-content-center">
                    <div className="col-xs-6 col-centered">
                        <select class="form-control-lg">
                            <option>Enero</option>
                            <option>Febrero</option>
                            <option>Marzo</option>
                            <option>Abril</option>
                            <option>Mayo</option>
                        </select>
                    </div>
                </div>
                <div className="col-centered" >
                    <table class="table table-borderless" >
                        <thead>
                            <tr>
                                <th scope="col">CO2</th>
                                <th scope="col">works</th>
                                <th scope="col">CH4</th>
                                <th scope="col">N2O</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}