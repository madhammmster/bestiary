import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Icon, Container, Button } from 'semantic-ui-react';

import { withFirebase } from '../../firebase';
import { withAuthentication } from '../../components/Session/Session';

import './Questions.scss';

import QuestionsList from '../../components/QuestionsList/QuestionsList';
import CandidateSection from '../../components/CandidateSection/CandidateSection';

class Questions extends Component { 

    renderRecrutationButtons = () => {
        const { recrutationStarted } = this.props;
        return (
            <React.Fragment>                
                {recrutationStarted && <Link to='/recrutation-end'>
                    <Button size='tiny' color='red'>Zakończ rekrutacje</Button>
                </Link>}
            </React.Fragment>
        )
    }

    render() {
        const { user, recrutationStarted } = this.props;

        return (
            <div className='route main-route' >
                <Container>
                    <Header as='h2' className='route-header'>
                        <Icon name='list' />
                        <Header.Content>
                            Pytania
                            <Header.Subheader>W wygodny sposób odszukaj pytania na rekrutacje</Header.Subheader>
                        </Header.Content>
                        <div className='container-actions'>
                            {this.renderRecrutationButtons()}

                            {!recrutationStarted && <Link to='/add-question'>
                                <Button size='tiny' color='olive'>Dodaj pytanie</Button>
                            </Link>}

                        </div>
                    </Header>

                    {recrutationStarted && <CandidateSection />}

                    {user && <QuestionsList />}
                </Container>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        recrutationStarted: state.recrutations.started
    }
}

export default withAuthentication(withFirebase(connect(mapStateToProps)(Questions)));