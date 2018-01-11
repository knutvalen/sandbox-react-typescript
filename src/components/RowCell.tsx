import * as React from 'react';
import { Field, Func } from '../types/index';

interface RowCellProps {
    readonly value: number;
    readonly day: number;
    readonly onChangeAction: Func<Field, void>;
}

const RowCell: React.SFC<RowCellProps> = ({value, day, onChangeAction}) => (
        <td>
            <input type="number" value={value}
                onChange={((evt: any) => onChangeAction({ key: day, value: evt.target.value }))} />
        </td>
    );

export default RowCell;