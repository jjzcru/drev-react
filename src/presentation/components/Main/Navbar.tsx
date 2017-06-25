import * as React from 'react';

interface NavbarProps {
    nameLabel: string;
    accountLabel?: string;
    profileLabel?: string;
    logoutLabel?: string;

    onClickProfile?: any;
    onClickLogout?: any;
    onClickHome?: any;
}

export class Navbar extends React.Component<NavbarProps, undefined> {
    private nameLabel: string;
    private accountLabel: string;
    private profileLabel: string;
    private logoutLabel: string;

    constructor(props: NavbarProps) {
        super(props);

        this.nameLabel = props.nameLabel;

        this.accountLabel = 'Account';
        if (props.accountLabel) {
            this.accountLabel = props.accountLabel;
        }

        this.profileLabel = 'Profile';
        if (props.profileLabel) {
            this.profileLabel = props.profileLabel;
        }

        this.logoutLabel = 'Log out';
        if (props.logoutLabel) {
            this.logoutLabel = props.logoutLabel;
        }

        this.onClickProfile = this.onClickProfile.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
        this.onClickHome = this.onClickHome.bind(this);
    }

    private onClickProfile(event: any) {
        event.preventDefault();
        this.props.onClickProfile();
    }

    private onClickLogout(event: any) {
        event.preventDefault();
        this.props.onClickLogout();
    }

    private onClickHome(event: any) {
        event.preventDefault();
        this.props.onClickHome();
    }

    render() {
        return <header className='header'>
            <nav className='navbar navbar-static-top' role='navigation'>
                <a href='#' className='navbar-btn sidebar-toggle' data-toggle='offcanvas' role='button'>
                    <span className='sr-only'>Toggle navigation</span>
                    <span className='icon-bar'/>
                    <span className='icon-bar'/>
                    <span className='icon-bar'/>
                </a>
                <div className='navbar-right'>
                    <ul className='nav navbar-nav'>
                        <li className='dropdown user user-menu'>
                            <a href='#' className='dropdown-toggle' data-toggle='dropdown'>
                                <i className='fa fa-user'/>
                                <span> {this.nameLabel} <i className='caret'/></span>
                            </a>
                            <ul className='dropdown-menu dropdown-custom dropdown-menu-right'>
                                <li className='dropdown-header text-center'>{this.accountLabel}</li>
                                <li>
                                    <a href='#'>
                                        <i className='fa fa-user fa-fw pull-right'/> {this.profileLabel}
                                    </a>
                                    <a href='#'>
                                        <i className='fa fa-ban fa-fw pull-right'/> {this.logoutLabel}
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>;
    }
}
