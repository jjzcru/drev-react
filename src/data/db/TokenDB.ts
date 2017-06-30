import {Observable} from '@reactivex/rxjs';

export interface TokenDB {
    setToken(token: string): Observable<string>;
    getToken(): Observable<string>;
    deleteToken(): Observable<string>;
}
