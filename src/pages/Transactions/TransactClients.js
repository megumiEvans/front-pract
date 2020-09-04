import React, {Component} from 'react';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter,Label, Input} 
    from 'reactstrap';


const data=[
    {idCliente: 51, nombre: "Denisse", apellido: "Rodriguez Ibañez", cuenta: 123456, listado:[
        {   fecha: "08/07/2020", importe: 33.95, tipo: "Retiro ATM"},
        {   fecha: "07/07/2020", importe: 12.95, tipo: "Depósito Ventanilla"}
    ]}, 
    {idCliente: 38, nombre: "Diana", apellido: "Fernandez Barron", cuenta: 123456, listado:null}, 
    {idCliente: 4, nombre: "Miryam", apellido: "Quezada Aguirre", cuenta: 183056, listado:[
        {   fecha: "18/07/2020", importe: 9309.34, tipo: "Deposito nomina"},
        {   fecha: "28/07/2020", importe: 133.95, tipo: "Retiro ATM"},
    ]},       
];

export default class TransactClients extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            numMovsAdd:0,
            movimientos:{fecha: '', importe: 0, tipo: ''},
            idsObj:{idFecha: '', idImporte: '', idTipo:''},
            idsArray:[],
            listado:[],
            form: {
                idCliente:'',
                nombre:'',
                apellido:'',
                cuenta:'',
                listado:[]
            },
            modalInsert:false,
            modalEdit:false
        }
     }
    resetState=()=>{
        this.setState({
            numMovsAdd:0,
            movimientos:{fecha: '', importe: 0, tipo: ''},
            idsObj:{idFecha: '', idImporte: '', idTipo:''},
            idsArray:[],
            listado:[],
            form: {
                idCliente:'',
                nombre:'',
                apellido:'',
                cuenta:'',
                listado:[]
            },
            modalInsert:false,
            modalEdit:false
        });
        console.log('numMovsAdd:', this.state.numMovsAdd, 'idsObj: ',  this.state.idsObj,
            'idsArray: ',  this.state.idsArray, 'listado: ',  this.state.listado, 'form: ',  this.state.form );
    }

    handleChangeList=(e)=>{
        //console.log(e.target.name+" | "+e.target.value);
        if(e.target.type=="number")
        {
            //console.log("Es un número")
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

    showModalInsert=()=>{
        this.setState({modalInsert:true});
    }

    hideModalInsert=()=>{
        this.setState({modalInsert:false},()=>{
            this.resetState();
        });
    }

    showModalEdit=(registro)=>{
        this.setState({modalEdit:true,form:registro});
    }

    hideModalEdit=()=>{
        this.setState({modalEdit:false},()=>{
            this.resetState();
        });
    }

    addTransaction=()=>{
        console.log("this.state.numMovsAdd: ",this.state.numMovsAdd);
        if(this.state.numMovsAdd!==0){
            //this.setState({listado: this.state.listado.concat([this.state.movimientos])}, ()=> {console.log(">>>this.state.listado: ",this.state.listado)});
            this.setState({
                            listado: [ ...this.state.listado, this.state.movimientos ],
                            numMovsAdd: this.state.numMovsAdd+1, 
                            idsObj:{idFecha: 'dateMov'+this.state.numMovsAdd,
                                    idImporte: 'amount'+this.state.numMovsAdd, 
                                    idTipo:'typeTrans'+this.state.numMovsAdd}, 
                                    },
                        ()=>{
                            this.setState({idsArray: this.state.idsArray.concat([this.state.idsObj])},
                            ()=> {
                                console.log("")
                                   // console.log("this.state.idsArray: ",this.state.idsArray)
                                    //console.log(">>>this.state.listado: ",this.state.listado)
                                });
                            
            })
        }
        else{
            this.setState({
                numMovsAdd: this.state.numMovsAdd+1, 
                idsObj:{idFecha: 'dateMov'+this.state.numMovsAdd,
                        idImporte: 'amount'+this.state.numMovsAdd, 
                        idTipo:'typeTrans'+this.state.numMovsAdd}, 
                        },
            ()=>{
                this.setState({idsArray: this.state.idsArray.concat([this.state.idsObj])},
                ()=> {
                        console.log("")
                        //console.log("this.state.idsArray: ",this.state.idsArray)
                    });
                
            })
        }
        
    }
    insertClient(){
        let valorNuevo={...this.state.form};
        if(this.state.numMovsAdd!==0){
            //console.log("holi",this.state.numMovsAdd)
            //this.setState({listado: this.state.listado.concat([this.state.movimientos])}, 
            this.setState({listado: [ ...this.state.listado, this.state.movimientos ] },
            ()=> {
                //console.log(">>>this.state.listado: ",this.state.listado)
                let listMovs=this.state.listado;
                //console.log("valorNuevo: ", valorNuevo)
                //console.log("listMovs: ", listMovs)
                valorNuevo.listado=listMovs;
                let values=this.state.data;      
                values.push(valorNuevo);
                this.setState({data:values},()=>{
                    this.resetState();
                });
                console.log("values: ", values, "  data:",this.state.data)
            }); 
        }
        else{
            let values=this.state.data;      
            values.push(valorNuevo);
             this.setState({data:values},()=>{
                 this.resetState();
             });
        }
    }
    
    editField=(field)=>{
        let contador=0;
        let listData=this.state.data;
        console.log('this.state.numMovsAdd: ',this.state.numMovsAdd);
        if(this.state.numMovsAdd>0){
                this.setState({listado: [ ...this.state.listado, this.state.movimientos ] },
                ()=>{
                    listData.map((register)=>{ //basicamente se compara data con form para encontrar indice a modificar
                        //console.log("~ ~ listData[contador].listado: ", listData[contador].listado);
                        //console.log("field.idCliente: ", field.idCliente, " register.idCliente: ", register.idCliente)
                        if(field.idCliente==register.idCliente){
                            listData[contador].nombre=field.nombre;
                            listData[contador].apellido=field.apellido;
                            listData[contador].cuenta=field.cuenta;
                            if(listData[contador].listado===null){
                                listData[contador].listado=this.state.listado;
                            }
                            else{
                                Array.prototype.push.apply(listData[contador].listado,this.state.listado);
                            }
                            //console.log("---- listData[contador].listado: ", listData[contador].listado);
                            //console.log("this.state.listado: ", this.state.listado);
                        }
                        contador++;
                    });

                })  
        }
        else{
            listData.map((register)=>{ //basicamente se compara data con form para encontrar indice a modificar
                //console.log("field.idCliente: ", field.idCliente, " register.idCliente: ", register.idCliente)
                    if(field.idCliente==register.idCliente){
                        listData[contador].nombre=field.nombre;
                        listData[contador].apellido=field.apellido;
                        listData[contador].cuenta=field.cuenta;
                        console.log("***** listData[contador].listado: ", listData[contador].listado);
                        console.log("this.state.listado: ", this.state.listado);
                    }
                    contador++;
                });
        }
        //console.log('field:',listData);
        this.setState({data:listData}, ()=>{
            console.log('data:',this.state.data);
            this.resetState();
        })
    }

    deleteRegister=(dato)=>{
        
            var contador=0;
            var lista = this.state.data;
            lista.map((registro)=>{
                if(registro.idCliente==dato.idCliente){
                    lista.splice(contador,1);
                }
                contador++;
            });
            this.setState({data:lista})
        
    }

    render()
    {
        return(
            <div>
                <Container>
                    <Button color="info" onClick={()=>this.showModalInsert()}>Insertar Cliente</Button>
                    <br/><br/>
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
                                        <td>{elemento.idCliente}</td>
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
                                            <Button outline color="danger" onClick={()=>this.deleteRegister(elemento)}>Eliminar</Button>
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
                            <label>idCliente:</label>
                            <input className="form-control" name="idCliente" type="number" onChange={this.handleChange}></input>
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
                            <input className="form-control" name="idCliente" type="number" value={this.state.form.idCliente}></input>
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
                        {/*<Button color="info" onClick={()=>this.editField(this.state.form)}>Editar</Button>                        {"  "}
                        */}
                        <Button color="info" onClick={()=>this.editField(this.state.form)}>Editar</Button>  
                        <Button outline color="danger" onClick={()=>this.hideModalEdit()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
   
}