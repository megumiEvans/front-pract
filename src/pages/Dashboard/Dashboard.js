import React, {Component} from 'react';
//import NavLogged from '../../components/navs/NavLogged'
import Selector from "../../components/Selector";
import Carousel from "../../components/Carousel";
export default class Dashboard extends Component{
    render(){
        let user=localStorage.getItem("name");
        return(
            <div>
                <h2>Bienvenido(a) {user}</h2>
                <Carousel/>
            </div>
        );
    }
}