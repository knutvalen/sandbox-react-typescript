import * as React from 'react';
import { Project, Day } from '../types/TimeTracking';
import { map, sum, reduce, pipe, filter, curry } from 'ramda';
import * as moment from 'moment';

interface MonthViewSummaryRowProps {
    readonly projects: Project[];
    readonly currentMonth: number;
    readonly hoursGoal: number;
}

const filterTrackedDays = (trackedDays: Day[], currentMonth: number) =>
    filter((day: Day) => currentMonth === moment(day.date).month(), trackedDays);

const getEarningsForTrackedDays = curry(
    (hourlyRate: number, trackedDays: Day[]) =>
        reduce((acc: number, val: number) => acc + val, 0, map((day: Day) => day.hours * hourlyRate, trackedDays))
);

const getEarningsForProjects = (projects: Project[], currentMonth: number) =>
    sum(
        map(
            (project: Project) => 
                pipe(filterTrackedDays, getEarningsForTrackedDays(project.hourlyRate))(project.trackedDays, currentMonth), 
            projects));

const getHoursForTrackedDays = (trackedDays: Day[]) =>
    reduce((acc: number, val: number) => acc + val, 0, map((day: Day) => day.hours, trackedDays));

const getHoursForProjects = (projects: Project[], currentMonth: number) =>
    sum(
        map(
            (project: Project) => {
                return pipe(filterTrackedDays, getHoursForTrackedDays)(project.trackedDays, currentMonth);
            }, 
            projects));

const MonthViewSummaryRow: React.SFC<MonthViewSummaryRowProps> = ({ projects, currentMonth, hoursGoal }) => {
    const hours = getHoursForProjects(projects, currentMonth);
    const earnings = getEarningsForProjects(projects, currentMonth);
    return (
        <tr key={currentMonth} className="MonthView-summary">
            <td className="MonthView-blank" />
            <td>{hours}/{hoursGoal}</td>
            <td>{earnings}</td>
        </tr>
    );
};

export default MonthViewSummaryRow;