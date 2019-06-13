import React, {Component} from 'react';
import firebase from "firebase/";
import { Redirect } from 'react-router'

class AuthLogIn extends Component {
    state = {
        user: null
    };

    componentDidMount() {
        const ref = firebase.auth().onAuthStateChanged(user =>
            this.setState({
                user,
            }));

        this.setState({
            ref
        })
    }

    componentWillUnmount() {
        this.state.ref && this.state.ref();
    }

    render() {
        return this.state.user
            ? <Redirect to={'/'} />
            : this.props.children
    }
}

export default AuthLogIn;