import * as React from 'react';
import { Project, Day } from '../types/index';
import { map, filter, sum, pipe } from 'ramda';
import * as moment from 'moment';

interface OverviewRowProps {
    readonly project: Project;
    readonly currentMonth: number;
}

const mapHours = (trackedDays: Day[]) =>
    map((day: Day) => day.hours, trackedDays);

const filterTrackedDays = (trackedDays: Day[], currentMonth: number) =>
    filter((day: Day) => currentMonth === moment(day.date).month(), trackedDays);

const OverviewRow: React.SFC<OverviewRowProps> = ({ project, currentMonth }) => {
    const hours = pipe(filterTrackedDays, mapHours, sum)(project.trackedDays, currentMonth);
    return (
        <tr key={project.id}>
            <td>{project.name} ({project.hourlyRate} NOK/h)</td>
            <td>{hours}</td>
            <td>{hours * project.hourlyRate}</td>
        </tr>
    );
};

export default OverviewRow;