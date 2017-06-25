// tslint:disable-next-line
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { LoginView } from './presentation/view/LoginView';
import { MainComponent } from './presentation/components/Main/MainComponent';
let  isLogin = true;
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
}
