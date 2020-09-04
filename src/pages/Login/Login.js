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
            modalLogin:true
        };
        this.navigateToPage =  this.navigateToPage.bind(this);
    }
    navigateToPage = (path) => {
        console.log('Navigate to path ' + path);
        this.props.history.push(path);

    };
    hideModalLogin=()=>{
        this.setState({modalLogin:false})
    }
    signIn = () =>{
        const data = JSON.stringify({email: this.email, password:this.password});
        //const data = JSON.stringify({email: "admin-pract@bbva.com", password:"admin12345"});
        console.log(data);
    
        const requestInfo = {
            method: 'POST',
            body: data,
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };
        
        fetch('http://localhost:4000/users/authenticate', requestInfo)
        .then(response =>{
            if(response.ok){
                return response.json()
            }
            throw new Error("Usuario y/o contraseña invalido");
        })
        .then(response=> {
            console.log("token: "+response.data.token);
            localStorage.setItem('token',response.data.token);
            this.navigateToPage('/inicio')
        })
        .catch(e=>{
            this.setState({message:e.message})
        });
    
    }
    render(){
        return(
            <div>
                <NavLog/>

                <Modal isOpen={this.state.modalLogin}>
                    <ModalHeader>
                        <h3>Iniciar sesión </h3>
                    </ModalHeader>
                    <ModalBody>
                        {
                            this.state.message !== ''?(
                                <div className="alert alert-danger text-center" role="alert">
                                    {this.state.message}
                                </div>
                            ):''
                        }
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
                        <Button outline color="info" onClick={()=>this.insertClient()}>Registrarse</Button>                        {"  "}
                        <Button color="info" onClick={()=>this.signIn}>Entrar</Button>                        {"  "}
                        <Button outline color="danger" onClick={()=>this.hideModalLogin()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>                   
            </div>
        );
    }
}