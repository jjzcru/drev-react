// tslint:disable-next-line
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Subscriber} from '@reactivex/rxjs';
import {isUndefined} from 'util';

import {LoginView} from './presentation/view/LoginView';
import {MainComponent} from './presentation/components/Main/MainComponent';
import {GetTokenUseCase} from './domain/interactors/GetTokenUseCase';

class App extends React.Component<any, any> {
    private getTokenUseCase: GetTokenUseCase;

    constructor(props: any) {
        super(props);
        this.state = {
            component: <div>loading</div>
        };
        this.getTokenUseCase = new GetTokenUseCase();
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    public componentDidMount() {
        let token;
        this.getTokenUseCase.execute(Subscriber.create(
            (result: any) => {
                token = result;
            },
            (err) => {
                console.log(err.message);
            },
            () => {
                let component: any;
                if (isUndefined(token)) {
                    component = <LoginView />;
                } else {
                    component = <MainComponent />;
                }

                this.setState({component: component});
            }));
    }

    render() {
        return (this.state.component);
    }
}

/*let isLogin = true;
 if (isLogin) {
 ReactDOM.render(
 <MainComponent />,
 document.getElementById('app')
 );
 } else {
 ReactDOM.render(
 <LoginView />,
 document.getElementById('app')
 );
 }*/
ReactDOM.render(<App />, document.getElementById('app'));


