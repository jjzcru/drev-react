import * as React from 'react';
import {Footer} from './Footer';
import {UserContent} from './User/UserContent';

export class Content extends React.Component<any, undefined> {
    constructor(props) {
        super(props);
    }

    render() {
        return <aside className='right-side'>
            <UserContent
                usersLabel='Usuarios'
                filterLabel='Filtro'
                nameLabel='Nombre'
                lastNameLabel='Apellido'
                userLabel='Usuario'
                emailLabel='Correo'
                roleLabel='Rol'
                departmentLabel='Departamento'
                editLabel='Editar'
                deleteLabel='Borrar'
                addLabel='Agregar'/>
            <Footer footerContent='Challenge accepted'/>
        </aside>;
    }
}
