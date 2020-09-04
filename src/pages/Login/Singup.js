import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter,Label, Input} 
    from 'reactstrap';

import NavLog from "./NavLog";
export default class Login extends Component{
    constructor(props){
        super(props)
        console.log("props",props);
        this.state = {
            message: props.state?props.location.state.message:'',
            modalSingup:true,
            messageSuccess: '',
            disable: "true"
        };
        this.navigateToPage =  this.navigateToPage.bind(this);
    }
    navigateToPage = (path) => {
        console.log('Navigate to path ' + path);
        this.props.history.push(path);

    };
    hideModal=()=>{
        this.setState({modalSingup:false})
    }
    signUp = () =>{
        const data = JSON.stringify({name: this.name, lastname: this.lastname, email: this.email, password:this.password});
        //const data = JSON.stringify({email: "admin-pract@bbva.com", password:"admin12345"});
        console.log(data);
    
        const requestInfo = {
            method: 'POST',
            body: data,
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };
        
        fetch('http://localhost:4000/users/register', requestInfo)
        .then(response =>{
            if(response.ok){
                return response.json()
            }
            throw new Error("Error con el servidor");
        })
        .then(response=> {
            console.log("response: "+response.message);
            this.success(response.message);
        })
        .catch(e=>{
            this.setState({message:e.message})
        });
    }

    success=(mens)=>{
        this.setState({disable:"true", messageSuccess: mens})
    }
    render(){
        return(
            <div>
                <NavLog/>

                <Modal isOpen={this.state.modalSingup}>
                    <ModalHeader>
                        <h3>Registrarse </h3>
                    </ModalHeader>
                    <ModalBody>
                        {
                            this.state.message !== ''?(
                                <div className="alert alert-danger text-center" role="alert">
                                    {this.state.message}
                                </div>
                            ):''
                        }
                        {
                            this.state.messageSuccess !== ''?(
                                <div className="alert alert-success text-center" role="alert">
                                    {this.state.messageSuccess}
                                </div>
                            ):''
                        }
                        <FormGroup>
                            <Label>Nombre:</Label>
                            <Input className="form-control" name="nombre" type="text" onChange={e=>this.name=e.target.value}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Apellidos:</Label>
                            <Input className="form-control" name="apellido" type="text" onChange={e=>this.lastname=e.target.value}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Email:</Label>
                            <Input type="text" name="email" id="userEmail" placeholder="" onChange={e=>this.email=e.target.value}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Contraseña:</Label>
                            <Input type="password" name="password" id="userPass" placeholder="" onChange={e=>this.password=e.target.value}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" onClick={()=>this.signUp()}>Registrarse</Button>                        {"  "}
                        <Button outline color="danger" onClick={()=>this.hideModal()} >Cancelar</Button>
                    </ModalFooter>
                </Modal>                   
            </div>
        );
    }
}