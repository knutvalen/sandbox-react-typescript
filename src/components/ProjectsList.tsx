import * as React from 'react';
import { Project, BinaryFunc, TimeTrackingChangedPayload } from '../types/index';
import { map } from 'ramda';
import ProjectRow from './ProjectRow';

interface ProjectsListProps {
    readonly projects: Project[];
    readonly timeTrackingChanged: BinaryFunc<string, TimeTrackingChangedPayload, void>;
}

const mapProjects = (projects: Project[], timeTrackingChanged: any) =>
    map(
        (project: Project) => {
            if (project.active) {
                return (
                    <ProjectRow key={project.name} project={project} timeTrackingChanged={timeTrackingChanged} />
                );
            }
            return;
        }, projects);

const ProjectsList: React.SFC<ProjectsListProps> = ({ projects, timeTrackingChanged }) => (
    <React.Fragment>
        {mapProjects(projects, timeTrackingChanged)}
    </React.Fragment>
);

export default ProjectsList;