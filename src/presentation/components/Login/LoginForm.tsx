import * as React from 'react';

interface LoginFormProps {
    usernameLabel?: string;
    passwordLabel?: string;
    loginButtonLabel?: string;
    onSubmit: any;
}

export class LoginForm extends React.Component<LoginFormProps, undefined> {
    private usernameLabel: string;
    private passwordLabel: string;
    private loginButtonLabel: string;

    private username: string = '';
    private password: string = '';

    constructor(props: LoginFormProps) {
        super(props);

        this.usernameLabel = 'Username';
        if (props.usernameLabel) {
            this.usernameLabel = props.usernameLabel;
        }

        this.passwordLabel = 'Password';
        if (props.passwordLabel) {
            this.passwordLabel = props.passwordLabel;
        }

        this.loginButtonLabel = 'Login';
        if (props.loginButtonLabel) {
            this.loginButtonLabel = props.loginButtonLabel;
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    private handleUsernameChange(event: any) {
        this.username = event.target.value;
    }

    private handlePasswordChange(event: any) {
        this.password = event.target.value;
    }

    private onSubmit(event: any) {
        event.preventDefault();
        this.props.onSubmit(this.username, this.password);
    }

    render() {
        return <form className='row loginBody' onSubmit={this.onSubmit}>
            <label>{this.usernameLabel}</label>
            <input className='form-control' onChange={this.handleUsernameChange} type='text' required />
            <br />
            <label>{this.passwordLabel}</label>
            <input className='form-control' onChange={this.handlePasswordChange} type='password' required />
            <br />
            <div className='row' style={{ textAlign: 'center' }}>
                <button className='btn btn-argos' type='submit'><strong>{this.loginButtonLabel}</strong></button>
            </div>
        </form>;
    }
}
