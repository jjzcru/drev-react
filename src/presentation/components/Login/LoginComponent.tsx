import * as React from 'react';
import SweetAlert from 'sweetalert-react';
import { Subscriber } from '@reactivex/rxjs';
import { LoginForm } from './LoginForm';
import { AlertComponent } from './AlertComponent';
import { AuthenticateUseCase } from '../../../domain/interactors/AuthenticateUseCase';
import { UserModel } from '../../model/UserModel';
import { UserModelDataMapper } from "../../model/mapper/UserModelDataMapper";
import { User } from "../../../domain/model/User";

export class LoginComponent extends React.Component<any, any>{
    error:true;
    constructor(props: any) {
        super(props);
        this.state = {
            error: false,
            message: ''
        };
        this.setComponentState = this.setComponentState.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    setComponentState(state) {
        this.setState(state);
    }

    public authenticate(username: string, password: string) {
        console.log("Username: " + username);
        console.log("Password: " + password);

        let authenticateUseCase = new AuthenticateUseCase();
        authenticateUseCase.setUsername(username);
        authenticateUseCase.setPassword(password);

        let userModel: UserModel;
        authenticateUseCase.execute(Subscriber.create(
            (user: User) => {
                userModel = UserModelDataMapper.convert(user);
            },
            (err) => {
               this.setState({error: true, message: err.message});
            },
            () => {
                console.log('Este es el modelo');
                console.log(userModel);
            }));
    }

    public closeAlert(){
        this.setState({error: false});
    }

    public render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="row loginHeader" style={{ textAlign: "center" }}>
                    <img src="src/presentation/assets/img/argos.jpg" />
                </div>
                <LoginForm
                    usernameLabel={"Usuario"}
                    passwordLabel={"Contraseña"}
                    loginButtonLabel={"Iniciar sesion"}
                    handleSubmit={this.authenticate}
                />
                <AlertComponent show={this.state.error} title={'Error'} message={this.state.message} closeAlert={this.closeAlert}/>
            </div>
        );
    }
}