import * as React from 'react';

export class SidebarComponent extends React.Component<any, undefined> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return <div className='nav uk-hidden-small'>
            <div className='sidebar-avatar'/>
        </div>;
    }
}
