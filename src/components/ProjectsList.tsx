import * as React from 'react';
import { Project, BinaryFunc, TimeTrackingChangedPayload, Func } from '../types/index';
import { map, filter, pipe, curry } from 'ramda';
import ProjectRow from './ProjectRow';

interface ProjectsListProps {
    readonly projects: Project[];
    readonly timeTrackingChanged: BinaryFunc<string, TimeTrackingChangedPayload, void>;
    readonly currentWeek: string[];
}

const filterActiveProjects: Func<Project[], Project[]> = filter((project: Project) => project.active);

// const indexedMap = addIndex(map);

// TODO: get currentWeek down here :D
// FLYTT DATO GREIENE TIL PROJECT ROW OG MAP WEEK

const mapProjects = curry(
    (timeTrackingChanged: BinaryFunc<string, TimeTrackingChangedPayload, void>, currentWeek: string[], projects: Project[]) =>
        map(
            (project: Project) => 
                <ProjectRow key={project.id} project={project} timeTrackingChanged={timeTrackingChanged} currentWeek={currentWeek} />
            , 
            projects)
    // indexedMap(
    //     (project: Project, index: number) => 
    // <ProjectRow key={project.name} date={indexOf(index, currentWeek)} project={project} timeTrackingChanged={timeTrackingChanged} />
    // , projects)
);

const filterAndMapProjects = 
    (projects: Project[], timeTrackingChanged: BinaryFunc<string, TimeTrackingChangedPayload, void>, currentWeek: string[]) =>
        pipe(filterActiveProjects, mapProjects(timeTrackingChanged, currentWeek))(projects);

const ProjectsList: React.SFC<ProjectsListProps> = ({ projects, timeTrackingChanged, currentWeek }) => (
    <React.Fragment>
        {filterAndMapProjects(projects, timeTrackingChanged, currentWeek)}
    </React.Fragment>
);

export default ProjectsList;