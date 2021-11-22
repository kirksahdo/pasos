import React, { Component } from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import SplashScreen from '../screens/SplashScreen';
import BemVindo from './../screens/BemVindo'

import Firebase from '../config/firebase.config';

class Routes extends Component {

    state = {
        signed: false,
        loading: true,
        seenTutorial: false
    }

    componentDidMount() {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const user = Firebase.auth().currentUser;
                const database = Firebase.database();
                database.ref('Users').child(user.uid).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        let user = snapshot.val();
                        if (user.seenTutorial) {
                            this.setState({ seenTutorial: true, signed: true, loading: false })
                        }
                        else {
                            this.setState({ signed: true, seenTutorial: false, loading: false })
                        }
                    }
                })
            } else {
                this.setState({ signed: false, loading: false });
            }

        });
    }

    seeTutorial = () => {
        const user = Firebase.auth().currentUser;
        const database = Firebase.database();
        database.ref('Users').child(user.uid).child('seenTutorial').set(true).then(res => {
            this.setState({ seenTutorial: true });
        });
    }


    render() {
        if (this.state.loading) {
            return <SplashScreen />
        }
        if (!this.state.signed) {
            return <AuthRoutes />
        } else {
            if (this.state.seenTutorial) {
                return <AppRoutes />;
            }
            else {
                return <BemVindo seeTutorial={this.seeTutorial} />
            }
        }
    }


}

export default Routes;