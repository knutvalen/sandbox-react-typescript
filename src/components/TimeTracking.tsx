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