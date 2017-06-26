import * as React from 'react';
import { UserModel } from '../../../model/UserModel';

interface UserContentProps {
    usersLabel?: string;
    filterLabel?: string;
    nameLabel?: string;
    lastNameLabel?: string;
    userLabel?: string;
    emailLabel?: string;
    roleLabel?: string;
    departmentLabel?: string;
    editLabel?: string;
    deleteLabel?: string;
    addLabel?: string;
}

interface DisplayUsersProps {
    usersModel: Array<UserModel>;
    onUserDelete: any;
    onUserEdit: any;
}

export class UserContent extends React.Component<UserContentProps, any> {
    private usersLabel: string;
    private filterLabel: string;
    private nameLabel: string;
    private lastNameLabel: string;
    private userLabel: string;
    private emailLabel: string;
    private roleLabel: string;
    private departmentLabel: string;
    private editLabel: string;
    private deleteLabel: string;
    private addLabel: string;

    private users: Array<UserModel>;
    private displayUsers: Array<UserModel>;

    constructor(props: UserContentProps) {
        super(props);
        this.usersLabel = this.props.usersLabel || 'Users';
        this.filterLabel = this.props.filterLabel || 'Filter';
        this.nameLabel = this.props.nameLabel || 'Name';
        this.lastNameLabel = this.props.lastNameLabel || 'Last Name';
        this.userLabel = this.props.userLabel || 'User';
        this.emailLabel = this.props.emailLabel || 'Email';
        this.roleLabel = this.props.roleLabel || 'Role';
        this.departmentLabel = this.props.departmentLabel || 'Department';
        this.editLabel = this.props.editLabel || 'Edit';
        this.deleteLabel = this.props.deleteLabel || 'Delete';
        this.addLabel = this.props.addLabel || 'Add';

        this.users = [];

        let user = new UserModel();
        user.setName('Jose');
        user.setLastName('Jaen');
        user.setUsername('jjaen');
        user.setEmail('jjaen@revosoft.com.pa');
        user.setRole('Usuario');
        user.setDepartment('Produccion');
        this.users.push(user);

        user = new UserModel();
        user.setName('Jose');
        user.setLastName('Faraday');
        user.setUsername('jfaraday');
        user.setEmail('jfarady@revosoft.com.pa');
        user.setRole('Chief');
        user.setDepartment('Alimentacion');
        this.users.push(user);

        this.state = {
            users: this.users
        };

        this.onEditUser = this.onEditUser.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    private onEditUser(index: number) {
        console.log('Edito el usario: ' + index);
        console.log(this.state.users[index]);
    }

    private onDeleteUser(index: number) {
        console.log('Borro el usario: ' + index);
        console.log(this.state.users[index]);
    }

    private onFilterChange(event) {
        let filterInput = event.target.value;
        if (filterInput.trim() === '') {
            this.setState({ users: this.users });
        } else {
            let filteredUsers = this.users.filter((user: UserModel) => {
                if (user.getName().includes(filterInput)) { return true; };
                if (user.getLastName().includes(filterInput)) { return true; };
                if (user.getUsername().includes(filterInput)) { return true; };
                if (user.getEmail().includes(filterInput)) { return true; };
                if (user.getRole().includes(filterInput)) { return true; };
                if (user.getDepartment().includes(filterInput)) { return true; };

                return false;
            });
            this.setState({ users: filteredUsers });
        }
    }

    render() {
        return (
            <section className='content'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h3>{this.usersLabel}</h3>
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-md-2 pull-right'>
                        <input className='form-control' type='text' onChange={this.onFilterChange}
                            placeholder={this.filterLabel} />
                    </div>
                </div>
                <br />
                <section className='panel'>
                    <header className='panel-heading'> {this.usersLabel}
                        <button className='btn btn-xs btn-success pull-right' data-toggle='modal'
                            data-target='#myModal'>
                            {this.addLabel}
                        </button>
                    </header>
                    <div className='panel-body table-responsive'>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th>{this.nameLabel}</th>
                                    <th>{this.lastNameLabel}</th>
                                    <th>{this.userLabel}</th>
                                    <th>{this.emailLabel}</th>
                                    <th>{this.roleLabel}</th>
                                    <th>{this.departmentLabel}</th>
                                    <th>{this.editLabel}</th>
                                    <th>{this.deleteLabel}</th>
                                </tr>
                            </thead>
                            <DisplayUsers
                                usersModel={this.state.users}
                                onUserDelete={this.onDeleteUser}
                                onUserEdit={this.onEditUser} />
                        </table>
                    </div>
                </section>
            </section>
        );
    }
}

class DisplayUsers extends React.Component<DisplayUsersProps, undefined> {
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
        let users = this.props.usersModel.map((user: UserModel, index: number) => {
            return (
                <tr key={index}>
                    <td>{user.getName()}</td>
                    <td>{user.getLastName()}</td>
                    <td>{user.getUsername()}</td>
                    <td>{user.getEmail()}</td>
                    <td>{user.getRole()}</td>
                    <td>{user.getDepartment()}</td>
                    <td>
                        <button className='btn btn-sm btn-warning' data-id={index} onClick={this.onUserEdit}><i
                            className='fa fa-pencil' /></button>
                    </td>
                    <td>
                        <button className='btn btn-sm btn-danger' data-id={index} onClick={this.onUserDelete}><i
                            className='fa fa-times' /></button>
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
