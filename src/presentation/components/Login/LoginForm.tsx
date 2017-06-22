import * as React from "react";
import axios from 'axios';

interface LoginFormState { username: string; password: string; }
interface LoginFormProps { usernamePlaceholder?: string, passwordPlaceholder?: string }

export class LoginForm extends React.Component<LoginFormProps, LoginFormState>{
    state: LoginFormState;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    constructor(props: LoginFormProps){
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.usernamePlaceholder = "Username";
        if(props.usernamePlaceholder){
            this.usernamePlaceholder = props.usernamePlaceholder;
        }

        this.passwordPlaceholder = "Password";
        if(props.passwordPlaceholder){
            this.passwordPlaceholder = props.passwordPlaceholder;
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsernameChange(event:any) {
        this.state.username = event.target.value;
        this.setState(this.state);
    }
    handlePasswordChange(event:any) {
        this.state.password = event.target.value;
        this.setState(this.state);
    }
    handleSubmit(event:any) {
        console.log(this.state);
        let config = {
            baseURL: "http://api.argos.drev.io",
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJkYTQwMWYwZS0zY2FhLTRkMDUtYjgzMy00ZWZlZWRlODBmZjMiLCJ1c2VybmFtZSI6InJvb3QiLCJyb2xlIjpbInJvb3QiXSwiRGVwYXJ0bWVudElEIjpudWxsLCJpYXQiOjE0OTYwMjA0ODIsImV4cCI6MTQ5NjEwNjg4Miwic3ViIjoiZGE0MDFmMGUtM2NhYS00ZDA1LWI4MzMtNGVmZWVkZTgwZmYzIn0.ZGnQ66iHiQjImgcrHE2qv3R_VR5-AxBtgSEP6QtFQk8',
            }
        };
        console.log(config);
        axios.defaults.baseURL = "http://api.argos.drev.io";
        delete axios.defaults.headers.common['X-Requested-With'];
        axios({
            method: 'post',
            url: '/auth',
            data: {
                username: 'root',
                password: 'RevoSoft'
            }
        }).then((response)=>{
            console.log(response.data);
        });
        event.preventDefault();
    }
    render() {
        return <form className="uk-panel uk-panel-box uk-form" onSubmit={this.handleSubmit}>
            <div className="uk-form-row">
                <input className="uk-width-1-1 uk-form-large" value={this.state.username} onChange={this.handleUsernameChange} type="text" placeholder={this.usernamePlaceholder}/>
            </div>
            <div className="uk-form-row">
                <input className="uk-width-1-1 uk-form-large"  value={this.state.password} onChange={this.handlePasswordChange} type="password"  placeholder={this.passwordPlaceholder}/>
            </div>
            <div className="uk-form-row">
                <button className="uk-width-1-1 uk-button uk-button-primary uk-button-small" type="submit">Login</button>
            </div>
            <div className="uk-form-row uk-text-small">
                <a className="uk-float-right uk-link uk-link-muted" href="#">Forgot Password?</a>
            </div>
        </form>;
    }
}