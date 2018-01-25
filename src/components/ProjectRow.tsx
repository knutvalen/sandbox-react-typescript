import * as React from 'react';
import { Project, BinaryFunc, WeekViewChangedPayload, Day } from '../types/TimeTracking';
import { curry, map, reduce, find, filter } from 'ramda';
import ProjectRowCell from './ProjectRowCell';

const onProjectChange = curry(
    (name: string, onChangeHandler: BinaryFunc<string, WeekViewChangedPayload, void>, weekViewChangedPayload: WeekViewChangedPayload) => 
        onChangeHandler(name, weekViewChangedPayload)
);

const mapWeek = (project: Project, currentWeek: string[], weekViewChanged: WeekViewChanged) => {
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
            <ProjectRowCell
                key={project.id + day.date} 
                projectName={project.name} 
                day={day} 
                onChangeAction={onProjectChange(project.name, weekViewChanged)} 
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

type WeekViewChanged = BinaryFunc<string, WeekViewChangedPayload, void>;

interface ProjectRowProps {
    readonly project: Project;
    readonly weekViewChanged: WeekViewChanged;
    readonly currentWeek: string[];
}

const ProjectRow: React.SFC<ProjectRowProps> = ({ project, weekViewChanged, currentWeek }) => (
    <tr key={project.id}>
        <td>{project.name}</td>
        {mapWeek(project, currentWeek, weekViewChanged)}
        <td className="WeekView-summary">{getSummary(project, currentWeek)}</td>
    </tr>
);

export default ProjectRow;