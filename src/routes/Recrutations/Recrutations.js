import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Container, Header, Button, Icon } from 'semantic-ui-react';
import { withAuthentication } from '../../components/Session/Session';
import { showFader, hideFader } from '../../store/reducers/faderReducer';

import { startRecrutation, setCandidate } from '../../store/reducers/recrutationsReducer'
import RecrutationsList from '../../components/RecrutationsList/RecrutationsList';

class Recrutations extends Component {

    render() {

        return (
            <div className='route start-recrutation-route' >
                <Container>
                    <Header as='h2' className='route-header'>
                        <Icon name='code' />
                        <Header.Content>
                            Rekrutacje
                            <Header.Subheader>Lista wszystkich przeprowadzonych rekrutacji</Header.Subheader>

                            <div className='container-actions'>
                                <Link to='/recrutation-start'>
                                    <Button size='tiny' color='olive'>Rozpocznij rekrutacje</Button>
                                </Link>
                            </div>
                        </Header.Content>

                    </Header>

                    <RecrutationsList />
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
    hideFader,
    startRecrutation,
    setCandidate
}


export default withRouter(withAuthentication(connect(mapStateToProps, mapDispatchToProps)(Recrutations)));