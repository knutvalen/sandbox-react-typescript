import * as React from 'react';
import { Project, BinaryFunc, Field } from '../types/index';
import {reduce, curry } from 'ramda';
import RowCell from './RowCell';

const getSummary = (project: Project) => {
    return reduce((acc: number, val: number) => acc + val, 0, project.week);
};

interface ProjectRowProps {
    readonly project: Project;
    readonly timeTrackingChanged: BinaryFunc<string, Field, void>;
}

const onProjectChange = curry(
    (name: string, onChangeHandler: any, field: Field) => onChangeHandler(name, field)
);

const ProjectRow: React.SFC<ProjectRowProps> = ({ project, timeTrackingChanged }) => (
    <tr key={project.name}>
        <td>{project.name}</td>
        <RowCell day={0} value={project.week[0]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell day={1} value={project.week[1]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell day={2} value={project.week[2]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell day={3} value={project.week[3]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell day={4} value={project.week[4]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell day={5} value={project.week[5]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell day={6} value={project.week[6]} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <td className="TimeTracking-summary">{getSummary(project)}</td>
    </tr>
);

export default ProjectRow;