import * as React from 'react';
import { TimeTrackingChangedPayload, Func, Day } from '../types/index';

interface RowCellProps {
    readonly projectName: string;
    readonly day: Day;
    readonly onChangeAction: Func<TimeTrackingChangedPayload, void>;
}

const RowCell: React.SFC<RowCellProps> = ({ projectName, day, onChangeAction }) => {
    return (
        <td>
            <input type="number" value={day.hours} onChange={((event: any) => onChangeAction({ projectName: projectName, day: day, hours: event.target.value }))} />
        </td>
    );
};

export default RowCell;