import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Header, Icon } from 'semantic-ui-react';
import { withFirebase } from '../../firebase'
import { withAuthentication } from '../../components/Session/Session';
import { showFader, hideFader } from '../../store/reducers/faderReducer';


import QuestionForm from '../../components/FinalForm/forms/QuestionForm/QuestionForm';
import './AddQuestion.scss';

class AddQuestion extends Component {

    addQuestion = (values) => {
        const { user, firebase, history, hideFader } = this.props;
        values['author'] = user.uid;       
        
        const id = new Date().getTime().toString();

        firebase.database            
            .collection('questions').doc(id)
            .set(values)
            .then(() => {
                hideFader();
                history.push('/');
            })

    }

    handleSubmit = (values) => {
        const { showFader } = this.props;

        showFader();
        this.addQuestion(values);
    }

    render() {

        return (
            <div className='route add-question-route' >
                <Container>
                    <Header as='h2'>
                        <Icon name='add' />
                        <Header.Content>
                            Dodaj pytanie
                            <Header.Subheader>Wprowadz nowe pytanie do bazy danych</Header.Subheader>
                        </Header.Content>

                    </Header>

                    <QuestionForm
                        onSubmit={this.handleSubmit}
                    />

                </Container>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = {
    showFader,
    hideFader
}


export default withFirebase(withRouter(withAuthentication(connect(mapStateToProps, mapDispatchToProps)(AddQuestion))));