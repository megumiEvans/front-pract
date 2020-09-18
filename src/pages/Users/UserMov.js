import React, {Component} from 'react';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter,Label, Input} 
    from 'reactstrap';

/*
let data=[
    {_id: {$oid: "5f0642288198de684e3e4b70"},idCliente: 51, nombre: "Denisse", apellido: "Rodriguez Ibañez", cuenta: 123456, listado:[
        {   fecha: "08/07/2020", importe: 33.95, tipo: "Retiro ATM"},
        {   fecha: "07/07/2020", importe: 12.95, tipo: "Depósito Ventanilla"}
    ]}, 
    {_id: {$oid: "5f0642288198de684e3e4b80"},idCliente: 38, nombre: "Diana", apellido: "Fernandez Barron", cuenta: 123456, listado:null}, 
    {_id: {$oid: "5f0642288198de684e3e4b70"},idCliente: 4, nombre: "Miryam", apellido: "Quezada Aguirre", cuenta: 183056, listado:[
        {   fecha: "18/07/2020", importe: 9309.34, tipo: "Deposito nomina"},
        {   fecha: "28/07/2020", importe: 133.95, tipo: "Retiro ATM"},
    ]},       
];*/

let data=[]

export default class AdminTransactions extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            numMovsAdd: 0,
            movimientos:{fecha: '', importe: 0, tipo: ''},
            idsObj:{idFecha: '', idImporte: '', idTipo:''},
            idsArray:[],
            listado:[],
            form: {
                _id:'',
                idcliente:'',
                nombre:'',
                apellido:'',
                cuenta:'',
                listado:[]
            },
            modalInsert:false,
            modalEdit:false,
            message:'',
            messageError:''
        }
     }

    componentDidMount() {
        this.onFetchUsers();
    }

    onFetchUsers=()=>{
        let id=localStorage.getItem("idUser");
        console.log("id account:", id)
            //let url='https://api.mlab.com/api/1/databases/mquezada/collections/Clientes?q={"cuenta":'+'96'+'}&apiKey=GOLqWa850qO8tsdCUdby6eq9eKPInBkt';
            let url='https://api.mlab.com/api/1/databases/mquezada/collections/Clientes?q={"cuenta":'+id+'}&apiKey=GOLqWa850qO8tsdCUdby6eq9eKPInBkt';
            
            const requestInfo ={
                method:'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            };

            fetch(url,requestInfo)
            .then(response => response.json())// Se obtiene la respuesta y se le indica a Javascript que lo transforme a un JSON
                .then(response => { //Ya que fue transformado se transfiere a la variable currency para su manipulacion
                    //console.log("response.json: ", response)
                    //this.mapJsonToData(response)
                    response.map(item => {
                        this.mapData(item)
                    })
                    this.setState({data:data})
                    console.log("data: ", data);
                })
                .catch(err=>{
                    console.error(err);
                }) 

    }


    resetState=()=>{
        this.setState({
            numMovsAdd:0,
            movimientos:{fecha: '', importe: 0, tipo: ''},
            idsObj:{idFecha: '', idImporte: '', idTipo:''},
            idsArray:[],
            listado:[],
            form: {
                _id:'',
                idcliente:'',
                nombre:'',
                apellido:'',
                cuenta:'',
                listado:[]
            },
            modalInsert:false,
            modalEdit:false,
            
        }, ()=>{console.log("se reseteo todo: "+'numMovsAdd:', this.state.numMovsAdd, 'idsObj: ',  this.state.idsObj,
                            'idsArray: ',  this.state.idsArray, 'listado: ',  this.state.listado, 'form: ',  this.state.form );
                            });
   }

    mapData=(json)=>{
        data.push(json);
        console.log("data pushed: ", data)
        this.setState({data: data}, ()=>{
            console.log('data update: ', data)
        })
    }
        

    render()
    {
        return(
            <div>
                <Container>
                    <br/><br/>
                    <h2>Mis movimientos</h2>
                    <br/><br/>

                    <Table striped>
                        <thead>
                            <tr>
                                <th>idcliente</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Cuenta</th>
                                <th>Movimientos</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.data.map((elemento)=>(
                                    <tr>
                                        <td>{elemento.idcliente}</td>
                                        <td>{elemento.nombre}</td>
                                        <td>{elemento.apellido}</td>
                                        <td>{elemento.cuenta}</td>
                                        <td>{elemento.listado !== null?
                                                elemento.listado.map((dat)=>(
                                                        <ul>
                                                            <li>Fecha: {dat.fecha}</li>
                                                            <li>Importe:{dat.importe}</li>
                                                            <li>Tipo: {dat.tipo}</li>
                                                        </ul>
                                                    )
                                                
                                                )
                                                : null
                                            }
                                            
                                            
                                        </td>
                                       
                                    </tr>                                
                                )
                            )}
                        </tbody>
                    </Table>
                </Container>
         </div>
        );
    }
   
}