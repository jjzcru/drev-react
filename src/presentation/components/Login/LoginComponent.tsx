import * as React from 'react';
import { LoginForm } from './LoginForm';
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.

export class LoginComponent extends React.Component<any, undefined>{
    public constructor(props: any) {
        super(props);
    }

    public authenticate(username: string, password: string) {
        console.log("Username: " + username);
        console.log("Password: " + password);
    }
    public render() {
        /*return <div className="uk-vertical-align uk-text-center uk-height-1-1">
            <div className="uk-vertical-align-middle" style={{ width: "500px" }}>
                <img className="uk-margin-bottom" width="140" height="120" src="src/presentation/assets/img/Revosoft-logo.png" alt="Drev" />
                <LoginForm usernamePlaceholder={"Username"} passwordPlaceholder={"Password"} />
            </div>
        </div>;*/

        return <div className="col-md-4 col-md-offset-4">
            <div className="row loginHeader" style={{ textAlign: "center" }}>
                <img src="src/presentation/assets/img/argos.jpg" />
            </div>
            <LoginForm usernameLabel={"Usuario"} passwordLabel={"Contraseña"} loginButtonLabel={"Iniciar sesion"} handleSubmit={this.authenticate} />
        </div>;
    }
}