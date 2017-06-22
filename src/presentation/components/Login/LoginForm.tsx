import * as React from "react";
import axios from 'axios';

interface LoginFormState { username: string; password: string; }
interface LoginFormProps { usernameLabel?: string, passwordLabel?: string, loginButtonLabel?: string, handleSubmit: any}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState>{
    state: LoginFormState;
    usernameLabel: string;
    passwordLabel: string;
    loginButtonLabel: string;
    constructor(props: LoginFormProps) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.usernameLabel = "Username";
        if (props.usernameLabel) {
            this.usernameLabel = props.usernameLabel;
        }

        this.passwordLabel = "Password";
        if (props.passwordLabel) {
            this.passwordLabel = props.passwordLabel;
        }

        this.loginButtonLabel = "Login";
        if (props.loginButtonLabel) {
            this.loginButtonLabel = props.loginButtonLabel;
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsernameChange(event: any) {
        this.state.username = event.target.value;
        this.setState(this.state);
    }
    handlePasswordChange(event: any) {
        this.state.password = event.target.value;
        this.setState(this.state);
    }
    handleSubmit(event: any) {
        event.preventDefault();
        this.props.handleSubmit(this.state.username, this.state.password);
        /*let config = {
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
        }).then((response) => {
            console.log(response.data);
        });*/
        
    }
    render() {
        return <form className="row loginBody" onSubmit={this.handleSubmit}>
            <label>{this.usernameLabel}</label>
            <input className="form-control" value={this.state.username} onChange={this.handleUsernameChange} type="text" required/>
            <br />
            <label>{this.passwordLabel}</label>
            <input className="form-control" value={this.state.password} onChange={this.handlePasswordChange} type="text" required/>
            <br />
            <div className="row" style={{ textAlign: "center" }}>
                <button className="btn btn-argos" type="submit"><strong>{this.loginButtonLabel}</strong></button>
            </div>

        </form>;
    }
}