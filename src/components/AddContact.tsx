import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types'
import { firstNameChangedAction, lastNameChangedAction, addContactAction } from '../actions';

interface AddContactProps {
    firstName: string;
    lastName: string;
    firstNameChanged: (firstName: string) => void;
    lastNameChanged: (lastName: string) => void;
    addContact: () => void;
}

const AddContact: React.SFC<AddContactProps> = (props) => {
    return (
        <div>
            <input type="text" value={props.firstName} onChange={(evt: any) => props.firstNameChanged(evt.target.value)} />
            <input type="text" value={props.lastName} onChange={(evt: any) => props.lastNameChanged(evt.target.value)} />
            <button onClick={() => props.addContact()}>Add</button>
        </div>
    )
};

const mapStateToProps = (state: AppState) => ({ firstName: state.firstName, lastName: state.lastName });

const mapDispatchToProps = (dispatch: any) => ({
    firstNameChanged: firstNameChangedAction(dispatch),
    lastNameChanged: lastNameChangedAction(dispatch),
    addContact: addContactAction(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);