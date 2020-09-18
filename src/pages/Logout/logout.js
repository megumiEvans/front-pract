import React, {Component} from 'react';

export default class Logout extends Component{
    componentDidMount(){
        localStorage.removeItem('token');
        localStorage.removeItem('idUser');
        localStorage.removeItem('name');
        this.props.history.push('/')
    }
    render(){
        return null;
    }
}