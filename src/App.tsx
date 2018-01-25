import * as React from 'react';
import './App.css';
import WeekView from './components/WeekView';
import ManageProjects from './components/ManageProjects';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StoreState } from './types/TimeTracking';
import { timeTracking } from './reducers/TimeTracking';
import logger from 'redux-logger';
import MonthView from './components/MonthView';

const store = createStore<StoreState>(timeTracking, applyMiddleware(logger));

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <ManageProjects />
                    <WeekView />
                    <MonthView />
                </div>
            </Provider>
        );
    }
}

export default App;