import * as React from 'react';
import * as _ from 'lodash';
import { UserModel } from '../../../model/UserModel';
import { AddUserUseCase } from '../../../../domain/interactors/AddUserUseCase';
import { UserModelDataMapper } from '../../../model/mapper/UserModelDataMapper';
import { Subscriber } from '@reactivex/rxjs';
import { GetUsersUseCase } from '../../../../domain/interactors/GetUsersUseCase';
import { DeleteUserUseCase } from '../../../../domain/interactors/DeleteUserUseCase';
import { EditUserUseCase } from '../../../../domain/interactors/EditUserUseCase';

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

    private getUsersUseCase: GetUsersUseCase;
    private addUserUseCase: AddUserUseCase;
    private editUserUseCase: EditUserUseCase;
    private deleteUserUseCase: DeleteUserUseCase;


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

        this.state = {
            users: [],
            userModal: undefined,
            filterInput: '',
            selectedUser: undefined
        };

        this.getUsersUseCase = new GetUsersUseCase();
        this.addUserUseCase = new AddUserUseCase();
        this.editUserUseCase = new EditUserUseCase();
        this.deleteUserUseCase = new DeleteUserUseCase();

        this.getUsers = this.getUsers.bind(this);
        this.onEditUser = this.onEditUser.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onSaveUser = this.onSaveUser.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    // tslint:disable-next-line
    private componentDidMount() {
        this.getUsers();
    }

    private getUsers() {
        let users = [];
        this.getUsersUseCase.execute(Subscriber.create(
            (user: any) => {
                users.push(UserModelDataMapper.convert(user));
            },
            (err) => {
                console.log(err);
            },
            () => {
                this.users = users;
                this.setState({ users: users });
            }));
    }

    private onSaveUser(userModel, action) {
        if (action === 'add') {
            let newUser;
            this.addUserUseCase.setUser(UserModelDataMapper.transform(userModel));
            this.addUserUseCase.execute(Subscriber.create(
                (user: any) => {
                    newUser = UserModelDataMapper.convert(user);
                },
                (err) => {
                    console.log(err.message);
                },
                () => {
                    this.users.push(newUser);
                    this.setState({ users: this.users, filterInput: '' });
                }));
        } else if (action === 'edit') {
            this.setState({ selectedUser: userModel });
            this.editUserUseCase.setUser(userModel.getUserID(), UserModelDataMapper.transform(userModel));
            this.editUserUseCase.execute(Subscriber.create(
                () => {
                },
                (err) => {
                    console.log(err.message);
                },
                () => {
                    let userIndex = _.findIndex(this.users, { 'UserID': userModel.getUserID() });
                    this.users[userIndex] = userModel;
                    this.setState({ users: this.users, filterInput: '' });
                }));
        } else {
            console.log('Invalid action');
        }

    }

    private onCancel() {
        this.setState({ userModal: undefined });
    }

    private onEditUser(index: number) {
        let selectedUser = this.state.users[index];
        this.setState({ selectedUser: selectedUser });
    }

    private onDeleteUser(index: number) {
        let UserID = this.state.users[index].getUserID();
        this.deleteUserUseCase.setUserID(UserID);
        this.deleteUserUseCase.execute(Subscriber.create(
            () => {
            },
            (err) => {
                console.log(err.message);
            },
            () => {
                this.users.splice(_.findIndex(this.users, { 'UserID': UserID }), 1);
                this.setState({ users: this.users, filterInput: '' });
            }));
    }

    private onFilterChange(event) {
        let filterInput = event.target.value;
        this.setState({ filterInput: filterInput });
        if (filterInput.trim() === '') {
            this.setState({ users: this.users });
        } else {
            let filteredUsers = this.users.filter((user: UserModel) => {
                if (user.getName().includes(filterInput)) {
                    return true;
                }
                ;
                if (user.getLastName().includes(filterInput)) {
                    return true;
                }
                ;
                if (user.getUsername().includes(filterInput)) {
                    return true;
                }
                ;
                if (user.getEmail().includes(filterInput)) {
                    return true;
                }
                ;
                if (user.getRole().includes(filterInput)) {
                    return true;
                }
                ;
                if (user.getDepartment().includes(filterInput)) {
                    return true;
                }
                ;

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
                        <input className='form-control' type='text' value={this.state.filterInput}
                            onChange={this.onFilterChange}
                            placeholder={this.filterLabel} />
                    </div>
                </div>
                <br />
                <section className='panel'>
                    <header className='panel-heading'> {this.usersLabel}
                        <button className='btn btn-xs btn-success pull-right' data-toggle='modal'
                            data-target='#addUserModal'>
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
                <AddUserModal
                    modalTitle={'Agregar usuario'}
                    userModel={new UserModel()}
                    onSave={this.onSaveUser}
                    onCancel={this.onCancel} />
                <EditUserModal
                    modalTitle={'Editar usuario'}
                    userModel={this.state.selectedUser}
                    onSave={this.onSaveUser}
                    onCancel={this.onCancel} />
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
                        <button className='btn btn-sm btn-warning' data-id={index} onClick={this.onUserEdit}
                            data-toggle='modal' data-target='#editUserModal'>
                            <i className='fa fa-pencil' />
                        </button>
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

interface UserModalProps {
    modalTitle: string;
    userModel: UserModel;

    nameLabel?: string;
    lastNameLabel?: string;
    usernameLabel?: string;
    emailLabel?: string;
    roleLabel?: string;
    departmentLabel?: string;
    cancelButtonLabel?: string;
    saveButtonLabel?: string;

    onSave: any;
    onCancel: any;
}

class AddUserModal extends React.Component<UserModalProps, any> {
    private modalTitle: string;

    private nameLabel?: string;
    private lastNameLabel?: string;
    private usernameLabel?: string;
    private emailLabel?: string;
    private roleLabel?: string;
    private departmentLabel?: string;
    private cancelButtonLabel?: string;
    private saveButtonLabel?: string;


    constructor(props: UserModalProps) {
        super(props);

        this.modalTitle = this.props.modalTitle;
        this.state = {
            name: '',
            lastName: '',
            username: '',
            email: '',
            role: '',
            department: ''
        };

        this.nameLabel = this.props.nameLabel || 'Name';
        this.lastNameLabel = this.props.lastNameLabel || 'Last Name';
        this.usernameLabel = this.props.usernameLabel || 'Username';
        this.emailLabel = this.props.emailLabel || 'Email';
        this.roleLabel = this.props.roleLabel || 'Role';
        this.departmentLabel = this.props.departmentLabel || 'Department';
        this.cancelButtonLabel = this.props.cancelButtonLabel || 'Cancel';
        this.saveButtonLabel = this.props.saveButtonLabel || 'Save';

        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    private onSave(event) {
        event.preventDefault();

        let userModel = new UserModel();
        userModel.setName(this.state.name);
        userModel.setLastName(this.state.lastName);
        userModel.setUsername(this.state.username);
        userModel.setEmail(this.state.email);
        userModel.setRole(this.state.role);
        userModel.setDepartment(this.state.department);

        this.setState({
            name: '',
            lastName: '',
            username: '',
            email: '',
            role: '',
            department: ''
        });

        this.props.onSave(userModel, 'add');
    }

    private onCancel(event) {
        event.preventDefault();
        this.props.onCancel();
    }

    render() {
        return (
            <div id='addUserModal' className='modal fade' role='dialog' aria-labelledby='myModalLabel'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span
                                aria-hidden='true'>&times;</span></button>
                            <h4 className='modal-title' id='myModalLabel'>{this.modalTitle}</h4>
                        </div>
                        <div className='modal-body'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <form id='addUserForm' onSubmit={this.onSave}>
                                        <label>{this.nameLabel}:</label>
                                        <input type='text' value={this.state.name} onChange={(e: any) => this.setState({ name: e.target.value })}
                                            className='form-control' required />
                                        <br />
                                        <label>{this.lastNameLabel}:</label>
                                        <input type='text' value={this.state.lastName} onChange={(e: any) => this.setState({ lastName: e.target.value })}
                                            className='form-control' required />
                                        <br />
                                        <label>{this.usernameLabel}:</label>
                                        <input type='text' className='form-control' value={this.state.username}
                                            onChange={(e: any) => this.setState({ username: e.target.value })} required />
                                        <br />
                                        <label>{this.emailLabel}:</label>
                                        <input type='email' className='form-control' value={this.state.email}
                                            onChange={(e: any) => this.setState({ email: e.target.value })} required />
                                        <br />
                                        <label>{this.roleLabel}:</label>
                                        <select className='form-control' value={this.state.role}
                                            onChange={(e: any) => this.setState({ role: e.target.value })} required>
                                            <option value=''>Seleccione un usuario:</option>
                                            <option value='user'>Usuario</option>
                                            <option value='admin'>Administrador</option>
                                            <option value='chief'>Jefe</option>
                                        </select>
                                        <br />
                                        <label>{this.departmentLabel}:</label>
                                        <select className='form-control' value={this.state.department}
                                            onChange={(e: any) => this.setState({ department: e.target.value })} required>
                                            <option value=''>Seleccione un Departamento</option>
                                            <option value='production'>Produccion</option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-default'
                                data-dismiss='modal'>{this.cancelButtonLabel}</button>
                            <button type='submit' className='btn btn-success'
                                form='addUserForm'>{this.saveButtonLabel}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class EditUserModal extends React.Component<UserModalProps, any> {
    private modalTitle: string;

    private nameLabel?: string;
    private lastNameLabel?: string;
    private usernameLabel?: string;
    private emailLabel?: string;
    private roleLabel?: string;
    private departmentLabel?: string;
    private cancelButtonLabel?: string;
    private saveButtonLabel?: string;

    constructor(props: UserModalProps) {
        super(props);

        this.modalTitle = this.props.modalTitle;

        this.nameLabel = this.props.nameLabel || 'Name';
        this.lastNameLabel = this.props.lastNameLabel || 'Last Name';
        this.usernameLabel = this.props.usernameLabel || 'Username';
        this.emailLabel = this.props.emailLabel || 'Email';
        this.roleLabel = this.props.roleLabel || 'Role';
        this.departmentLabel = this.props.departmentLabel || 'Department';
        this.cancelButtonLabel = this.props.cancelButtonLabel || 'Cancel';
        this.saveButtonLabel = this.props.saveButtonLabel || 'Save';

        this.state = {
            UserID: '',
            name: '',
            lastName: '',
            username: '',
            email: '',
            role: '',
            department: ''
        };

        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    // tslint:disable-next-line
    private shouldComponentUpdate(newProps: UserModalProps) {
        let userModel: UserModel = newProps.userModel;
        if (userModel !== undefined) {
            return true;
        }
        return false;
    }

    // tslint:disable-next-line
    private componentWillReceiveProps(newProps) {
        let userModel: UserModel = newProps.userModel;
        if (userModel !== undefined) {
            this.setState({
                UserID: userModel.getUserID(),
                name: userModel.getName(),
                lastName: userModel.getLastName(),
                username: userModel.getUsername(),
                email: userModel.getEmail(),
                role: userModel.getRole(),
                department: userModel.getDepartment()
            });
        }
    }

    private onSave(event) {
        event.preventDefault();
        let userModel = new UserModel();
        userModel.setUserID(this.state.UserID);
        userModel.setName(this.state.name);
        userModel.setLastName(this.state.lastName);
        userModel.setUsername(this.state.username);
        userModel.setEmail(this.state.email);
        userModel.setRole(this.state.role);
        userModel.setDepartment(this.state.department);

        this.props.onSave(userModel, 'edit');
    }

    private onCancel(event) {
        event.preventDefault();
        this.props.onCancel();
    }

    render() {
        return (
            <div id='editUserModal' className='modal fade' role='dialog' aria-labelledby='myModalLabel'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span
                                aria-hidden='true'>&times;</span></button>
                            <h4 className='modal-title' id='myModalLabel'>{this.modalTitle}</h4>
                        </div>
                        <div className='modal-body'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <form id='editUserForm' onSubmit={this.onSave}>
                                        <label>{this.nameLabel}:</label>
                                        <input type='text' value={this.state.name} onChange={(e: any) => this.setState({ name: e.target.value })}
                                            className='form-control' required />
                                        <br />
                                        <label>{this.lastNameLabel}:</label>
                                        <input type='text' value={this.state.lastName} onChange={(e: any) => this.setState({ lastName: e.target.value })}
                                            className='form-control' required />
                                        <br />
                                        <label>{this.usernameLabel}:</label>
                                        <input type='text' className='form-control' value={this.state.username}
                                            onChange={(e: any) => this.setState({ username: e.target.value })} required />
                                        <br />
                                        <label>{this.emailLabel}:</label>
                                        <input type='email' className='form-control' value={this.state.email}
                                            onChange={(e: any) => this.setState({ email: e.target.value })} required />
                                        <br />
                                        <label>{this.roleLabel}:</label>
                                        <select className='form-control' value={this.state.role}
                                            onChange={(e: any) => this.setState({ role: e.target.value })} required>
                                            <option value=''>Seleccione un usuario:</option>
                                            <option value='user'>Usuario</option>
                                            <option value='admin'>Administrador</option>
                                            <option value='chief'>Jefe</option>
                                        </select>
                                        <br />
                                        <label>{this.departmentLabel}:</label>
                                        <select className='form-control' value={this.state.department}
                                            onChange={(e: any) => this.setState({ department: e.target.value })} required>
                                            <option value=''>Seleccione un Departamento</option>
                                            <option value='production'>Produccion</option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-default'
                                data-dismiss='modal'>{this.cancelButtonLabel}</button>
                            <button type='submit' className='btn btn-success'
                                form='editUserForm'>{this.saveButtonLabel}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
