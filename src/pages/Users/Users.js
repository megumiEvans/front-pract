import React, {Component} from 'react';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter,Label, Input} 
    from 'reactstrap';

let data=[]

export default class Users extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            form: {
                _id:'',
                idUser:'',
                name:'',
                lastname:'',
                email:''
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
            let url='http://localhost:4000/users/all';
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
                    console.log("response.json: ", response)
                   response.data.users.map(item => {
                        this.mapData(item)
                    })
                    this.setState({data:data})
                    console.log("data: ", data);
                })
                .catch(err=>{
                    console.error(err);
                }) 
    }
    
    mapData=(json)=>{
        let obj={
            id:json.id,
            name:json.name,
            lastname:json.lastname,
            email:json.email
        }
        data.push(obj);
        console.log("data pushed: ", data)
        this.setState({data: data}, ()=>{
            console.log('data update: ', data)
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
                idUser:'',
                name:'',
                lastname:'',
                email:'',
                password:''
            },
            modalInsert:false,
            modalEdit:false,
            
        }, ()=>{console.log("se reseteo todo: "+'numMovsAdd:', this.state.numMovsAdd, 'idsObj: ',  this.state.idsObj,
                            'idsArray: ',  this.state.idsArray, 'listado: ',  this.state.listado, 'form: ',  this.state.form );
                            });
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


        
    insertClient=()=>{
        this.setState({message:''},()=>{})
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
        let id=field.id;
        console.log("field to edit: ", field)
        let jsonObj = {
            
            idUser: field.idUser,
            name: field.name,
            lastname: field.lastname,
            email: field.email,
        }
        let jsonBody = JSON.stringify(jsonObj);
        console.log("jsonBody: ", jsonBody)
        let url='http://localhost:4000/users/'+id;
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
                    if(field.email==register.email){
                        data[contador]._id=field._id
                        
                        data[contador].nombre=field.name
                        data[contador].apellido=field.lastname
                        data[contador].cuenta=field.email
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
                    <h2>Administrar Usuarios</h2>
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
                                
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Correo</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.data.map((elemento)=>(
                                    <tr>
                                        
                                        <td>{elemento.name}</td>
                                        <td>{elemento.lastname}</td>
                                        <td>{elemento.email}</td>
                                        
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
                            <label>Nombre:</label>
                            <input className="form-control" name="name" type="text" onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Apellidos:</label>
                            <input className="form-control" name="lastname" type="text" onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Cuenta:</label>
                            <input className="form-control" name="email" type="email" onChange={this.handleChange}></input>
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
                            <label>Nombre:</label>
                            <input className="form-control" name="name" type="text" value={this.state.form.name}
                                onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Apellidos:</label>
                            <input className="form-control" name="lastname" type="text" value={this.state.form.lastname}
                                onChange={this.handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Cuenta:</label>
                            <input className="form-control" name="email" type="email" value={this.state.form.email} 
                                onChange={this.handleChange}></input>
                        </FormGroup>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" onClick={()=>this.onFetchEdit(this.state.form)}>Editar</Button>  
                        <Button outline color="danger" onClick={()=>this.hideModalEdit()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                </div>
        );
    }
   
}