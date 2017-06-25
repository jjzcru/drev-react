import * as React from 'react';
interface SidebarProps {
    nameLabel: string;
    greetingLabel: string;
}
export class Sidebar extends React.Component<SidebarProps, undefined> {
    constructor(props: SidebarProps) {
        super(props);
    }
    render() {
        return (
            <aside className='left-side sidebar-offcanvas'>
                <section className='sidebar'>
                    <div className='user-panel'>
                        <div className='pull-left image'>
                            <img src='/src/presentation/assets/img/challenge.jpg' className='img-circle' alt='User Image' />
                        </div>
                        <div className='pull-left info'>
                            <p>{this.props.greetingLabel}, {this.props.nameLabel}</p>
                        </div>
                    </div>
                    <ul className='sidebar-menu'>
                        <li className='active'>
                            <a href='users.html'>
                                <i className='fa fa-home'/> <span>Inicio</span>
                            </a>
                        </li>
                    </ul>
                </section>
            </aside>
        );
    }
}
