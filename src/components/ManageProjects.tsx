import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState, Project, Func, ManageProjectsPayload } from '../types/index';
import { manageProjectsAction } from '../actions/index';
import ManageProjectsList from './ManageProjectsList';

interface ManageProjectsProps {
    managingProjects: boolean;
    manageProjects: Func<ManageProjectsPayload, void>;
    projects: Project[];
}

const ManageProjects: React.SFC<ManageProjectsProps> = ({ managingProjects, manageProjects, projects }) => {
    const text = managingProjects ? "Done" : "Manage projects";
    if (managingProjects) {
        return (
            <div>
                <button onClick={() => manageProjects({ managingProjects: managingProjects })}>{text}</button>
                <div>
                    <ManageProjectsList projects={projects} />
                </div>
            </div>
        );
    }
    return (
        <button onClick={() => manageProjects({ managingProjects: managingProjects })}>{text}</button>
    );
}

const mapStateToProps = (state: StoreState) => ({
    managingProjects: state.managingProjects,
    projects: state.projects
});

const mapDispatchToProps = (dispatch: any) => ({
    manageProjects: manageProjectsAction(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProjects)