import React, { Component } from 'react'
import routes from './routes'
import LandingView from '../landing/landingView'

import Navigation from '../navigation/navigation'
import Header from '../header/header'
import Review from '../review/review'
import UserChat from '../userChat/userChatView'
import CountryMessageBoardView from '../countryMessageBoard/countryMessageBoardView'

import { connect } from 'react-redux'
import ErrorComponent from '../applicationError/errorComponent'
import { Route, Redirect, Switch } from 'react-router-dom'

const loggedIn = true;
const countryIso = 'AFG';

const Login = () => <h1> Login </h1>

export default class AppCountryView extends Component {
    render() {
        return <Switch>
            <Route exact path="/"> {loggedIn ? <Redirect to={`/country/${countryIso}`} /> : <Login />} </Route>
            <Template>
                <Route path="/country/:countryIso" component={LandingView} />
            </Template>
        </Switch>

    }
}

const TemplateView = ({ children, commentsOpen }) =>
    <div className="app__root">
        <Navigation />
        <div className="fra-view__container">
            {children}
        </div>
        <Header />
        <Review />
        <UserChat />
        <CountryMessageBoardView />
        <ErrorComponent />
    </div>

const mapStateToProps = state => ({
    commentsOpen: !!state.review.openThread,
    navigationVisible: state.navigation.navigationVisible
})

const Template = connect(mapStateToProps)(TemplateView)
