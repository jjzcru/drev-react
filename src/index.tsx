import * as React from "react";
import * as ReactDOM from "react-dom";

import { HelloComponent } from "./presentation/components/HelloComponent";
import { LoginComponent } from "./presentation/components/Login/LoginComponent";
import { AppComponent } from "./presentation/components/App/AppComponent";
/*ReactDOM.render(
    <HelloComponent compiler="TypeScript" framework="React123" />,
    document.getElementById("example")
);*/
var isLogin = false;
if(isLogin){
    ReactDOM.render(
        <AppComponent/>,
        document.getElementById("app")
    );
    /*ReactDOM.render(
    <HelloComponent compiler="TypeScript" framework="React123"/>,
        document.getElementById("app")
    );*/
}
else{
    ReactDOM.render(
        <LoginComponent/>,
        document.getElementById("app")
    );
}
