import * as React from 'react';
import { UserContent } from './User/UserContent';

interface FooterProps {
    footerContent: string;
}

export class Content extends React.Component<any, undefined> {
    private content;

    constructor(props) {
        super(props);

        this.content = <UserContent usersLabel='Usuarios' filterLabel='Filtro' nameLabel='Nombre' lastNameLabel='Apellido' userLabel='Usuario' emailLabel='Correo' roleLabel='Rol' departmentLabel='Departamento' editLabel='Editar' deleteLabel='Borrar' addLabel='Agregar' />;
    }

    render() {
        return (
            <aside className='right-side'>
                {this.content}
                <Footer footerContent='Challenge accept' />
            </aside>
        );
    }
}

class Footer extends React.Component<FooterProps, undefined> {
    constructor(props: FooterProps) {
        super(props);
    }

    render() {
        return (
            <div className='footer-main'>
                {this.props.footerContent}
            </div>
        );
    }
}
