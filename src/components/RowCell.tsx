import * as React from 'react';
import { Field, Func } from '../types/index';

interface RowCellProps {
    readonly value: number;
    readonly name: string;
    readonly onChangeAction: Func<Field, void>;
}

const RowCell: React.SFC<RowCellProps> = ({value, name, onChangeAction}) => (
        <td>
            <input type="number" value={value}
                onChange={((evt: any) => onChangeAction({ key: name, value: evt.target.value }))} />
        </td>
    );

export default RowCell;