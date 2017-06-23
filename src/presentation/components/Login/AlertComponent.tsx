import * as React from "react";
import SweetAlert from 'sweetalert-react';

export class AlertComponent extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = { show: props.show, message: props.message, title: props.title };
        this.closeAlert = this.closeAlert.bind(this);
    }
    closeAlert() {
        this.props.closeAlert();
    }
    render() {
        console.log(this.state);
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