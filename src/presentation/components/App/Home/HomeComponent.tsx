import * as React from 'react';

export class HomeComponent extends React.Component<any, undefined>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div className='uk-grid' data-uk-grid='{gutter: 20}'>
            <div className='uk-width-1-10'>test</div>
            <div className='uk-width-9-10'>test</div>
        </div>;
    }
}