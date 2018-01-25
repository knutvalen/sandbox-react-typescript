import * as React from 'react';
import { Project, BinaryFunc, WeekViewChangedPayload, Func } from '../types/TimeTracking';
import { map, filter, pipe, curry } from 'ramda';
import ProjectRow from './ProjectRow';

interface ProjectListProps {
    readonly projects: Project[];
    readonly weekViewChanged: BinaryFunc<string, WeekViewChangedPayload, void>;
    readonly currentWeek: string[];
}

const filterActiveProjects: Func<Project[], Project[]> = filter((project: Project) => project.active);

const mapProjects = curry(
    (weekViewChanged: BinaryFunc<string, WeekViewChangedPayload, void>, currentWeek: string[], projects: Project[]) =>
        map((project: Project) => 
                <ProjectRow key={project.id} project={project} weekViewChanged={weekViewChanged} currentWeek={currentWeek} />,
            projects)
);

const filterAndMapProjects = 
    (projects: Project[], weekViewChanged: BinaryFunc<string, WeekViewChangedPayload, void>, currentWeek: string[]) =>
        pipe(filterActiveProjects, mapProjects(weekViewChanged, currentWeek))(projects);

const ProjectList: React.SFC<ProjectListProps> = ({ projects, weekViewChanged, currentWeek }) => (
    <React.Fragment>
        {filterAndMapProjects(projects, weekViewChanged, currentWeek)}
    </React.Fragment>
);

export default ProjectList;