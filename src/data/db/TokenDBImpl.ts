
import {Observable} from '@reactivex/rxjs';
import {TokenDB} from './TokenDB';

export class TokenDBImpl implements TokenDB {
    private KEY = 'token';

    public setToken(token: string): Observable<string> {
        return Observable.create(async (observer: any) => {
            try {
                localStorage.setItem(this.KEY, token);
                observer.next(token);
                observer.complete();
            } catch (e) {
                observer.error(e.message);
            }
        });
    }

    public getToken(): Observable<string> {
        return Observable.create(async (observer: any) => {
            let token = localStorage.getItem(this.KEY);
            if (token === null || token === undefined || token === '') {
                observer.complete();
            } else {

                observer.next(token);
                observer.complete();
            }
        });
    }

    public deleteToken(): Observable<string> {
        return Observable.create(async (observer: any) => {
            localStorage.removeItem(this.KEY);
            observer.complete();
        });
    }
}
