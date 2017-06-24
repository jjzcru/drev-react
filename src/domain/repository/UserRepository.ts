import { Observable } from '@reactivex/rxjs';
import {User} from '../model/User';

export interface UserRepository {
    authenticate(username: string, password: string): Observable<User>;
}
