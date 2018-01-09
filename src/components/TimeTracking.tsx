import * as React from 'react';
import { connect } from 'react-redux';
import { Project } from '../types/index'
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
    for(var i: number = 0; i < projects.length; i++) {
        return (
            <tr>
                <td>{projects[i].name}</td>
                <td>{projects[i].monday}</td>
                <td>{projects[i].tuesday}</td>
                <td>{projects[i].wednesday}</td>
                <td>{projects[i].thursday}</td>
                <td>{projects[i].friday}</td>
                <td>{projects[i].saturday}</td>
                <td>{projects[i].sunday}</td>
            </tr>
        );
    }
}