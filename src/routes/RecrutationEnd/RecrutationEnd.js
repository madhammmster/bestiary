import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Header, Icon } from 'semantic-ui-react';
import { withFirebase } from '../../firebase'
import { withAuthentication } from '../../components/Session/Session';
import { showFader, hideFader } from '../../store/reducers/faderReducer';
import { endRecrutation, setCandidate } from '../../store/reducers/recrutationsReducer'
import RecrutationEndForm from '../../components/FinalForm/forms/RecrutationEndForm/RecrutationEndForm';

class RecrutationEnd extends Component {

    filterQuestions = (questions) => {
        return _.filter(questions, (question) => {
            if (!question.rating && !question.comment) {
                return false
            } else {
                return true;
            }


        })
    }

    endRecrutation = (values) => {
        const { user, firebase, history, hideFader, endRecrutation, questions, candidate } = this.props;
        debugger;
        values['author'] = user.uid;
        values['questions'] = this.filterQuestions(questions);
        values['candidate'] = candidate;
        const date = new Date();
        values['date'] = date.toString();
        const id = date.getTime().toString();

        firebase.database
            .collection('recrutations').doc(id)
            .set(values)
            .then(() => {
                hideFader();
                endRecrutation();
                history.push('/');
            })

    }

    handleSubmit = (values) => {
        const { showFader } = this.props;

        showFader();
        this.endRecrutation(values);
    }

    render() {

        return (
            <div className='route start-recrutation-route' >
                <Container>
                    <Header as='h2'>
                        <Icon name='add' />
                        <Header.Content>
                            Zakończ rekrutacje
                            <Header.Subheader>Podsumowanie rekrutacji</Header.Subheader>
                        </Header.Content>

                    </Header>

                    <RecrutationEndForm
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
        questions: state.questions.questions,
        candidate: state.recrutations.candidate

    }
}

const mapDispatchToProps = {
    showFader,
    hideFader,
    endRecrutation,
    setCandidate
}


export default withFirebase(withRouter(withAuthentication(connect(mapStateToProps, mapDispatchToProps)(RecrutationEnd))));