import { Observable } from '@reactivex/rxjs';
import { UseCase } from './UseCase';
import { UserRepository } from '../repository/UserRepository';

import {UserDataRepository} from '../../data/repository/UserDataRepository';
import {User} from "../model/User";
export class AddUserUseCase extends UseCase {
    private user: User;

    private userRepository: UserRepository;

    public constructor(
        userRepository: UserRepository = new UserDataRepository()) {
        super();
        this.userRepository = userRepository;
    }

    public setUser(user: User) {
        this.user = user;
    }

    protected buildUseCaseObservable(): Observable<any> {
        return this.userRepository.addUser(this.user);
    }
}
