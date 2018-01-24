import * as React from 'react';
import { Project } from '../types/index';
import { map } from 'ramda';
import OverviewRow from './OverviewRow';

interface OverviewListProps {
    readonly projects: Project[];
    readonly currentMonth: number;
}

const mapProjects = (projects: Project[], currentMonth: number) => {
    return map(
        (project: Project) =>
            <OverviewRow key={project.id} project={project} currentMonth={currentMonth} />,
        projects);
};

const OverviewList: React.SFC<OverviewListProps> = ({ projects, currentMonth }) => (
    <React.Fragment>
        {mapProjects(projects, currentMonth)}
    </React.Fragment>
);

export default OverviewList;