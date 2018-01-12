import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState, Func, ManageProjectsPayload } from '../types/index';
import { manageProjectsAction } from '../actions/index';

interface ManageProjectsProps {
    managingProjects: boolean;
    manageProjects: Func<ManageProjectsPayload, void>;
}

const ManageProjects: React.SFC<ManageProjectsProps> = ({ managingProjects, manageProjects }) => {
    const text = managingProjects ? "Done" : "Manage projects";
    return (
        <button onClick={() => manageProjects({managingProjects: managingProjects})}>{text}</button>
    );
}

const mapStateToProps = (state: StoreState) => ({
    managingProjects: state.managingProjects
});

const mapDispatchToProps = (dispatch: any) => ({
    manageProjects: manageProjectsAction(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProjects)