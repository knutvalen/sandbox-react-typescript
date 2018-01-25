import * as React from 'react';
import { Project, Func, Day } from '../types/TimeTracking';
import { map, sum, pipe, filter, flatten } from 'ramda';

const mapHours = map((day: Day) => day.hours);

const mapWeeks = map((project: Project) => project.trackedDays);

const filterActiveProjects: Func<Project[], Project[]> = filter((project: Project) => project.active);

const filterByDayName = (dayName: string): Func<Day[], Day[]> => filter((day: Day) => day.date === dayName);

const filterMapHours = (dayName: string): Func<Day[], number[]> => pipe(filterByDayName(dayName), mapHours);

const sumDay = (dayName: string, projects: Project[]): number => 
    pipe(filterActiveProjects, mapWeeks, flatten, filterMapHours(dayName), sum)(projects);

const sumWeek = (projects: Project[], currentWeek: string[]) =>
    <td>{sum(map((date: string) => sumDay(date, projects), currentWeek))}</td>;

const sumDays = (projects: Project[], currentWeek: string[]) =>
    map((date: string) => <td key={date}>{sumDay(date, projects)}</td>, currentWeek);

interface ProjectSummaryRowProps {
    readonly projects: Project[];
    readonly currentWeek: string[];
}

const ProjectSummaryRow: React.SFC<ProjectSummaryRowProps> = ({ projects, currentWeek }) => {
    return (
        <tr className="WeekView-summary" key={'daySummaryRow'}>
            <td className="WeekView-blank" />
            {sumDays(projects, currentWeek)}
            {sumWeek(projects, currentWeek)}
        </tr>
    );
};

export default ProjectSummaryRow;