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
            let url='http://localhost:4000/clients/movements';
            const requestInfo ={
                method:'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
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
    
    showModalInsert=()=>{
        this.setState({modalInsert:true});
    }

    hideModalInsert=()=>{
        this.setState({modalInsert:false},()=>{
            this.resetState();
        });
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
   
    addTransaction=()=>{
        this.setState({
            numMovsAdd: this.state.numMovsAdd+1,
        }, ()=>{
            console.log("this.state.numMovsAdd: ", this.state.numMovsAdd)
            if(this.state.numMovsAdd>1){
                console.log("** this.state.numMovsAdd: ", this.state.numMovsAdd)
                this.setState({
                       listado: [ ...this.state.listado, this.state.movimientos ],
                       idsObj:{idFecha: 'dateMov'+this.state.numMovsAdd,
                                idImporte: 'amount'+this.state.numMovsAdd, 
                                idTipo:'typeTrans'+this.state.numMovsAdd}, 
                            },
                    ()=>{
                        this.setState({idsArray: this.state.idsArray.concat([this.state.idsObj])},
                       ()=> {
                             //console.log("")
                             //console.log("this.state.idsArray: ",this.state.idsArray)
                             console.log(">>>this.state.listado: ",this.state.listado)
                    });
                                
                })
            }else{
                this.setState({
                        idsObj:{idFecha: 'dateMov'+this.state.numMovsAdd,
                                idImporte: 'amount'+this.state.numMovsAdd, 
                                idTipo:'typeTrans'+this.state.numMovsAdd}, 
                    },
                    ()=>{
                        this.setState({idsArray: this.state.idsArray.concat([this.state.idsObj])},
                        ()=> {
                            //console.log("")
                            console.log(" ... this.state.idsArray: ",this.state.idsArray)
                            console.log("... this.state.listado: ",this.state.listado)
                    });
                                
                })
            }
        })
       
    }

    handleChange=(e)=>{
        //console.log(e.target.name+" | "+e.target.type+" | "+e.target.value+" |"+(typeof e.target.value));
        if(e.target.type=="number")
        {
            //console.log("Es un número")
            let val=parseFloat(e.target.value)
            //console.log((typeof val))
            this.setState({
                form:{
                    ...this.state.form,
                    [e.target.name]:val,
                }
            })
        }
        else{
            this.setState({
                form:{
                    ...this.state.form,
                    [e.target.name]:e.target.value,
                }
            })
        }
        //console.log("form: ",this.state.form);
    }

    hideModalInsert=()=>{
        this.setState({modalInsert:false},()=>{
            this.resetState();
        });
    }

    handleChangeList=(e)=>{
        //console.log(e.target.name+" | "+e.target.value);
        if(e.target.type=="number")
        {
            let val=parseFloat(e.target.value)
            //console.log((typeof val))
            this.setState({
                movimientos:{
                    ...this.state.movimientos,
                    [e.target.name]:val,
                }
            })
        }
        else{
            this.setState({
                movimientos:{
                    ...this.state.movimientos,
                    [e.target.name]:e.target.value,
                }
            }) 
        }
        //console.log("movimientos:",this.state.movimientos);
    }

    onFetchAddUser=(data)=>{
        console.log("data: ",data)
        let url='http://localhost:4000/clients/movements';
            const requestInfo ={
                method:'POST',
                body:data,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                })
            };

            fetch(url,requestInfo)
            //.then(response => response.json())
            .then((response) => {
                if(response.ok){
                    console.log("Success")
                    this.setState({message:'Registro añadido correctamente'})
                }
                else{
                    this.setState({messageError:'Error al añadir registro '})
                }

                return response.json()
            })
            .then(response=>{
                {
                    console.log("**** response:", response)
                    this.mapData(response)
                    this.hideModalInsert()
                }
            })
            
            .catch(err=>{
                console.log(err);
            })
    }

    mapData=(json)=>{
        data.push(json);
        console.log("data pushed: ", data)
        this.setState({data: data}, ()=>{
            console.log('data update: ', data)
        })
    }
        
    insertClient=()=>{
        this.setState({message:''},()=>{})
        //console.log(">>>nums: ",this.state.numMovsAdd);
        //console.log(">>>:this.state.listado ",this.state.listado);
        //console.log(">>>:this.state.movimientos ",this.state.movimientos);
        let listP=[]

        if(this.state.numMovsAdd>0){
            //console.log("Se ingresaron transacciones")
            listP=this.state.listado
            listP.push(this.state.movimientos)
        }
        console.log("listP: ", listP)
        let objectToPost={
            idcliente: this.state.form.idcliente,
            nombre: this.state.form.nombre,
            apellido: this.state.form.apellido,
            cuenta: this.state.form.cuenta,
            listado: listP
        }
        let jsonBody = JSON.stringify(objectToPost);
        //console.log("objectToPost", jsonBody, " - ", typeof jsonBody)
        let obj=this.onFetchAddUser(jsonBody);   
    }

    onDeleteRegister=(dato)=>{
        console.log("dato: ",dato)
        let jsonBody = JSON.stringify(dato);
        let id=dato._id.$oid;
        let url='http://localhost:4000/clients/movements/'+id;
            const requestInfo ={
                method:'DELETE',
                body:jsonBody,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                })
            };
            console.log("url: ",url)
            
            fetch(url,requestInfo)
            //.then(response => response.json())
            .then((response) => {
                if(response.ok){
                    console.log("Success")
                    this.setState({message:'Registro eliminado correctamente'})
                }
                else{
                    this.setState({messageError:'Error al eliminar registro'})
                }

                return response.json()
            })
            .then(response=>{
                {
                   this.deleteRegister(response);
                   console.log("**** response:", response)
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }

    deleteRegister=(dato)=>{
        var contador=0;
        var lista = this.state.data;
        lista.map((registro)=>{
            if(registro.idcliente==dato.idcliente){
                lista.splice(contador,1);
            }
            contador++;
        });
        this.setState({data:lista})
        data=lista;
    }

    showModalEdit=(registro)=>{
        this.setState({modalEdit:true,form:registro});
    }

    hideModalEdit=()=>{
        this.setState({modalEdit:false},()=>{
            this.resetState();
        });
    }

    editField=(field)=>{
        console.log("field: ", field)
        let list = []
        let listadoFull=[]
        if(this.state.movimientos.fecha!==''){ // si se registraron movimientos
            if (this.state.numMovsAdd>1) //si hay más de un nuevo registro
            {
                console.log("Más de un movimiento ")
                list=[ ...this.state.listado, this.state.movimientos ]
                console.log("list: ", list,"listado: ", this.state.listado,"movimientos: ", this.state.movimientos)
            }
            else{
                console.log("Solo un movimiento ")
                list.push(this.state.movimientos) //solo se regstro un movimiento
                console.log("list: ", list,"listado: ", this.state.listado,"movimientos: ", this.state.movimientos)
            }
        }
        else{
            console.log("sin nuevos movimientos")
        }
        listadoFull=this.state.form.listado.concat(list)
        console.log("listadoFull: ", listadoFull)
        //object to send fetch
        let objectToFetch=field;
        objectToFetch.listado=listadoFull;
        console.log(objectToFetch);
        this.onFetchEdit(objectToFetch);
    }      
    
    onFetchEdit=(field)=>{
        let id=field._id.$oid;
        console.log("field to edit: ", field)
        let jsonObj = {
            
            idcliente: field.idcliente,
            nombre: field.nombre,
            apellido: field.apellido,
            cuenta: field.cuenta,
            listado: field.listado,
            userId: field.userId,
        }
        let jsonBody = JSON.stringify(jsonObj);
        console.log("jsonBody: ", jsonBody)
        let url='http://localhost:4000/clients/movements/'+id;
            const requestInfo ={
                method:'PUT',
                body:jsonBody,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                })
            };
            console.log("url: ",url)
            
            fetch(url,requestInfo)
            //.then(response => response.json())
            .then((response) => {
                if(response.ok){
                    console.log("Success")
                    this.setState({message:'Registro editado correctamente'})
                }
                else{
                    this.setState({messageError:'Error al editar registro'})
                }

                return response.json()
            })
            .then(response=>{
                let contador=0
                data.map((register)=>{ 
                    if(field.idcliente==register.idcliente){
                        data[contador]._id=field._id
                        data[contador].idcliente=field.idcliente
                        data[contador].nombre=field.nombre
                        data[contador].apellido=field.apellido
                        data[contador].cuenta=field.cuenta
                        data[contador].listado=field.listado
                        data[contador].userId=field.userId
                    }
                    contador++;
                })

                this.setState({data:data})
                this.hideModalEdit()
                console.log("**** response:", response)
                
            })
            .catch(err=>{
                console.log(err);
            })
    }

    render()
    {
        return(
            <div>
                <Container>
                    <br/><br/>
                    <h2>Administrar Clientes</h2>
                    <br/><br/>
                    <Button color="info" onClick={()=>this.showModalInsert()}>Insertar Cliente</Button>
                    <br/><br/>
                    {
                                this.state.message !== ''?(
                                    <div className="alert alert-success text-center" role="alert">
                                        {this.state.message}
                                    </div>
                                ):''
                    }
                    {
                                this.state.messageError !== ''?(
                                    <div className="alert alert-danger text-center" role="alert">
                                        {this.state.message}
                                    </div>
                                ):''
                        }
                    <Table striped>
                        <thead>
                            <tr>
                                <th>idcliente</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Cuenta</th>
                                <th>Movimientos</th>
                                <th>Acciones</th>
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
                                        <td>
                                            <Button color="secondary" onClick={()=>this.showModalEdit(elemento)}>Editar</Button> {"  "}
                                            <Button outline color="danger" onClick={()=>this.onDeleteRegister(elemento)}>Eliminar</Button>
                                        </td>
                                    </tr>                                
                                )
                            )}
                        </tbody>
                    </Table>
                </Container>
                <Modal isOpen={this.state.modalInsert}>
                    <ModalHeader>
                        <h3>Insertar Cliente</h3>
                    </ModalHeader>
                    <ModalBody>
                        
                        <FormGroup>
                            <label>idcliente:</label>
                            <input className="form-control" name="idcliente" type="number" onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Nombre:</label>
                            <input className="form-control" name="nombre" type="text" onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Apellidos:</label>
                            <input className="form-control" name="apellido" type="text" onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Cuenta:</label>
                            <input className="form-control" name="cuenta" type="number" onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <legend>Movimientos</legend>
                            <Button color="secondary" size="sm" onClick={()=>this.addTransaction()}>Añadir movimiento </Button>
                           
                            {<ul>							
                                {
                                    this.state.idsArray.map((rowIds)=>(
                                            <li>
                                                {/*{rowIds.idFecha}, {rowIds.idImporte}, {rowIds.idTipo}*/}
                                                <h4>Nuevo Movimiento </h4>
                                                <FormGroup>
                                                    <Label for="dateMov">Fecha:</Label>
                                                    <Input type="date" name="fecha" id={rowIds.idFecha} placeholder="" onChange={this.handleChangeList}/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="amount">Importe:</Label>
                                                    <Input type="number" name="importe" id={rowIds.idImporte} placeholder="" onChange={this.handleChangeList}/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="exampleSelect">Tipo</Label>
                                                    <Input type="select" name="tipo" id={rowIds.idTipo} onChange={this.handleChangeList}>
                                                        <option>Seleccionar</option>
                                                        <option>Retiro ATM</option>
                                                        <option>Depósito Ventanilla</option>
                                                        <option>Depósito ATM</option>
                                                        <option>Depósito Nómina</option>
                                                        <option>Transferencia Interbancaria</option>
                                                        <option>Pago de Servicio</option>
                                                    </Input>
                                                </FormGroup>	
                                            </li>
                                        )
                                    
                                    )
                                }
                            </ul>}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" onClick={()=>this.insertClient()}>Insertar</Button>                        {"  "}
                        <Button outline color="danger" onClick={()=>this.hideModalInsert()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                
                <Modal isOpen={this.state.modalEdit}>
                    <ModalHeader>
                        <h3>Editar Cliente</h3>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>idCliente:</label>
                            <input className="form-control" name="idcliente" type="number" value={this.state.form.idcliente}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Nombre:</label>
                            <input className="form-control" name="nombre" type="text" value={this.state.form.nombre}
                                onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Apellidos:</label>
                            <input className="form-control" name="apellido" type="text" value={this.state.form.apellido}
                                onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Cuenta:</label>
                            <input className="form-control" name="cuenta" type="number" value={this.state.form.cuenta} 
                                onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <legend>Movimientos</legend>
                            <Button color="secondary" size="sm" onClick={()=>this.addTransaction()}>Añadir otro movimiento </Button>
                           
                            {<ul>							
                                {
                                    this.state.idsArray.map((rowIds)=>(
                                            <li>
                                                {rowIds.idFecha}, {rowIds.idImporte}, {rowIds.idTipo}
                                                <FormGroup>
                                                    <Label for="dateMov">Fecha:</Label>
                                                    <Input type="date" name="fecha" id={rowIds.idFecha} placeholder="" onChange={this.handleChangeList}/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="amount">Importe:</Label>
                                                    <Input type="number" name="importe" id={rowIds.idImporte} placeholder="" onChange={this.handleChangeList}/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="exampleSelect">Tipo</Label>
                                                    <Input type="select" name="tipo" id={rowIds.idTipo} onChange={this.handleChangeList}>
                                                        <option>Seleccionar</option>
                                                        <option>Retiro ATM</option>
                                                        <option>Depósito Ventanilla</option>
                                                        <option>Depósito ATM</option>
                                                        <option>Depósito Nómina</option>
                                                        <option>Transferencia Interbancaria</option>
                                                        <option>Pago de Servicio</option>
                                                    </Input>
                                                </FormGroup>	
                                            </li>
                                        )
                                    
                                    )
                                }
                            </ul>}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" onClick={()=>this.editField(this.state.form)}>Editar</Button>  
                        <Button outline color="danger" onClick={()=>this.hideModalEdit()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
   
}