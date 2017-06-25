import * as React from 'react';
interface FooterProps {
    footerContent: string;
}
export class Footer extends React.Component<FooterProps, undefined> {
    constructor(props: FooterProps) {
        super(props);
    }

    render() {
        return(
            <div className='footer-main'>
                {this.props.footerContent}
            </div>
        );
    }
}
