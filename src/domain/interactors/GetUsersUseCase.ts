import { Observable } from '@reactivex/rxjs';
import { UseCase } from './UseCase';
import { UserRepository } from '../repository/UserRepository';

import {UserDataRepository} from '../../data/repository/UserDataRepository';
import {User} from "../model/User";
export class GetUsersUseCase extends UseCase {
    private userRepository: UserRepository;

    public constructor(
        userRepository: UserRepository = new UserDataRepository()) {
        super();
        this.userRepository = userRepository;
    }

    protected buildUseCaseObservable(): Observable<any> {
        return this.userRepository.getUsers();
    }
}