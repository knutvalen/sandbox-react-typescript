import './ManageProjects.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState, Project, Func, ManageProjectsPayload, ActivateProjectPayload, SubmitWeekPayload } from '../types/index';
import { manageProjectsAction, activateProjectAction, submitWeekAction, TimeTrackingAction as Action } from '../actions/TimeTracking';
import ManageProjectsList from './ManageProjectsList';

interface ManageProjectsProps {
    managingProjects: boolean;
    manageProjects: Func<ManageProjectsPayload, void>;
    activateProject: Func<ActivateProjectPayload, void>;
    projects: Project[];
    submitWeek: Func<SubmitWeekPayload, void>;
    submitted: boolean;
}

const ManageProjects: React.SFC<ManageProjectsProps> = ({ managingProjects, manageProjects, activateProject, projects, submitWeek, submitted }) => {
    const managingProjectsText = managingProjects ? 'Done' : 'Manage projects';
    const submitWeekText = submitted ? 'Week submitted' : 'Submit week';
    const manageProjectsButton = 
        (
        <button className="ManageProjects-Button" onClick={() => manageProjects({ managingProjects: managingProjects })}>
                {managingProjectsText}
        </button>);
    const submitWeekButton = 
        (<button className="ManageProjects-Button" onClick={() => submitWeek({ submitted: submitted })}>{submitWeekText}</button>);

    if (managingProjects) {
        return (
            <div>
                {manageProjectsButton}
                {submitWeekButton}
                <div>
                    <ManageProjectsList projects={projects} activateProject={activateProject} />
                </div>
            </div>
        );
    }
    return (
        <div>
            {manageProjectsButton}
            {submitWeekButton}
        </div>
    );
};

const mapStateToProps = (state: StoreState) => ({
    managingProjects: state.managingProjects,
    projects: state.projects,
    submitted: state.submitted
});

const mapDispatchToProps = (dispatch: Func<Action, void>) => ({
    manageProjects: manageProjectsAction(dispatch),
    activateProject: activateProjectAction(dispatch),
    submitWeek: submitWeekAction(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProjects);