import * as React from 'react';
import { Project, Func } from '../types/index';
import { map, sum, pipe } from 'ramda';

const mapDay = (day: string): Func<Project[], any[]> => map((project: Project) => project[day]);
const sumDay = (day: string, projects: Project[]): number => pipe(mapDay(day), sum)(projects);

const sumWeek = (projects: Project[]) =>
    sum([sumDay('monday', projects),
    sumDay('tuesday', projects),
    sumDay('wednesday', projects),
    sumDay('thursday', projects),
    sumDay('friday', projects),
    sumDay('saturday', projects),
    sumDay('sunday', projects)]);

// const sumMonday: (p: Project[]) => number = (projects: Project[]) => {
//     const mondays: number[] = mapMondays(projects);
//     const sumOfMondays: number = sum(mondays);
//     return sumOfMondays;
//};

interface SummaryRowProps {
    readonly projects: Project[];
}

const SummaryRow: React.SFC<SummaryRowProps> = ({ projects }) => (
    <tr className="TimeTracking-summary" key={'daySummaryRow'}>
        <td className="TimeTracking-blank" />
        <td>{sumDay('monday', projects)}</td>
        <td>{sumDay('tuesday', projects)}</td>
        <td>{sumDay('wednesday', projects)}</td>
        <td>{sumDay('thursday', projects)}</td>
        <td>{sumDay('friday', projects)}</td>
        <td>{sumDay('saturday', projects)}</td>
        <td>{sumDay('sunday', projects)}</td>
        <td>{sumWeek(projects)}</td>
    </tr>
);

export default SummaryRow;