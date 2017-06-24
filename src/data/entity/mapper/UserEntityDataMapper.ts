import {User} from './../../../domain/model/User';
import {UserEntity} from '../UserEntity';

export class UserEntityDataMapper {
    public static transform(userEntity: UserEntity): User {
        let user = new User();
        user.setUsername(userEntity.getUsername());
        user.setName(userEntity.getName());
        user.setEmail(userEntity.getEmail());
        user.setRole(userEntity.getRole());
        return user;
    }

    public static transformList(userEntitiesList: Array<UserEntity>): Array<User> {
        let usersList: Array<User> = [];

        userEntitiesList.forEach((userEntity: UserEntity) => {
            usersList.push(this.transform(userEntity));
        });

        return usersList;
    }

    public static convert(user: User): UserEntity {
        let userEntity = new UserEntity();
        userEntity.setUsername(user.getUsername());
        userEntity.setName(user.getName());
        userEntity.setEmail(user.getEmail());
        userEntity.setRole(user.getRole());
        return userEntity;
    }

    public static convertList(usersList: Array<User>): Array<UserEntity> {
        let userEntitiesList: Array<UserEntity> = [];

        usersList.forEach((user: User) => {
            userEntitiesList.push(this.convert(user));
        });

        return userEntitiesList;
    }
}