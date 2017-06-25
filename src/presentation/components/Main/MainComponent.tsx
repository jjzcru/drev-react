import * as React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import {Content} from './Content';

export class MainComponent extends React.Component<any, undefined> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar
                    nameLabel='Juan Perez'
                    accountLabel='Cuenta'
                    profileLabel='Perfil'
                    logoutLabel='Cerrar sesión' />
                <div className='wrapper row-offcanvas row-offcanvas-left'>
                    <Sidebar
                        nameLabel='Pepe'
                        greetingLabel='Hey' />
                    <Content />
                </div>
            </div>
        );
    }
}
