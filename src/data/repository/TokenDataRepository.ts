import {Observable} from '@reactivex/rxjs';
import {TokenRepository} from '../../domain/repository/TokenRepository';
import {TokenDBImpl} from '../db/TokenDBImpl';
import {TokenDB} from '../db/TokenDB';

export class TokenDataRepository implements TokenRepository {
    private tokenDB: TokenDB;

    constructor(
        tokenDB: TokenDB = new TokenDBImpl()
    ) {
        this.tokenDB = tokenDB;
    }

    getToken(): Observable<string> {
        return this.tokenDB.getToken();
    }

    deleteToken(): Observable<string> {
        return this.tokenDB.deleteToken();
    }
}