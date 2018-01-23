import * as React from 'react';
import { Project, Day } from '../types/index';
import { map, filter, sum, pipe } from 'ramda';
import * as moment from 'moment';

interface OverviewListProps {
    projects: Project[];
    currentMonth: number;
}

const mapHours = (trackedDays: Day[]) =>
    map((day: Day) => day.hours, trackedDays);

const filterTrackedDays = (trackedDays: Day[], currentMonth: number) =>
    filter((day: Day) => currentMonth === moment(day.date).month(), trackedDays);

const filterAndMapProjects = (projects: Project[], currentMonth: number) => {
    return map(
        (project: Project) => {
            const hours = pipe(filterTrackedDays, mapHours, sum)(project.trackedDays, currentMonth);
            return (
                <tr key={project.id}>
                    <td>{project.name} ({project.hourlyRate} NOK/H)</td>
                    <td>{hours}</td>
                    <td>{hours * project.hourlyRate} NOK</td>
                </tr>);
        },
        projects);
};

const OverviewList: React.SFC<OverviewListProps> = ({ projects, currentMonth }) => (
    <React.Fragment>
        {filterAndMapProjects(projects, currentMonth)}
    </React.Fragment>
);

export default OverviewList;