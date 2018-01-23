import * as React from 'react';
import './App.css';
import TimeTracking from './components/TimeTracking';
import ManageProjects from './components/ManageProjects';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StoreState } from './types/index';
import { timeTracking } from './reducers/TimeTracking';
import logger from 'redux-logger';
import Overview from './components/Overview';

const store = createStore<StoreState>(timeTracking, applyMiddleware(logger));

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <ManageProjects />
                    <TimeTracking />
                    <Overview />
                </div>
            </Provider>
        );
    }
}

export default App;