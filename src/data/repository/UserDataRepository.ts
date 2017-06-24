import { Observable } from '@reactivex/rxjs';
// import axios from 'axios';

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

    /*let config = {
     baseURL: "http://api.argos.drev.io",
     withCredentials: true,
     headers: {
     'Content-Type': 'application/json',
     'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJkYTQwMWYwZS0zY2FhLTRkMDUtYjgzMy00ZWZlZWRlODBmZjMiLCJ1c2VybmFtZSI6InJvb3QiLCJyb2xlIjpbInJvb3QiXSwiRGVwYXJ0bWVudElEIjpudWxsLCJpYXQiOjE0OTYwMjA0ODIsImV4cCI6MTQ5NjEwNjg4Miwic3ViIjoiZGE0MDFmMGUtM2NhYS00ZDA1LWI4MzMtNGVmZWVkZTgwZmYzIn0.ZGnQ66iHiQjImgcrHE2qv3R_VR5-AxBtgSEP6QtFQk8',
     }
     };
     console.log(config);
     axios.defaults.baseURL = "http://api.argos.drev.io";
     delete axios.defaults.headers.common['X-Requested-With'];
     axios({
     method: 'post',
     url: '/auth',
     data: {
     username: 'root',
     password: 'RevoSoft'
     }
     }).then((response) => {
     console.log(response.data);
     });*/
}