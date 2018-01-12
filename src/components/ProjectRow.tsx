import * as React from 'react';
import { Project, BinaryFunc, TimeTrackingChangedPayload, Day } from '../types/index';
import { curry, map, reduce } from 'ramda';
import RowCell from './RowCell';

const getSummary = (project: Project) => {
    const hours = map((day: Day) => Number(day.hours), project.week);
    return reduce((acc: number, val: number) => acc + val, 0, hours);
};

interface ProjectRowProps {
    readonly project: Project;
    readonly timeTrackingChanged: BinaryFunc<string, TimeTrackingChangedPayload, void>;
}

// hva skjer her?
const onProjectChange = curry(
    (name: string, onChangeHandler: any, timeTrackingChangedPayload: TimeTrackingChangedPayload) => onChangeHandler(name, timeTrackingChangedPayload)
);

const ProjectRow: React.SFC<ProjectRowProps> = ({ project, timeTrackingChanged }) => (
    <tr key={project.name}>
        <td>{project.name}</td>
        <RowCell projectName={project.name} day={project.week[0]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell projectName={project.name} day={project.week[1]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell projectName={project.name} day={project.week[2]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell projectName={project.name} day={project.week[3]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell projectName={project.name} day={project.week[4]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell projectName={project.name} day={project.week[5]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell projectName={project.name} day={project.week[6]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <td className="TimeTracking-summary">{getSummary(project)}</td>
    </tr>
);

export default ProjectRow;