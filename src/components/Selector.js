import React, { Component } from "react";
import NavAdmin from "../components/navs/NavAdmin";
import NavLogged from "../components/navs/NavLogged";
import NavLog from "../pages/Login/NavLog";

class Selector extends Component {
    constructor() {
        super();
    }

    render() {
        let user=localStorage.getItem("name");
        console.log("localStorage-name: ",localStorage.getItem('name'))
        if (localStorage.getItem("name")=== "admin") {
            return (
                <div>
                    {console.log('admin')}
                    <NavAdmin/>
                    
                </div>
                
            )
        }
        else if (localStorage.getItem("name")=== null) {
            return (
                <div>
                    <NavLog/>
                    
                </div>   
            )
        }
        
        else{
            return (
                <div>
                    {console.log('no admin')}
                    
                    <NavLogged/>
                    <h2>Bienvenido(a) {user}</h2>
                </div>
                
            )
        }
    }
}

export default Selector;