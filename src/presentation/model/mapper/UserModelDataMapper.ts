import { User } from '../../../domain/model/User';
import { UserModel } from '../UserModel';

export class UserModelDataMapper {
    public static transform(userModel: UserModel): User {
        let user = new User();
        user.setUserID(userModel.getUserID());
        user.setUsername(userModel.getUsername());
        user.setName(userModel.getName());
        user.setLastName(userModel.getLastName());
        user.setEmail(userModel.getEmail());
        user.setRole(userModel.getRole());
        user.setDepartment(userModel.getDepartment());
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
        userModel.setUserID(user.getUserID());
        userModel.setUsername(user.getUsername());
        userModel.setLastName(user.getLastName());
        userModel.setName(user.getName());
        userModel.setEmail(user.getEmail());
        userModel.setRole(user.getRole());
        userModel.setDepartment(user.getDepartment());
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
