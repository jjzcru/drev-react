import { Observable } from '@reactivex/rxjs';

import { UserRepository } from '../../domain/repository/UserRepository';
import {User} from '../../domain/model/User';
import {UserEntity} from '../entity/UserEntity';
import {UserEntityDataMapper} from '../entity/mapper/UserEntityDataMapper';

export class UserDataRepository implements UserRepository {
    public authenticate(username: string, password: string): Observable<User> {
        return this.mockAuthenticate(username, password).map((userEntity: UserEntity) => {
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
