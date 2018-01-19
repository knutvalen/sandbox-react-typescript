import './ManageProjects.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState, Project, Func, ManageProjectsPayload, ActivateProjectPayload } from '../types/index';
import { manageProjectsAction, activateProjectAction } from '../actions/TimeTracking';
import ManageProjectsList from './ManageProjectsList';

interface ManageProjectsProps {
    managingProjects: boolean;
    manageProjects: Func<ManageProjectsPayload, void>;
    activateProject: Func<ActivateProjectPayload, void>;
    projects: Project[];
}

const ManageProjects: React.SFC<ManageProjectsProps> = ({ managingProjects, manageProjects, activateProject, projects }) => {
    const text = managingProjects ? 'Done' : 'Manage projects';
    const toggleButton = (<button className="ManageProjects-Button " onClick={() => manageProjects({ managingProjects: managingProjects })}>{text}</button>);

    if (managingProjects) {
        return (
            <div>
                {toggleButton}
                <div>
                    <ManageProjectsList projects={projects} activateProject={activateProject} />
                </div>
            </div>
        );
    }
    return toggleButton;
};

const mapStateToProps = (state: StoreState) => ({
    managingProjects: state.managingProjects,
    projects: state.projects
});

const mapDispatchToProps = (dispatch: any) => ({
    manageProjects: manageProjectsAction(dispatch),
    activateProject: activateProjectAction(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProjects);