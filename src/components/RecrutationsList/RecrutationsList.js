import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader, Segment, Table, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../firebase';
import './RecrutationsList.scss'

import { setRecrutations, setCurrentRecrutation, setCandidate } from '../../store/reducers/recrutationsReducer';



class RecrutationsList extends Component {

    componentDidMount() {
        this.getRecrutations();
    }

    getRecrutations = () => {
        const { firebase } = this.props;


        firebase.database
            .collection('recrutations')
            .get()
            .then(this.handleQuerySnapshot);

        firebase.database
            .collection('recrutations')
            .onSnapshot(this.handleQuerySnapshot)

    }

    handleQuerySnapshot = (querySnapshot) => {
        const data = [];
        const { setRecrutations } = this.props;

        querySnapshot.forEach(function (doc) {
            const docData = doc.data();
            docData['id'] = doc.id;
            data.push(docData);
        });

        setRecrutations(data);
    }

    handleRowClick = (recrutation) => {
        const { setCurrentRecrutation, history, setCandidate } = this.props;

        setCurrentRecrutation(recrutation);

        setCandidate(recrutation.candidate);
        history.push('recrutation-summary')
    }

    getScoreIcon = (score) => {

        switch (score) {
            case 1:
                return (<Icon color='grey' name='minus' />);
            case 2:
                return (<Icon color='olive' name='check' />);
            default:
                return (<Icon color='red' name='ban' />)

        }
    }

    renderRecrutations = () => {
        const { recrutations } = this.props;

        return (
            <React.Fragment >
                <Table basic='very'>
                    <Table.Header>
                        <Table.Row >
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>Kandydat</Table.HeaderCell>
                            <Table.HeaderCell>Poziom</Table.HeaderCell>
                            <Table.HeaderCell>Data</Table.HeaderCell>
                            <Table.HeaderCell>Wynik</Table.HeaderCell>
                            <Table.HeaderCell>Podsumowanie</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {
                            recrutations.map((recrutation, index) => {
                                return (
                                    <Table.Row className='recrutaion-row' key={recrutation.id} onClick={() => { this.handleRowClick(recrutation) }}>
                                        <Table.Cell textAlign='right' width={1}>{index + 1}</Table.Cell>
                                        <Table.Cell>{recrutation.candidate.firstname} {recrutation.candidate.lastname}</Table.Cell>
                                        <Table.Cell width={1}>{recrutation.candidate.skill}</Table.Cell>
                                        <Table.Cell width={1}>{new Date(recrutation.date).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell width={1}>{this.getScoreIcon(recrutation.score)}</Table.Cell>
                                        <Table.Cell>{recrutation.summary}</Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }

                    </Table.Body>
                </Table>
                {!recrutations.length && <Segment>
                    Brak wyników
                </Segment>}
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
        const { recrutations } = this.props;

        return (
            <React.Fragment>
                {recrutations && this.renderRecrutations()}
                {!recrutations && this.renderLoader()}
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        recrutations: state.recrutations.recrutations
    }
}

const mapDispatchToProps = {
    setRecrutations,
    setCurrentRecrutation,
    setCandidate
}


export default withRouter(withFirebase(connect(mapStateToProps, mapDispatchToProps)(RecrutationsList)));
