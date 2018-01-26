import './ManageProjects.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState, Project, Func, ActivateProjectPayload, EmptyFunc } from '../types/TimeTracking';
import { manageProjectsAction, activateProjectAction, TimeTrackingAction as Action } from '../actions/TimeTracking';
import ManageProjectsList from './ManageProjectsList';
import { toMaybe } from '../lib';

interface ManageProjectsProps {
    managingProjects: boolean;
    manageProjects: EmptyFunc<void>;
    activateProject: Func<ActivateProjectPayload, void>;
    projects: Project[];
}

interface ManageProjectsButtonProps {
    readonly text: string;
    readonly onClick: EmptyFunc<void>;
}

const ManageProjectsButton: React.SFC<ManageProjectsButtonProps> = ({text, onClick}) => (
    <button className="ManageProjects-Button" onClick={onClick}>
        {text}
    </button>
);

const ManageProjects: React.SFC<ManageProjectsProps> = ({ managingProjects, manageProjects, activateProject, projects }) =>
    toMaybe(managingProjects).caseOf({
        nothing: () => (
        <div>
            <ManageProjectsButton text="Manage Projects" onClick={() => manageProjects()} />
        </div>
        ),
        just: () => (
            <div>
                <ManageProjectsButton text="Done" onClick={() => manageProjects()} />
                <div>
                    <ManageProjectsList projects={projects} activateProject={activateProject} />
                </div>
            </div>
            )
    });

const mapStateToProps = (state: StoreState) => ({
    managingProjects: state.managingProjects,
    projects: state.projects
});

const mapDispatchToProps = (dispatch: Func<Action, void>) => ({
    manageProjects: manageProjectsAction(dispatch),
    activateProject: activateProjectAction(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProjects);