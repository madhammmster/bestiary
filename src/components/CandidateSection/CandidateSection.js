import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Icon } from 'semantic-ui-react'

class CandidateSection extends Component {

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

    render() {
        const { candidate: { firstname, lastname, skill } } = this.props;
        const { name, color } = this.icons[skill];

        return (
            <Segment>
                <Header as='h5'>
                    <Icon name={name} color={color} />
                    <Header.Content>{firstname} {lastname}</Header.Content>
                </Header>
            </Segment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        candidate: state.recrutations.candidate
    }
}


export default connect(mapStateToProps)(CandidateSection);
