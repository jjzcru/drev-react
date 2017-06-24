import * as React from 'react';
import { Subscriber } from '@reactivex/rxjs';
import { LoginForm } from '../components/Login/LoginForm';
import { RevoAlert } from '../components/shared/RevoAlert';
import { AuthenticateUseCase } from '../../domain/interactors/AuthenticateUseCase';
import { UserModel } from '../model/UserModel';
import { UserModelDataMapper } from '../model/mapper/UserModelDataMapper';
import { User } from '../../domain/model/User';

export class LoginView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: false,
            message: ''
        };

        this.authenticate = this.authenticate.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    private authenticate(username: string, password: string) {
        let authenticateUseCase = new AuthenticateUseCase();
        authenticateUseCase.setUsername(username);
        authenticateUseCase.setPassword(password);

        let userModel: UserModel;
        authenticateUseCase.execute(Subscriber.create(
            (user: User) => {
                userModel = UserModelDataMapper.convert(user);
            },
            (err) => {
                this.setState({ error: true, message: err.message });
            },
            () => {
                // Here i handle the authentication response to go to dashboard
                console.log(userModel);
            }));
    }

    private closeAlert() {
        this.setState({ error: false });
    }

    render() {
        return (
            <div className='col-md-4 col-md-offset-4'>
                <div className='row loginHeader' style={{ textAlign: 'center' }}>
                    <img src='src/presentation/assets/img/argos.jpg' />
                </div>
                <LoginForm
                    usernameLabel={'Usuario'}
                    passwordLabel={'Contraseña'}
                    loginButtonLabel={'Iniciar sesión'}
                    onSubmit={this.authenticate}
                />
                <RevoAlert show={this.state.error} title={'Error'} message={this.state.message}
                    closeAlert={this.closeAlert} />
            </div>
        );
    }
}
