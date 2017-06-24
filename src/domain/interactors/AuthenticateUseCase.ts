import { Observable } from '@reactivex/rxjs';
import { UseCase } from './UseCase';
import { UserRepository } from '../repository/UserRepository';

import {UserDataRepository} from '../../data/repository/UserDataRepository';
export class AuthenticateUseCase extends UseCase {
    private username: string = '';
    private password: string = '';

    private userRepository: UserRepository;

    public constructor(
        userRepository: UserRepository = new UserDataRepository()) {
        super();
        this.userRepository = userRepository;
    }

    public setUsername(username: string) {
        this.username = username;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    protected buildUseCaseObservable(): Observable<any> {
        return this.userRepository.authenticate(this.username, this.password);
    }
}