import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Header, Icon } from 'semantic-ui-react';
import { withFirebase } from '../../firebase'
import { withAuthentication } from '../../components/Session/Session';
import { showFader, hideFader } from '../../store/reducers/faderReducer';
import { setCurrentQuestion } from '../../store/reducers/questionsReducer';



import QuestionForm from '../../components/FinalForm/forms/QuestionForm/QuestionForm';
// import './AddQuestion.scss';

class EditQuestion extends Component {

    editQuestion = (values) => {
        const { user, firebase, history, hideFader, setCurrentQuestion} = this.props;
        values['author'] = user.uid;

        const id = values.id;
        delete values.id;

        firebase.database
            .collection('questions').doc(id)
            .set(values)
            .then(() => {
                hideFader();
                setCurrentQuestion(null);
                history.push('/');
            })

    }

    handleSubmit = (values) => {
        const { showFader } = this.props;

        showFader();
        this.editQuestion(values);
    }

    render() {
        const { current } = this.props;        

        return (
            <div className='route document-route' >
                <Container>
                    <Header as='h2'>
                        <Icon name='edit' />
                        <Header.Content>
                            Edytuj pytanie
                            <Header.Subheader>Wyedytuj wszystkie wartości, które Ci nie odpowiadają</Header.Subheader>
                        </Header.Content>

                    </Header>

                    <QuestionForm
                        initialValues={current}
                        onSubmit={this.handleSubmit}
                    />

                </Container>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        current: state.questions.current
    }
}

const mapDispatchToProps = {
    showFader,
    hideFader,
    setCurrentQuestion
}


export default withFirebase(withRouter(withAuthentication(connect(mapStateToProps, mapDispatchToProps)(EditQuestion))));