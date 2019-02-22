import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { Container, Header, Icon, Button, Divider } from 'semantic-ui-react';

import { withAuthentication } from '../../components/Session/Session';
import { withFirebase } from '../../firebase';

import ImportQuestionsForm from '../../components/FinalForm/forms/ImportQuestionsForm/ImportQuestionsForm'

import { showFader, hideFader } from '../../store/reducers/faderReducer'

class ImportExport extends Component {

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    downloadQuestions = () => {
        const { questions } = this.props;

        const questionsCopy = _.cloneDeep(questions);

        questionsCopy.forEach((question) => {
            delete question.id;
        })

        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questionsCopy));
        let downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "questions.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    handleSubmit = ({ json }) => {
        const { firebase, questions, showFader, hideFader } = this.props;
        showFader();
                
        questions.forEach((question) => {
            console.log(question);
            firebase.database
                .collection('questions')
                .doc(question.id)
                .delete()
        })
        
        const jsonQuestions = JSON.parse(json);

        jsonQuestions.forEach((question, index) => {
            const id = new Date().getTime() + index.toString();

            firebase.database
                .collection('questions').doc(id)
                .set(question)
                .then(() => {
                    if (index === jsonQuestions.length - 1) {
                        hideFader()
                    }
                })
        });
    }

    render() {
        return (
            <div className='route import-export-route' >
                <Container>
                    <Header as='h2' className='route-header'>
                        <Icon name='database' />
                        <Header.Content>
                            Import / Export
                            <Header.Subheader>Zaimportuj lub wyeksportuj pytania z bazy </Header.Subheader>
                        </Header.Content>
                    </Header>

                    <Button color='olive' size='tiny' onClick={this.downloadQuestions} >Wyeksportuj pytania</Button>

                    <Divider />

                    <ImportQuestionsForm
                        onSubmit={this.handleSubmit}
                    />

                </Container>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        questions: state.questions.questions
    }
}

const mapDispatchToProps = {
    showFader,
    hideFader
}



export default withFirebase(withAuthentication(connect(mapStateToProps, mapDispatchToProps)(ImportExport)));