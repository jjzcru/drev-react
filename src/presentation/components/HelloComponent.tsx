import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class HelloComponent extends React.Component<HelloProps, undefined> {
    render() {
        console.log(this.props.compiler);
        return <h1>Hell from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}