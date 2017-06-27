import { Observable } from '@reactivex/rxjs';
import {User} from '../model/User';

export interface UserRepository {
    authenticate(username: string, password: string): Observable<User>;
    addUser(user: User): Observable<User>;
    getUsers(): Observable<User>;
    editUser(UserID: string, user: User): Observable<User>;
    deleteUser(UserID: string): Observable<User>;
}
