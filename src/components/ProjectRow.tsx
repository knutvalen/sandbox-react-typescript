import * as React from 'react';
import { Project, BinaryFunc, TimeTrackingChangedPayload, Day } from '../types/index';
import { curry, map, reduce, find, filter } from 'ramda';
import RowCell from './RowCell';

const onProjectChange = curry(
    (name: string, onChangeHandler: BinaryFunc<string, TimeTrackingChangedPayload, void>, timeTrackingChangedPayload: TimeTrackingChangedPayload) => 
        onChangeHandler(name, timeTrackingChangedPayload)
);

const mapWeek = (project: Project, currentWeek: string[], timeTrackingChanged: TimeTrackingChanged) => {
    const week = map(
        (date: string) => {
        let day = find((existingDay: Day) => existingDay.date === date, project.trackedDays);
        if (day == null) {
            day = {date: date, hours: 0};
        }
        return day;
        }, 
        currentWeek);

    return map(
        (day: Day) =>
        (
            <RowCell 
                key={project.id + day.date} 
                projectName={project.name} 
                day={day} 
                onChangeAction={onProjectChange(project.name, timeTrackingChanged)} 
            />
        ), 
        week);
};

const filterCurrentWeek = (trackedDays: Day[], currentWeek: string[]) => 
    filter((day: Day) => !!find((date: string) => day.date === date, currentWeek), trackedDays);

const getSummary = (project: Project, currentWeek: string[]) => {
    const filteredTrackedDays = filterCurrentWeek(project.trackedDays, currentWeek);
    const hours = map((day: Day) => day.hours, filteredTrackedDays);
    return reduce((acc: number, val: number) => acc + val, 0, hours);
};

type TimeTrackingChanged = BinaryFunc<string, TimeTrackingChangedPayload, void>;

interface ProjectRowProps {
    readonly project: Project;
    readonly timeTrackingChanged: TimeTrackingChanged;
    readonly currentWeek: string[];
}

const ProjectRow: React.SFC<ProjectRowProps> = ({ project, timeTrackingChanged, currentWeek }) => (
    <tr key={project.id}>
        <td>{project.name}</td>
        {mapWeek(project, currentWeek, timeTrackingChanged)}
        <td className="TimeTracking-summary">{getSummary(project, currentWeek)}</td>
    </tr>
);

export default ProjectRow;