import * as React from 'react';
import { SidebarComponent } from './SidebarComponent';
import { HomeComponent } from './Home/HomeComponent';
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.

export class AppComponent extends React.Component<any, undefined>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div style={{ position: 'relative', height: '100%' }}>
            <SidebarComponent />
            <div className='main-content container-fluid'>
                <HomeComponent />
            </div>
        </div>;
    }
}