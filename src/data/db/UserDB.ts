import {Observable} from '@reactivex/rxjs';
import {UserEntity} from '../entity/UserEntity';

export interface UserDB {
    addUser(userEntity: UserEntity): Observable<UserEntity>;
    getUsers(): Observable<UserEntity>;
    editUser(UserID: string, userEntity: UserEntity): Observable<UserEntity>;
    deleteUser(UserID: string): Observable<UserEntity>;
}
