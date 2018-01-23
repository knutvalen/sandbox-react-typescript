import * as React from 'react';
import { TimeTrackingChangedPayload, Func, Day } from '../types/index';

interface RowCellProps {
    readonly projectName: string;
    readonly day: Day;
    readonly onChangeAction: Func<TimeTrackingChangedPayload, void>;
}

// TODO: Dont use parseInt
const RowCell: React.SFC<RowCellProps> = ({ projectName, day, onChangeAction }) => (
    <td>
        <input 
            type="number" 
            value={day.hours} 
            onChange={((event: React.ChangeEvent<HTMLInputElement>) => 
                onChangeAction({ projectName: projectName, day: day, hours: parseInt(event.target.value, 10) }))} 
        />
    </td>
);

export default RowCell;