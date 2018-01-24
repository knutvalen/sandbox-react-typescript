import * as React from 'react';
import { Project, Func, Day } from '../types/index';
import { map, sum, pipe, filter, flatten } from 'ramda';

const mapHours = map((day: Day) => day.hours);

const mapWeeks = map((project: Project) => project.trackedDays);

const filterActiveProjects: Func<Project[], Project[]> = filter((project: Project) => project.active);

const filterByDayName = (dayName: string): Func<Day[], Day[]> => filter((day: Day) => day.date === dayName);

const filterMapHours = (dayName: string): Func<Day[], number[]> => pipe(filterByDayName(dayName), mapHours);

const sumDay = (dayName: string, projects: Project[]): number => 
    pipe(filterActiveProjects, mapWeeks, flatten, filterMapHours(dayName), sum)(projects);

const sumWeek = (currentWeek: string[], projects: Project[]) =>
    <td>{sum(map((date: string) => sumDay(date, projects), currentWeek))}</td>;

const sumDays = (currentWeek: string[], projects: Project[]) =>
    map((date: string) => <td key={date}>{sumDay(date, projects)}</td>, currentWeek);

interface SummaryRowProps {
    readonly projects: Project[];
    readonly currentWeek: string[];
}

const SummaryRow: React.SFC<SummaryRowProps> = ({ projects, currentWeek }) => {
    return (
        <tr className="TimeTracking-summary" key={'daySummaryRow'}>
            <td className="TimeTracking-blank" />
            {sumDays(currentWeek, projects)}
            {sumWeek(currentWeek, projects)}
        </tr>
    );
};

export default SummaryRow;