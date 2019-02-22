import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../../firebase';
import { setUser } from '../../store/reducers/userReducer';
import { showFader, hideFader } from '../../store/reducers/faderReducer';

const withAuthentication = Component => {

    class WithAuthentication extends React.Component {

        componentDidMount() {
            const { history, firebase, showFader, hideFader, setUser} = this.props;
            showFader();
            

            this.listener = firebase.auth.onAuthStateChanged((user) => {                
                setUser(user);
                hideFader();

                if (!user) {
                    history.push('/login');
                }
            });

        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return <Component {...this.props} />;
        }
    }

    const mapDispatchToProps = {
        setUser,
        showFader,
        hideFader
    }

    return withFirebase(withRouter(connect(null, mapDispatchToProps)(WithAuthentication)));
};

export default withAuthentication;