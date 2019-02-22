import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../firebase'
import _ from 'lodash';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';
import { setCurrentQuestion } from '../../store/reducers/questionsReducer';

class QuestionModal extends Component {

    handleClose = () => {
        const { setCurrentQuestion } = this.props;
        setCurrentQuestion(null);
    }

    handleEdit = () => {
        const { history } = this.props;

        history.push('/edit-question')
    }

    handleRemove = () => {
        const { firebase, current } = this.props;

        firebase.database
            .collection('questions')
            .doc(current.id)
            .delete()
            .then(() => {
                this.handleClose()
            });
    }

    render() {
        const { current, recrutationStarted } = this.props;

        if (!current) {
            return null;
        }

        return (
            <Modal
                open={!_.isNull(current)}
                onClose={this.handleClose}
            >
                <Modal.Header>{current.question}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header as='h5'>Opis</Header>
                        <p>{current.description}</p>

                        <Header as='h5'>Odpowiedz</Header>
                        <p>{current.answer}</p>

                        <Header as='h5'>Strona pomocnicza</Header>
                        <p>{current.website}</p>

                    </Modal.Description>
                </Modal.Content>
                {!recrutationStarted &&
                    <Modal.Actions>
                        <Button color='red' onClick={this.handleRemove}>
                            <Icon name='remove' /> Usuń
                    </Button>
                        <Button color='blue' onClick={this.handleEdit}>
                            <Icon name='edit' /> Edytuj
                    </Button>
                    </Modal.Actions>
                }
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        current: state.questions.current,
        recrutationStarted: state.recrutations.started
    }
}

const mapDispatchToProps = {
    setCurrentQuestion
}

export default withFirebase(withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionModal)));
