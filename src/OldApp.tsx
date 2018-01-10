import * as React from 'react';
import './App.css';
import AddContact from './components/AddContact';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppState, ActionTypes } from './types';
import logger from 'redux-logger'

interface AddContact {
  readonly type: ActionTypes.AddContact;
}

interface LastNameChanged {
  readonly type: ActionTypes.LastNameChanged;
  readonly payload: string;
}

interface FirstNameChanged {
  readonly type: ActionTypes.FirstNameChanged;
  readonly payload: string;
}

type ContactAction = FirstNameChanged | LastNameChanged | AddContact;

const defaultState = {
  firstName: "",
  lastName: "",
  contacts: []
};

const reducer = (state: AppState = defaultState, action: ContactAction): AppState => {
  switch (action.type) {
    case ActionTypes.FirstNameChanged:
      return { ...state, firstName: action.payload };
    case ActionTypes.LastNameChanged:
      return { ...state, lastName: action.payload }
    case ActionTypes.AddContact:
      const contact = { firstName: state.firstName, lastName: state.lastName };
      return { ...state, contacts: [...state.contacts, contact], firstName: '', lastName: '' };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(logger));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AddContact />
        </div>
      </Provider>
    );
  }
}

export default App;
