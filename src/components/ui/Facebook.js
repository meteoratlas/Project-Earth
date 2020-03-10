import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
import '../../App.css'


export class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: ''
    }
    responseFacebook = response => {
        this.setState({
            isLoggedIn:true,
            name:response.name,
            email:response.email
        
        })
        
    }
    
    compoenntClicked = () => {
        console.log('clicked')
    }
    logOut =() =>{
        this.setState({
            isLoggedIn:false,
            userID:'',
            name:'',
            email:''
        })
    }
    render() {
        let fbContent;
        if (this.state.isLoggedIn) {
            fbContent = (
                <div style ={{
                    width:'300px',
                    margin:'0px',
                    background: 'rgba (0,0,0,0.6)',
                    padding:'20px',
                    float:'left'
                }}>
                <h5>Hello {this.state.name}</h5>
                <button style={{ width: "20%", top: '10px', right: '10px', position: 'center'}} className="middle" onClick={this.logOut}>Sign Out</button>
                </div>
            );
        } else {
            
            fbContent = (<FacebookLogin
                appId= '187935692437403'
                autoLoad={false}
                fields="name,email"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
                cssClass="kep-login-facebook"
                />  
            );
            }
            
        return (
            <div>
                 {fbContent}
            </div>
        )
    }
}

export default Facebook
