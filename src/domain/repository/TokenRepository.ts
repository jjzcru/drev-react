import { Observable } from '@reactivex/rxjs';
import {User} from '../model/User';

export interface TokenRepository {
    getToken(): Observable<string>;
    deleteToken(): Observable<string>;
}
