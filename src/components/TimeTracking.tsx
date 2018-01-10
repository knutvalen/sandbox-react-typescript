import './TimeTracking.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { Project } from '../types/index';
import { StoreState } from '../types/index';
import { timeTrackingChangedAction } from '../actions/index';

interface TimeTrackingProps {
    timeTrackingChanged: (project: Project) => void;
    projects: Project[];
}

const TimeTracking: React.SFC<TimeTrackingProps> = (props) => {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Project</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                    {GetWeeklyEntries(props)}
                    {GetWeeklySummary(props)}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state: StoreState) => ({
    projects: state.projects
});

const mapDispatchToProps = (dispatch: any) => ({
    timeTrackingChanged: timeTrackingChangedAction(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeTracking);

function GetWeeklyEntries(props: TimeTrackingProps): any {
    var entries = [];
    for (var i: number = 0; i < props.projects.length; i++) {
        entries.push(WeeklyEntry(props.projects[i], props.timeTrackingChanged));
    }
    return entries;
}

function WeeklyEntry(project: Project, timeTrackingChanged: (project: Project) => void): any {
    const summary: number =
        Number(project.monday)
        + Number(project.tuesday)
        + Number(project.wednesday)
        + Number(project.thursday)
        + Number(project.friday)
        + Number(project.saturday)
        + Number(project.sunday);

    return (
        <tr key={project.name}>
            <td>{project.name}</td>
            <td>
                <input type="number" value={project.monday}
                    onChange={(event: any) => timeTrackingChanged({ ...project, monday: event.target.value })} />
            </td>
            <td>
                <input type="number" value={project.tuesday}
                    onChange={(event: any) => timeTrackingChanged({ ...project, tuesday: event.target.value })} />
            </td>
            <td>
                <input type="number" value={project.wednesday}
                    onChange={(event: any) => timeTrackingChanged({ ...project, wednesday: event.target.value })} />
            </td>
            <td>
                <input type="number" value={project.thursday}
                    onChange={(event: any) => timeTrackingChanged({ ...project, thursday: event.target.value })} />
            </td>
            <td>
                <input type="number" value={project.friday}
                    onChange={(event: any) => timeTrackingChanged({ ...project, friday: event.target.value })} />
            </td>
            <td>
                <input type="number" value={project.saturday}
                    onChange={(event: any) => timeTrackingChanged({ ...project, saturday: event.target.value })} />
            </td>
            <td>
                <input type="number" value={project.sunday}
                    onChange={(event: any) => timeTrackingChanged({ ...project, sunday: event.target.value })} />
            </td>
            <td className="TimeTracking-summary">{summary}</td>
        </tr>
    );
}

function GetWeeklySummary(props: TimeTrackingProps): any {
    const projects = props.projects;
    var monday: number = 0;
    var tuesday: number = 0;
    var wednesday: number = 0;
    var thursday: number = 0;
    var friday: number = 0;
    var saturday: number = 0;
    var sunday: number = 0;

    for (var i: number = 0; i < projects.length; i++) {
        const project = projects[i];
        if (project.monday != null && Number(project.monday) > 0) {
            monday += Number(project.monday);
        }
        
        if (project.tuesday != null && Number(project.tuesday) > 0) {
            tuesday += Number(project.tuesday);
        } 
        
        if (project.wednesday != null && Number(project.wednesday) > 0) {
            wednesday += Number(project.wednesday);
        } 
        
        if (project.thursday != null && Number(project.thursday) > 0) {
            thursday += Number(project.thursday);
        }
        
        if (project.friday != null && Number(project.friday) > 0) {
            friday += Number(project.friday);
        }
        
        if (project.saturday != null && Number(project.saturday) > 0) {
            saturday += Number(project.saturday);
        }
        
        if (project.sunday != null && Number(project.sunday) > 0) {
            sunday += Number(project.sunday);
        }
    }

    const summary: number =
        Number(monday)
        + Number(tuesday)
        + Number(wednesday)
        + Number(thursday)
        + Number(friday)
        + Number(saturday)
        + Number(sunday);

    return (
        <tr className="TimeTracking-summary" key={'daySummaryRow'}>
            <td className="TimeTracking-blank" />
            <td>{monday}</td>
            <td>{tuesday}</td>
            <td>{wednesday}</td>
            <td>{thursday}</td>
            <td>{friday}</td>
            <td>{saturday}</td>
            <td>{sunday}</td>
            <td>{summary}</td>
        </tr>
    );
}