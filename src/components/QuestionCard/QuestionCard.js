import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Grid, Segment, Header, Icon, Label, Popup, Form, Select, TextArea } from 'semantic-ui-react';
import config from '../../config'

import './QuestionCard.scss';

import { setCurrentQuestion, setQuestions } from '../../store/reducers/questionsReducer';

class QuestionCard extends Component {

    state = {
        rating: {}
    }

    icons = {
        junior: {
            name: 'child',
            color: 'blue'
        },
        regular: {
            name: 'heart',
            color: 'green'
        },
        senior: {
            name: 'blind',
            color: 'red'
        },
    }

    ratings = [
        { key: 0, value: 0, text: '-' },
        { key: 1, value: 1, text: 1, color: 'red' },
        { key: 2, value: 2, text: 2, color: 'orange' },
        { key: 3, value: 3, text: 3, color: 'yellow' },
        { key: 4, value: 4, text: 4, color: 'olive' },
        { key: 5, value: 5, text: 5, color: 'green' },
    ]

    setCurrentQuestion = () => {
        const { setCurrentQuestion, question } = this.props;
        setCurrentQuestion(question);
    }

    renderSkill = () => {
        const { question: { skill } } = this.props;

        const icon = this.icons[skill];

        return (
            <div className='container-skill'>
                <Popup
                    trigger={<Icon name={icon.name} color={icon.color} size='large' />}
                    content={skill.toUpperCase()}
                    size='tiny'
                />
            </div>
        )
    }

    renderCategories = () => {
        const { question: { categories } } = this.props;

        return (
            <div className='container-categories'>
                {categories.map((category) => {
                    return (
                        <Label key={category}>
                            {_.find(config.categories, { value: category }).label}
                        </Label>
                    )
                })}
            </div>
        )
    }

    handleSelectChange = (event, data) => {
        const { questions, question: { id }, setQuestions } = this.props;
        const { value } = data;
        const rating = _.find(this.ratings, { value });

        const questionsCopy = [...questions];
        const currentQuestion = _.find(questionsCopy, { id });

        currentQuestion['rating'] = rating;

        setQuestions(questionsCopy);

    }


    handleTextAreaClick = (event) => {
        event.stopPropagation();

    }

    handleTextAreaChange = (event, data) => {
        const { questions, question: { id }, setQuestions } = this.props;

        const questionsCopy = [...questions];
        const currentQuestion = _.find(questionsCopy, { id });

        currentQuestion['comment'] = data.value;

        setQuestions(questionsCopy);

    }

    renderRecrutationSection = () => {
        const { question } = this.props;

        const rating = question.rating ? question.rating : {};

        return (
            <Form >
                <Form.Field>
                    <Select
                        placeholder='Ocena'
                        onChange={this.handleSelectChange}
                        options={this.ratings}
                        value={rating.value}
                    />
                </Form.Field>
                <Form.Field>
                    <TextArea
                        placeholder='Uwagi'
                        value={question.comment}
                        onClick={this.handleTextAreaClick}
                        onChange={this.handleTextAreaChange}
                    />
                </Form.Field>
            </Form>
        )
    }

    renderSummarySection = () => {
        const { question } = this.props;

        if (!question.rating && !question.comment) {
            return null;
        }

        return (
            <Segment>
                {question.rating && <Header as='h5' >Ocena: {question.rating.value}</Header>}

                {question.comment && <Header as='h5' >Uwagi: {question.comment}</Header>}
            </Segment>
        )
    }

    render() {
        const { question, recrutationStarted, currentRecrutation } = this.props;

        const rating = question.rating ? question.rating : {};

        return (
            <Grid.Column>
                <Segment
                    className='question-card'
                    inverted={!!rating.color}
                    color={rating.color}
                    onClick={this.setCurrentQuestion}
                >
                    <Header className='question-header' size='small'>{question.question}</Header>
                    {!currentRecrutation && <p>{question.answer}</p>}
                    {this.renderCategories()}
                    {this.renderSkill()}
                    {recrutationStarted && this.renderRecrutationSection()}
                    {currentRecrutation && this.renderSummarySection()}
                </Segment>
            </Grid.Column>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        questions: state.questions.questions,
        recrutationStarted: state.recrutations.started,
        currentRecrutation: Boolean(state.recrutations.current)
    }
}

const mapDispatchToProps = {
    setCurrentQuestion,
    setQuestions
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
