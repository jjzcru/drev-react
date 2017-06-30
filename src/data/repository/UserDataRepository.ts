import 'babel-polyfill';
import { Observable } from '@reactivex/rxjs';
import * as uuid from 'uuid/v4';

import { UserRepository } from '../../domain/repository/UserRepository';
import {User} from '../../domain/model/User';
import {UserEntity} from '../entity/UserEntity';
import {UserEntityDataMapper} from '../entity/mapper/UserEntityDataMapper';
import {UserDB} from '../db/UserDB';
import {UserDBImpl} from '../db/UserDBImpl';
import {TokenDB} from '../db/TokenDB';
import {TokenDBImpl} from '../db/TokenDBImpl';

export class UserDataRepository implements UserRepository {
    private userDB: UserDB;
    private tokenDB: TokenDB;

    constructor(
        userDB: UserDB = new UserDBImpl(),
        tokenDB: TokenDB = new TokenDBImpl()
    ) {
        this.userDB = userDB;
        this.tokenDB = tokenDB;
    }

    public authenticate(username: string, password: string): Observable<User> {
        return this.mockAuthenticate(username, password).map((userEntity: UserEntity) => {
            return UserEntityDataMapper.transform(userEntity);
        });
    }


    public addUser(user: User): Observable<User> {
        return this.userDB.addUser(UserEntityDataMapper.convert(user)).map((userEntity: UserEntity) => {
            return UserEntityDataMapper.transform(userEntity);
        });
    }

    public getUsers(): Observable<User> {
        return this.userDB.getUsers().map((userEntity: UserEntity) => {
            return UserEntityDataMapper.transform(userEntity);
        });
    }

    public editUser(UserID: string, user: User): Observable<User> {
        return this.userDB.editUser(UserID, UserEntityDataMapper.convert(user)).map((userEntity: UserEntity) => {
            return UserEntityDataMapper.transform(userEntity);
        });
    }

    public deleteUser(UserID: string): Observable<User> {
        return this.userDB.deleteUser(UserID).map((userEntity: UserEntity) => {
            return UserEntityDataMapper.transform(userEntity);
        });
    }

    private mockAuthenticate(username: string = '', password: string = ''): Observable<UserEntity> {
        return Observable.create(async (observer: any) => {
            if (username === 'root' && password === 'RevoSoft') {
                let userEntity = new UserEntity();
                userEntity.setUsername('root');
                userEntity.setEmail('root@revosoft.com');
                userEntity.setRole('root');
                userEntity.setName('Jhon Doe');
                userEntity.setCreatedAt(new Date());
                userEntity.setUpdatedAt(new Date());
                try {
                    await this.tokenDB.setToken(uuid()).toPromise();
                    observer.next(userEntity);
                    observer.complete();
                } catch (e) {
                    observer.error(new Error(e.message));
                }
            } else {
                observer.error(new Error('Invalid credentials'));
            }
        });
    }
}
