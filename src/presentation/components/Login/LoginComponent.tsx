import * as React from 'react';
import { LoginForm } from './LoginForm';
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.

export class LoginComponent extends React.Component<any, undefined>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return <div className="uk-vertical-align uk-text-center uk-height-1-1">
            <div className="uk-vertical-align-middle" style={{ width: "500px" }}>
                <img className="uk-margin-bottom" width="140" height="120" src="src/presentation/assets/img/Revosoft-logo.png" alt="Drev" />
                <LoginForm usernamePlaceholder={"Username"} passwordPlaceholder={"Password"} />
            </div>
        </div>;
    }
}