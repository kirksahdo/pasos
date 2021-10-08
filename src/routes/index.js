import React, { Component } from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import Firebase from '../config/firebase.config';

class Routes extends Component {

    state = {
        signed: false
    }


    async getAuth() {
        const auth = Firebase.auth()
        console.log(await auth.currentUser)
        if (auth) {
            return true
        }
        return false
    }


    render() {

        this.state.signed = this.getAuth()
        if (this.state.signed) {
            return <AuthRoutes login={() => this.setState({ signed: true })} />
        } else {
            return <AppRoutes />;
        }
    }


}

export default Routes;