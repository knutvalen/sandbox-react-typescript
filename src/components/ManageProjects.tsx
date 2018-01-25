import './ManageProjects.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState, Project, Func, ManageProjectsPayload, ActivateProjectPayload } from '../types/TimeTracking';
import { manageProjectsAction, activateProjectAction, TimeTrackingAction as Action } from '../actions/TimeTracking';
import ManageProjectsList from './ManageProjectsList';

interface ManageProjectsProps {
    managingProjects: boolean;
    manageProjects: Func<ManageProjectsPayload, void>;
    activateProject: Func<ActivateProjectPayload, void>;
    projects: Project[];
}

const ManageProjects: React.SFC<ManageProjectsProps> = ({ managingProjects, manageProjects, activateProject, projects }) => {
    const managingProjectsText = managingProjects ? 'Done' : 'Manage projects';
    const manageProjectsButton = 
        (
        <button className="ManageProjects-Button" onClick={() => manageProjects({ managingProjects: managingProjects })}>
                {managingProjectsText}
        </button>);

    if (managingProjects) {
        return (
            <div>
                {manageProjectsButton}
                <div>
                    <ManageProjectsList projects={projects} activateProject={activateProject} />
                </div>
            </div>
        );
    }
    return (
        <div>
            {manageProjectsButton}
        </div>
    );
};

const mapStateToProps = (state: StoreState) => ({
    managingProjects: state.managingProjects,
    projects: state.projects
});

const mapDispatchToProps = (dispatch: Func<Action, void>) => ({
    manageProjects: manageProjectsAction(dispatch),
    activateProject: activateProjectAction(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProjects);