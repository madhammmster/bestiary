import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from '../../firebase';
import _ from 'lodash';

import { setQuestions } from '../../store/reducers/questionsReducer';
import { Dimmer, Loader, Segment, Grid } from 'semantic-ui-react';
import QuestionCard from '../QuestionCard/QuestionCard'
import FiltersForm from '../FinalForm/forms/FiltersForm/FiltersForm';
import QuestionModal from '../QuestionModal/QuestionModal';


class QuestionsList extends Component {

    componentDidMount() {
        this.getQuestions();

    }

    getQuestions = () => {
        const { firebase } = this.props;


        firebase.database
            .collection('questions')
            .get()
            .then(this.handleQuerySnapshot);

        firebase.database
            .collection('questions')
            .onSnapshot(this.handleQuerySnapshot)

    }

    handleQuerySnapshot = (querySnapshot) => {
        const data = [];
        const { setQuestions } = this.props;

        querySnapshot.forEach(function (doc) {
            const docData = doc.data();
            docData['id'] = doc.id;
            data.push(docData);
        });

        setQuestions(data);
    }

    filterByCategories = (questions) => {
        const { filters } = this.props;

        if (_.isEmpty(filters.categories)) {
            return questions;
        } else {
            return _.filter(questions, (question) => {
                let isMatch = false;

                question.categories.forEach((category) => {
                    if (_.includes(filters.categories, category)) {
                        isMatch = true;
                    }
                })

                return isMatch;
            });
        }
    }

    filterBySkills = (questions) => {
        const { filters } = this.props;

        if (_.isEmpty(filters.skills)) {
            return questions;
        } else {
            return _.filter(questions, (question) => {
                return _.includes(filters.skills, question.skill)
            });
        }
    }

    filterQuestions = () => {
        const { questions, filters } = this.props;

        if (!filters) {
            return questions;
        } else {
            return this.filterBySkills(this.filterByCategories(questions))
        }
    }

    renderQuestions = () => {
        const filteredQuestions = this.filterQuestions()

        return (
            <React.Fragment>
                <Grid columns={3}>
                    {filteredQuestions.map((question, index) => {
                        return (
                            <QuestionCard
                                question={question}
                                key={question.id}
                            />
                        )
                    })}
                </Grid>
                {!filteredQuestions.length &&
                    <Segment style={{marginTop: '2rem'}}>
                        Brak wyników
                    </Segment>
                }
            </React.Fragment>
        )
    }

    renderLoader = () => {
        return (
            <Segment style={{ height: '150px' }}>
                <Dimmer active inverted>
                    <Loader inverted />
                </Dimmer>
            </Segment>
        )
    }

    render() {
        const { questions } = this.props;

        return (
            <React.Fragment>
                <FiltersForm />
                {questions && this.renderQuestions()}
                {!questions && this.renderLoader()}
                <QuestionModal />
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        questions: state.questions.questions,
        filters: state.questions.filters
    }
}

const mapDispatchToProps = {
    setQuestions
}


export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(QuestionsList));
