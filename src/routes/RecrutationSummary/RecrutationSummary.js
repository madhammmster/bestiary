import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Header, Icon, Grid, Segment } from 'semantic-ui-react';
import { withAuthentication } from '../../components/Session/Session';
import { showFader, hideFader } from '../../store/reducers/faderReducer';
import CandidateSection from '../../components/CandidateSection/CandidateSection'
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import { setCurrentRecrutation } from '../../store/reducers/recrutationsReducer';

class RecrutationSummary extends Component {

    constructor(props) {
        super(props);

        const { recrutation, history } = this.props;

        if (!recrutation) {
            history.push('/recrutations')
        }
    }

    componentWillUnmount() {
        this.props.setCurrentRecrutation(null);
    }

    renderQuestions = () => {
        const { recrutation } = this.props;

        return (
            <Grid columns={3}>
                {recrutation.questions.map((question, index) => {
                    return (
                        <QuestionCard
                            question={question}
                            key={question.id}
                        />
                    )
                })}
            </Grid>
        )
    }

    renderRecrutationSummary = () => {
        const { recrutation } = this.props;

        return (
            <Segment>
                {recrutation.summary}
            </Segment>
        )
    }

    render() {


        const { recrutation } = this.props;

        if (!recrutation) {
            return null;
        }

        return (
            <div className='route recrutation-summary-route' >
                <Container>
                    <Header as='h2'>
                        <Icon name='code' />
                        <Header.Content>
                            Podsumowanie rekrutacji
                            <Header.Subheader>Wylistowane wszystkie pytania i uwagi</Header.Subheader>
                        </Header.Content>

                    </Header>

                    {recrutation.candidate && <CandidateSection />}

                    {this.renderRecrutationSummary()}

                    {recrutation.questions && this.renderQuestions()}

                </Container>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        recrutation: state.recrutations.current
    }
}

const mapDispatchToProps = {
    showFader,
    hideFader,
    setCurrentRecrutation
}


export default withRouter(withAuthentication(connect(mapStateToProps, mapDispatchToProps)(RecrutationSummary)));