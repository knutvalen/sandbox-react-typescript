import * as React from 'react';
import { Project, Func } from '../types/index';
import { map, sum, pipe } from 'ramda';

const mapDay = (day: number): Func<Project[], any[]> => map((project: Project) => project.week[day]);
const sumDay = (day: number, projects: Project[]): number => pipe(mapDay(day), sum)(projects);

const sumWeek = (projects: Project[]) =>
    sum([sumDay(0, projects),
    sumDay(1, projects),
    sumDay(2, projects),
    sumDay(3, projects),
    sumDay(4, projects),
    sumDay(5, projects),
    sumDay(6, projects)]);

interface SummaryRowProps {
    readonly projects: Project[];
}

const SummaryRow: React.SFC<SummaryRowProps> = ({ projects }) => (
    <tr className="TimeTracking-summary" key={'daySummaryRow'}>
        <td className="TimeTracking-blank" />
        <td>{sumDay(0, projects)}</td>
        <td>{sumDay(1, projects)}</td>
        <td>{sumDay(2, projects)}</td>
        <td>{sumDay(3, projects)}</td>
        <td>{sumDay(4, projects)}</td>
        <td>{sumDay(5, projects)}</td>
        <td>{sumDay(6, projects)}</td>
        <td>{sumWeek(projects)}</td>
    </tr>
);

export default SummaryRow;