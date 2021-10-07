import React, {Component} from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

class Routes extends Component{

    state = {
        signed: false
    }

    
    render(){
        if(!this.state.signed){
            return <AuthRoutes login = {() => this.setState({signed: true})} />
        }else{
            return <AppRoutes />;
        }
    }
    

}

export default Routes;