import 'babel-polyfill';
import * as uuid from 'uuid/v4';
import {Observable} from '@reactivex/rxjs';
import {UserDB} from './UserDB';
import {UserEntity} from '../entity/UserEntity';

export class UserDBImpl implements UserDB {
    private KEY = 'users';

    public addUser(userEntity: UserEntity): Observable<UserEntity> {
        return Observable.create(async (observer: any) => {
            try {
                let usersEntities: Array<UserEntity> = [];
                await this.getUsers().forEach((user: UserEntity) => {
                    usersEntities.push(user);
                });
                userEntity.setUserID(uuid());
                userEntity.setCreatedAt(new Date());
                userEntity.setUpdatedAt(new Date());
                usersEntities.push(userEntity);

                localStorage.setItem(this.KEY, JSON.stringify(usersEntities));
                observer.next(userEntity);
                observer.complete();
            } catch (e) {
                observer.error(e.message);
            }
        });
    }

    public getUsers(): Observable<UserEntity> {
        return Observable.create((observer: any) => {
            try {
                if (localStorage.getItem(this.KEY) === null) {
                    observer.complete();
                } else {
                    let users = JSON.parse(localStorage.getItem(this.KEY));
                    users.forEach((user) => {
                        console.log(user);

                        let userEntity = new UserEntity();
                        userEntity.setUserID(user.UserID);
                        userEntity.setName(user.name);
                        userEntity.setLastName(user.lastName);
                        userEntity.setUsername(user.username);
                        userEntity.setEmail(user.email);
                        userEntity.setRole(user.role);
                        userEntity.setDepartment(user.department);
                        userEntity.setCreatedAt(user.createdAt);
                        userEntity.setUpdatedAt(user.updatedAt);

                        observer.next(userEntity);
                    });
                    observer.complete();
                }
            } catch (e) {
                observer.error(e.message);
            }
        });
    }

    public editUser(UserID: string, userEntity: UserEntity): Observable<UserEntity> {
        return Observable.create(async (observer: any) => {
            try {
                let usersEntities: Array<UserEntity> = [];
                await this.getUsers()
                    .map((user: UserEntity) => {
                        if (user.getUserID() === UserID) {
                            userEntity.setUpdatedAt(new Date());
                            user = userEntity;
                            observer.next(userEntity);
                        }
                        return user;
                    })
                    .forEach((user: UserEntity) => {
                        usersEntities.push(user);
                    });

                localStorage.setItem(this.KEY, JSON.stringify(usersEntities));
                observer.complete();
            } catch (e) {
                observer.error(e.message);
            }
        });
    }

    public deleteUser(UserID: string): Observable<UserEntity> {
        return Observable.create(async (observer: any) => {
            try {
                let usersEntities: Array<UserEntity> = [];
                await this.getUsers()
                    .filter((userEntity: UserEntity) => {
                        if (userEntity.getUserID() === UserID) {
                            observer.next(userEntity);
                            return false;
                        }
                        return true;
                    })
                    .forEach((user: UserEntity) => {
                        usersEntities.push(user);
                    });


                localStorage.setItem(this.KEY, JSON.stringify(usersEntities));
                observer.complete();
            } catch (e) {
                observer.error(e.message);
            }
        });
    }
}
