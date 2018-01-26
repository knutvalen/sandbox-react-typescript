import * as React from 'react';
import { WeekViewChangedPayload, Func, Day } from '../types/TimeTracking';

interface ProjectRowCellProps {
    readonly projectName: string;
    readonly day: Day;
    readonly onChangeAction: Func<WeekViewChangedPayload, void>;
}

// TODO: Dont use parseInt
const ProjectRowCell: React.SFC<ProjectRowCellProps> = ({ projectName, day, onChangeAction }) => (
    <td>
        <input 
            type="number" 
            value={day.hours} 
            onChange={((event: React.ChangeEvent<HTMLInputElement>) => 
                onChangeAction({ projectName: projectName, day: day, hours: Number(event.target.value) }))} 
        />
    </td>
);

export default ProjectRowCell;