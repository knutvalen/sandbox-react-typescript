import * as React from 'react';
import { Project, BinaryFunc, Field } from '../types/index';
import { map } from 'ramda';
import ProjectRow from './ProjectRow';

interface ProjectsListProps {
    readonly projects: Project[];
    readonly timeTrackingChanged: BinaryFunc<string, Field, void>;
}

const mapProjects = (projects: Project[], timeTrackingChanged: any) =>
    map((project: Project) => <ProjectRow project={project} timeTrackingChanged={timeTrackingChanged} />, projects)

const ProjectsList: React.SFC<ProjectsListProps> = ({ projects, timeTrackingChanged }) => (
    <React.Fragment>
        {mapProjects(projects, timeTrackingChanged)}
    </React.Fragment>
);

export default ProjectsList;