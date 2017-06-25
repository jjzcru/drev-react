import * as React from 'react';
import { UserModel } from '../../../model/UserModel';

interface DisplayUsersProps {
    usersModel: Array<UserModel>;
    onUserDelete: any;
    onUserEdit: any;
}

export class DisplayUsers extends React.Component<DisplayUsersProps, undefined> {
    constructor(props) {
        super(props);

        this.onUserEdit = this.onUserEdit.bind(this);
        this.onUserDelete = this.onUserDelete.bind(this);
    }

    private onUserEdit(event) {
        this.props.onUserEdit(event.currentTarget.dataset.id);
    }

    private onUserDelete(event) {
        this.props.onUserDelete(event.currentTarget.dataset.id);
    }

    render() {
        let index = -1;

        let users = this.props.usersModel.map((user: UserModel) => {
            index++;
            return (
                <tr key={index}>
                    <td>{user.getName()}</td>
                    <td>{user.getLastName()}</td>
                    <td>{user.getUsername()}</td>
                    <td>{user.getEmail()}</td>
                    <td>{user.getRole()}</td>
                    <td>{user.getDepartment()}</td>
                    <td>
                        <button className='btn btn-sm btn-warning' data-id={index} onClick={this.onUserEdit}><i className='fa fa-pencil'/></button>
                    </td>
                    <td>
                        <button className='btn btn-sm btn-danger' data-id={index} onClick={this.onUserDelete}><i className='fa fa-times'/></button>
                    </td>
                </tr>
            );
        });

        return (
            <tbody>
                {users}
            </tbody>
        );
    }
}
