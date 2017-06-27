import { Observable } from '@reactivex/rxjs';
import { UseCase } from './UseCase';
import { UserRepository } from '../repository/UserRepository';

import {UserDataRepository} from '../../data/repository/UserDataRepository';
import {User} from "../model/User";
export class EditUserUseCase extends UseCase {
    private user: User;
    private UserID: string;

    private userRepository: UserRepository;

    public constructor(
        userRepository: UserRepository = new UserDataRepository()) {
        super();
        this.userRepository = userRepository;
    }

    public setUser(UserID: string, user: User) {
        this.UserID = UserID
        this.user = user;
    }

    protected buildUseCaseObservable(): Observable<any> {
        return this.userRepository.editUser(this.UserID, this.user);
    }
}
