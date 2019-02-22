import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Fader extends Component {
    render() {
        return (
            <div className='container-fader'>
                <Dimmer active={this.props.isVisible} >
                    <Loader>Czekaj</Loader>
                </Dimmer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isVisible: state.fader.isVisible
    }
}

export default connect(mapStateToProps)(Fader);
