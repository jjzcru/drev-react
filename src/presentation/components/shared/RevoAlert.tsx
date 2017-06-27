import * as React from 'react';
import SweetAlert from 'sweetalert-react';

interface AlertProps {
    show: boolean;
    title: string;
    message: string;
    closeAlert: any;
}

export class RevoAlert extends React.Component<AlertProps, undefined> {
    constructor(props) {
        super(props);
        this.closeAlert = this.closeAlert.bind(this);
    }

    private closeAlert() {
        this.props.closeAlert();
    }

    public render() {
        return (
            <div>
                <SweetAlert
                    show={this.props.show}
                    title={this.props.title}
                    text={this.props.message}
                    onConfirm={this.closeAlert}
                />
            </div>
        );
    }
}
