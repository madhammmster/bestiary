import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import { withFirebase } from '../../firebase'

import './Menu.scss'

class MenuComponent extends Component {

    menuItems = [
        { pathname: '/', text: 'Pytania', },
        { pathname: '/recrutations', text: 'Rekrutacje', disabledWhenRecrutationStarted: true },
        { pathname: '/import-export', text: 'Import / Export', disabledWhenRecrutationStarted: true },
    ]

    signOut = () => {
        const { firebase } = this.props;
        firebase.signOut();

    }

    handleLinkClick = (e, menuItem) => {
        const { recrutationStarted } = this.props;

        
        if (menuItem.disabledWhenRecrutationStarted && recrutationStarted) {
            e.preventDefault();
        }
    }

    renderMenuItems = () => {
        const { history: { location: { pathname } }, recrutationStarted } = this.props;

        return this.menuItems.map((menuItem) => {
            return (
                <NavLink
                    key={menuItem.pathname}
                    to={menuItem.pathname}
                    onClick={(e) => { this.handleLinkClick(e, menuItem) }}
                >
                    <Menu.Item
                        name={menuItem.pathname}
                        content={menuItem.text}
                        disabled={menuItem.disabledWhenRecrutationStarted && recrutationStarted}
                        active={menuItem.pathname === pathname}
                    />
                </NavLink>
            )
        })
    }

    render() {
        const { user } = this.props;

        if (!user) {
            return null;
        }

        return (
            <Container className='container-menu'>
                <Menu pointing secondary>
                    {this.renderMenuItems()}
                </Menu>
                <div className='container-sign-out-button'>
                    <Button size='tiny' onClick={this.signOut}>Wyloguj</Button>
                </div>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        recrutationStarted: state.recrutations.started,
    }
}



export default withFirebase(withRouter(connect(mapStateToProps)(MenuComponent)));