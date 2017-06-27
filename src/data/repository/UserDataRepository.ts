import { Observable } from '@reactivex/rxjs';

import { UserRepository } from '../../domain/repository/UserRepository';
import {User} from '../../domain/model/User';
import {UserEntity} from '../entity/UserEntity';
import {UserEntityDataMapper} from '../entity/mapper/UserEntityDataMapper';
import {UserDB} from '../db/UserDB';
import {UserDBImpl} from '../db/UserDBImpl';

export class UserDataRepository implements UserRepository {
    private userDB: UserDB;
    constructor(userDB: UserDB = new UserDBImpl()) {
        this.userDB = userDB;
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
        return Observable.create((observer: any) => {
            if (username === 'root' && password === 'RevoSoft') {
                let userEntity = new UserEntity();
                userEntity.setUsername('root');
                userEntity.setEmail('root@revosoft.com');
                userEntity.setRole('root');
                userEntity.setName('Jhon Doe');
                userEntity.setCreatedAt(new Date());
                userEntity.setUpdatedAt(new Date());
                observer.next(userEntity);
                observer.complete();
            } else {
                observer.error(new Error('Invalid credentials'));
            }
        });
    }
}
