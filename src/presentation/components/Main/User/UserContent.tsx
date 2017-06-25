import * as React from 'react';
import { UserModel } from '../../../model/UserModel';
import { DisplayUsers } from './DisplayUsers';
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
export class UserContent extends React.Component<UserContentProps, undefined> {
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
        user.setUsername('jjaen');
        user.setEmail('jfarady@revosoft.com.pa');
        user.setRole('Chief');
        user.setDepartment('Produccion');
        this.users.push(user);

        this.onEditUser = this.onEditUser.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
    }

    private onEditUser(index: number) {
        console.log('Edito el usario: ' + index);
    }

    private onDeleteUser(index: number) {
        console.log('Borro el usario: ' + index);
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
                        <input className='form-control' type='text' placeholder={this.filterLabel} />
                    </div>
                </div>
                <br />
                <section className='panel'>
                    <header className='panel-heading'> {this.usersLabel}
                    <button className='btn btn-xs btn-success pull-right' data-toggle='modal' data-target='#myModal'>
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
                                usersModel={this.users}
                                onUserDelete={this.onDeleteUser}
                                onUserEdit={this.onEditUser} />
                        </table>
                    </div>
                </section>
            </section>
        );
    }
}
