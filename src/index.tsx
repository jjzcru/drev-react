import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { LoginView } from './presentation/view/LoginView';
import { AppComponent } from './presentation/components/App/AppComponent';
var isLogin = false;
if (isLogin) {
    ReactDOM.render(
        <AppComponent />,
        document.getElementById('app')
    );
} else {
    ReactDOM.render(
        <LoginView />,
        document.getElementById('app')
    );
}
