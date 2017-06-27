import {User} from '../../../domain/model/User';
import {UserEntity} from '../UserEntity';

export class UserEntityDataMapper {
    public static transform(userEntity: UserEntity): User {
        let user = new User();
        user.setUserID(userEntity.getUserID());
        user.setUsername(userEntity.getUsername());
        user.setName(userEntity.getName());
        user.setLastName(userEntity.getLastName());
        user.setEmail(userEntity.getEmail());
        user.setRole(userEntity.getRole());
        user.setDepartment(userEntity.getDepartment());
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
        userEntity.setUserID(user.getUserID());
        userEntity.setUsername(user.getUsername());
        userEntity.setName(user.getName());
        userEntity.setLastName(user.getLastName());
        userEntity.setEmail(user.getEmail());
        userEntity.setRole(user.getRole());
        userEntity.setDepartment(user.getDepartment());
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
