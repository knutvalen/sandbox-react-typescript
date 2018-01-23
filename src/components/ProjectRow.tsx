import * as React from 'react';
import { Project, BinaryFunc, TimeTrackingChangedPayload, Day } from '../types/index';
import { curry, map, reduce, find } from 'ramda';
import RowCell from './RowCell';

/* 

Mål:

Separere timeføring og ukespresentasjon

project kan være: { id: 1, trackedDays: [{ date: dato her, hours: 5}, ...]}

når timer endrer seg på et prosjekt på en dag, legg til timene og datoen i listen. se etter eksisterende dato, hvis eksisterende, oppdater tallet

tabellen: 

map over currentWeek

*/

const onProjectChange = curry(
    (name: string, onChangeHandler: BinaryFunc<string, TimeTrackingChangedPayload, void>, timeTrackingChangedPayload: TimeTrackingChangedPayload) => 
        onChangeHandler(name, timeTrackingChangedPayload)
);

// TODO: Flytt ting hit
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
        <RowCell projectName={project.name} day={day} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
        , 
        week);
};

// map((day: Day) =>
//     <RowCell projectName={project.name} day={day} onChangeAction={onProjectChange(project.name, timeTrackingChanged)} />
// , project.trackedDays);

const getSummary = (project: Project, currentWeek: string[]) => {
    // TODO: use currentWeek
    const hours = map((day: Day) => Number(day.hours), project.trackedDays);
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