import * as React from 'react';
import { Project, BinaryFunc, Field } from '../types/index';
import {reduce, curry} from 'ramda';
import RowCell from './RowCell';

const getSummary = (project: Project) => {
    // TODO: Refactor
    const values = [project.monday, project.tuesday, project.wednesday, project.thursday, project.friday, project.saturday, project.sunday];
    return reduce((acc: number, val: number) => acc + val, 0, values); // ['name', 'monday' ...]
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
        <RowCell name='monday' value={project.monday} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell name='tuesday' value={project.tuesday} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell name='wednesday' value={project.wednesday} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell name='thursday' value={project.thursday} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell name='friday' value={project.friday} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell name='saturday' value={project.saturday} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <RowCell name='sunday' value={project.sunday} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        <td className="TimeTracking-summary">{getSummary(project)}</td>
    </tr>
);

export default ProjectRow;