import { Observable } from '@reactivex/rxjs';
import { UseCase } from './UseCase';
import { UserRepository } from '../repository/UserRepository';

import {UserDataRepository} from '../../data/repository/UserDataRepository';
import {User} from "../model/User";
export class DeleteUserUseCase extends UseCase {
    private UserID: string;

    private userRepository: UserRepository;

    public constructor(
        userRepository: UserRepository = new UserDataRepository()) {
        super();
        this.userRepository = userRepository;
    }

    public setUserID(UserID: string) {
        this.UserID = UserID;
    }

    protected buildUseCaseObservable(): Observable<any> {
        return this.userRepository.deleteUser(this.UserID);
    }
}
