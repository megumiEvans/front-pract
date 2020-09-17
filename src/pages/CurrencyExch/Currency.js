import React, { Component } from "react";
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter,Label, Input} 
    from 'reactstrap';

class Selector extends Component {
    constructor() {
        super();
        this.state = {
            listado:[],
        }
    }

    onFetchCurrencies=(origin, toConvert)=>{
        let query=origin+"_"+toConvert+","+toConvert+"_"+origin;
        let apiKey="88aee6410c0c0e1d3e44";
        let url='https://free.currconv.com/api/v7/convert?q='+query+'&compact=ultra&apiKey='+apiKey;
        //fetch('https://free.currconv.com/api/v7/convert?q=USD_MXN,MXN_USD&compact=ultra&apiKey=88aee6410c0c0e1d3e44')
        fetch(url)
        .then(response => response.json()) // Se obtiene la respuesta y se le indica a Javascript que lo transforme a un JSON
            .then(currency => { //Ya que fue transformado se transfiere a la variable currency para su manipulacion
                console.log("response: ", currency)
                let keys = Object.keys(currency)
                
                let values = Object.values(currency)
                let obj = {origin: origin, originToDest: values[0], converted: toConvert, convToOrigin:values[1]}
                this.setState({
                    listado: [ ...this.state.listado, obj ]
                },()=>{console.log("listado: ", this.state.listado, " keys; ", keys, " values: ", values)})
            })
            .catch(err=>{
                console.error(err);
            }) 
    }
    
    componentDidMount() {
        this.onFetchCurrencies("MXN","USD");
        this.onFetchCurrencies("MXN","EUR");
        this.onFetchCurrencies("MXN","CAD");
        this.onFetchCurrencies("MXN","GBP");
    }
    render() {
        return (
                <div>
                    <h2>¿Cómo está mi moneda hoy?</h2>

                    <Container>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>MXN a Divisa</th>
                                    <th>Divisa a MXN</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.listado.map((elemento)=>(
                                        <tr>
                                            <td>1 {elemento.origin} =  {elemento.originToDest} {elemento.converted}</td>
                                            <td>1 {elemento.converted} = {elemento.convToOrigin} {elemento.origin}</td>
                                            <td>{elemento.apellido}</td>
                                           
                                            
                                        </tr>                                
                                    )
                                )}
                            </tbody>
                        </Table>
                    </Container>

                </div>
                
            )
        }
      
    
}

export default Selector;