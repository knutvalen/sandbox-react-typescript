import * as React from 'react';
import { Project } from '../types/TimeTracking';
import { map } from 'ramda';
import MonthViewRow from './MonthViewRow';

interface MonthViewListProps {
    readonly projects: Project[];
    readonly currentMonth: number;
}

const mapProjects = (projects: Project[], currentMonth: number) => {
    return map(
        (project: Project) =>
            <MonthViewRow key={project.id} project={project} currentMonth={currentMonth} />,
        projects);
};

const MonthViewList: React.SFC<MonthViewListProps> = ({ projects, currentMonth }) => (
    <React.Fragment>
        {mapProjects(projects, currentMonth)}
    </React.Fragment>
);

export default MonthViewList;