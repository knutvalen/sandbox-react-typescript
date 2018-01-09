import './TimeTracking.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { Project } from '../types/index';
import { StoreState } from '../types/index';
import { timeTrackingChangedAction } from '../actions/index';

interface TimeTrackingProps {
    timeTrackingChanged: (projects: Project[]) => void;
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
                    {GetTimeTrackingRows(props.projects)}
                    {GetDaySummaryRow(props.projects)}
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

function GetTimeTrackingRows(projects: Project[]): any {
    var rows = [];
    for (var i: number = 0; i < projects.length; i++) {
        rows.push(TimeTrackingRow(projects[i]));
    }
    return rows;
}

const TimeTrackingRow = (project: Project) => (
    <tr key={project.name}>
        <td>{project.name}</td>
        <td>{project.monday}</td>
        <td>{project.tuesday}</td>
        <td>{project.wednesday}</td>
        <td>{project.thursday}</td>
        <td>{project.friday}</td>
        <td>{project.saturday}</td>
        <td>{project.sunday}</td>
    </tr>
);

function GetDaySummaryRow(projects: Project[]): any {
    var monday: number = 0;
    var tuesday: number = 0;
    var wednesday: number = 0;
    var thursday: number = 0;
    var friday: number = 0;
    var saturday: number = 0;
    var sunday: number = 0;

    for (var i: number = 0; i < projects.length; i++) {
        const project = projects[i];
        if (project.monday != null && project.monday > 0) {
            monday += project.monday;
        } else if (project.tuesday != null && project.tuesday > 0) {
            tuesday += project.tuesday;
        } else if (project.wednesday != null && project.wednesday > 0) {
            wednesday += project.wednesday;
        } else if (project.thursday != null && project.thursday > 0) {
            thursday += project.thursday;
        } else if (project.friday != null && project.friday > 0) {
            friday += project.friday;
        } else if (project.saturday != null && project.saturday > 0) {
            saturday += project.saturday;
        } else if (project.sunday != null && project.sunday > 0) {
            sunday += project.sunday;
        }
    }

    return (
        <tr className="TimeTracking" key={'daySummaryRow'}>
            <td />
            <td>{monday}</td>
            <td>{tuesday}</td>
            <td>{wednesday}</td>
            <td>{thursday}</td>
            <td>{friday}</td>
            <td>{saturday}</td>
            <td>{sunday}</td>
        </tr>
    );
}

// function GetProjectSummaryRow(projects: Project[]): any {

// }