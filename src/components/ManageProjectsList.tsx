import * as React from 'react';
import { Project, ActivateProjectPayload, Func } from '../types/index';
import { map } from 'ramda';

interface ManageProjectsListProps {
    readonly projects: Project[];
    readonly activateProject: Func<ActivateProjectPayload, void>;
}

const mapProjects = (projects: Project[], activateProject: Func<ActivateProjectPayload, void>) =>
    map(
        (project: Project) => {
            const active = project.active ? 'Active' : '';
            const classes = `${active} ManageProjects-Button`;
            return (
                <button key={project.name} className={classes} onClick={() => activateProject({ project: project })}>{project.name}</button>
            );
        }, projects);

const ManageProjectsList: React.SFC<ManageProjectsListProps> = ({ projects, activateProject }) => {
    return (
        <React.Fragment>
            {mapProjects(projects, activateProject)}
        </React.Fragment>
    );
};

export default ManageProjectsList;