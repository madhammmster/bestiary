import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import LoginForm from '../../components/FinalForm/forms/LoginForm/LoginForm';
import { showFader, hideFader } from '../../store/reducers/faderReducer';
import { withFirebase } from '../../firebase'

import './Login.scss';

class Login extends Component {

    handleSubmit = (values) => {
        const { firebase, history, showFader, hideFader } = this.props;
        const { email, password } = values;
        
        if (email && password) {
            showFader();

            firebase.signInWithEmailAndPassword(email, password)
                .then(() => {
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
            <div className='route login-route' >

                <div className='container-login-form'>
                    <LoginForm
                        onSubmit={this.handleSubmit}
                    />
                </div>

                <Container>
                    <Divider />
                    <div className='container-register-text'>
                        <span className='register-text'>Jeśli nie posiadasz konta </span>
                        <Link to='/register'>
                            <Button size='mini' type='submit' color='blue'>zarejestruj się</Button>
                        </Link>
                    </div>
                </Container>

            </div>
        );
    }
}

const mapDispatchToProps = {
    showFader,
    hideFader
}

export default withFirebase(
    connect(null, mapDispatchToProps)(Login)
);