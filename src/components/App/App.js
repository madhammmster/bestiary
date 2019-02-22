import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from "react-router-dom";
import Fader from '../Fader/Fader';
import Menu from '../Menu/Menu';
//routes
import Questions from '../../routes/Questions/Questions';
import Login from '../../routes/Login/Login';
import Page404 from '../../routes/404/404';
import Register from '../../routes/Register/Register';
import AddQuestion from '../../routes/AddQuestion/AddQuestion';
import EditQuestion from '../../routes/EditQuestion/EditQuestion';
import RecrutationStart from '../../routes/RecrutationStart/RecrutationStart';
import Recrutations from '../../routes/Recrutations/Recrutations';
//styles
import './App.scss';
//actions
import { startApp } from '../../store/reducers/appReducer';
import RecrutationEnd from '../../routes/RecrutationEnd/RecrutationEnd';
import RecrutationSummary from '../../routes/RecrutationSummary/RecrutationSummary';
import ImportExport from '../../routes/ImportExport/ImportExport';



class App extends Component {

  componentDidMount() {
    const { startApp } = this.props;
    
    startApp();
  }

  render() {
    return (
      <div className="App">
        <Menu />

        <Switch>
          <Route
            exact
            path='/'
            withAuthentication
            component={Questions}
          />

          <Route
            path='/login'
            component={Login}
          />

          <Route
            path='/register'
            component={Register}
          />

          <Route
            path='/add-question'
            component={AddQuestion}
          />

          <Route
            path='/edit-question'
            component={EditQuestion}
          />

          <Route
            path='/recrutation-start'
            component={RecrutationStart}
          />

          <Route
            path='/recrutation-end'
            component={RecrutationEnd}
          />

          <Route
            path='/recrutations'
            component={Recrutations}
          />

          <Route
            path='/recrutation-summary'
            component={RecrutationSummary}
          />

          <Route
            path='/import-export'
            component={ImportExport}
          />

          <Route
            component={Page404}
          />
        </Switch>

        <Fader />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    user: state.user.user
  }
}

const mapDispatchToProps = {
  startApp
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

