import { User } from '../../../domain/model/User';
import { UserModel } from '../UserModel';

export class UserModelDataMapper {
    public static transform(userModel: UserModel): User {
        let user = new User();
        user.setUsername(userModel.getUsername());
        user.setName(userModel.getName());
        user.setEmail(userModel.getEmail());
        user.setRole(userModel.getRole());
        return user;
    }

    public static transformList(userModelsList: Array<UserModel>): Array<User> {
        let usersList: Array<User> = [];

        userModelsList.forEach((userModel: UserModel) => {
            usersList.push(this.transform(userModel));
        });

        return usersList;
    }

    public static convert(user: User): UserModel {
        let userModel = new UserModel();
        userModel.setUsername(user.getUsername());
        userModel.setName(user.getName());
        userModel.setEmail(user.getEmail());
        userModel.setRole(user.getRole());
        return userModel;
    }

    public static convertList(usersList: Array<User>): Array<UserModel> {
        let userModelsList: Array<UserModel> = [];

        usersList.forEach((user: User) => {
            userModelsList.push(this.convert(user));
        });

        return userModelsList;
    }
}
