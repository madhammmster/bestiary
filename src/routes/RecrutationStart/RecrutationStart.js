import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Header, Icon } from 'semantic-ui-react';
import { withAuthentication } from '../../components/Session/Session';
import { showFader, hideFader } from '../../store/reducers/faderReducer';


import RecrutationStartForm from '../../components/FinalForm/forms/RecrutationStartForm/RecrutationStartForm';
import { startRecrutation, setCandidate} from '../../store/reducers/recrutationsReducer'

class RecrutationStart extends Component {

    startRecrutation = (values) => {
        const { setCandidate, history, hideFader, startRecrutation } = this.props;
        console.log(values);
        hideFader();
        startRecrutation();
        setCandidate(values);
        history.push('/');        

    }

    handleSubmit = (values) => {
        const { showFader } = this.props;

        showFader();
        this.startRecrutation(values);
    }

    render() {

        return (
            <div className='route start-recrutation-route' >
                <Container>
                    <Header as='h2'>
                        <Icon name='add' />
                        <Header.Content>
                            Rozpocznij rekrutacje
                            <Header.Subheader>Uzupełnij informacje o kandydacie</Header.Subheader>
                        </Header.Content>

                    </Header>

                    <RecrutationStartForm
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
    hideFader,
    startRecrutation,
    setCandidate
}


export default withRouter(withAuthentication(connect(mapStateToProps, mapDispatchToProps)(RecrutationStart)));