import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Profile from './pages/Profile';
import Login from './components/Login';
import getOktaConfig from "./oktaConfig";
import Home from './pages/Home';
import Header from './components/header'
import Footer from './components/footer'
import OptionScreener from './pages/OptionScreener'
import Disclaimer from './components/disclaimer';
import StrategyScreener from './pages/StrategyScreener';
import SingleTrade from './pages/SingleTrade';
import TradeComposer from './pages/TradeComposer';

export default withRouter(class AppWithRouterAccess extends Component {
    constructor(props) {
        super(props);
        this.onAuthRequired = this.onAuthRequired.bind(this);
    }

    onAuthRequired() {
        this.props.history.push('/signin');
    }

    render() {
        return (
            <body class="d-flex flex-column min-vh-100">
                <Security  {...(getOktaConfig().oidc)} onAuthRequired={this.onAuthRequired} >
                    <Header></Header>
                    <main role="main" className="mb-2">
                        <Switch>
                            <Route path='/' exact={true} component={Home} />
                            <Route path='/option-screener' exact={true} component={OptionScreener} />
                            <Route path='/strategy-screener' exact={true} component={StrategyScreener} />
                            <Route path='/t/:tradeId' exact={true} component={SingleTrade} />
                            <Route path='/trade-composer' exact={true} component={TradeComposer} />
                            <SecureRoute path='/profile' component={Profile} />
                            <Route path="/disclaimer" component={Disclaimer}></Route>
                            <Route path='/signin' component={Login} />
                            <Route path='/signin/register' component={Login} />
                            <Route path='/callback' component={LoginCallback} />
                        </Switch>
                    </main>
                    <Footer class="mt-auto"></Footer>
                </Security>
            </body>
        );
    }
});