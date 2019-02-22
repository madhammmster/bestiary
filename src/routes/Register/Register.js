import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../../components/FinalForm/forms/RegisterForm/RegisterForm';
import { showFader, hideFader } from '../../store/reducers/faderReducer';
import { withFirebase } from '../../firebase'

import './Register.scss';

class Register extends Component {

    handleSubmit = (values) => {
        const { firebase, history, showFader, hideFader } = this.props;
        const { email, password, secondPassword } = values;        

        if (email && password && secondPassword && (password === secondPassword)) {
            showFader();

            firebase
                .createUserWithEmailAndPassword(email, password)
                .then((data) => {
                    const {user /*, additionalUserInfo */} = data;

                    firebase.database.collection('users').doc(user.uid).set({
                        email
                    });
                    
                    hideFader();
                    history.push('/');
                })
                .catch((error) => {
                    hideFader();
                    console.log(error);
                });
        }

    }

    render() {
        return (
            <div className='route register-route' >

                <div className='container-register-form'>
                    <LoginForm
                        onSubmit={this.handleSubmit}
                    />
                </div>

            </div>
        );
    }
}


const mapDispatchToProps = {
    showFader,
    hideFader
}


export default withFirebase(
    connect(null, mapDispatchToProps)(Register)
);