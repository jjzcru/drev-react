import * as React from "react";
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.

export class SidebarComponent extends React.Component<any, undefined>{
    constructor(props: any){
        super(props);
    }
    render() {  
        return <div className="nav uk-hidden-small">
            <div className="sidebar-avatar"></div>
        </div>;
    }
}