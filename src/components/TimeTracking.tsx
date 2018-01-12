import './TimeTracking.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { Project } from '../types/index';
import { StoreState } from '../types/index';
import SummaryRow from './SummaryRow';
import { timeTrackingChangedAction, manageProjectsAction } from '../actions/index';
import ProjectsList from './ProjectsList';
import { CurriedBinary, TimeTrackingChangedPayload } from '../types/index';

interface TimeTrackingProps {
    timeTrackingChanged: CurriedBinary<string, TimeTrackingChangedPayload, void>;
    projects: Project[];
    manageProjects: () => void;
}

const TimeTracking: React.SFC<TimeTrackingProps> = (props) => {
    return (
        <div>
            <button onClick={() => props.manageProjects()}>Manage projects</button>
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
                    <ProjectsList projects={props.projects} timeTrackingChanged={props.timeTrackingChanged} />
                    <SummaryRow projects={props.projects} />
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state: StoreState) => ({
    projects: state.projects
});

const mapDispatchToProps = (dispatch: any) => ({
    timeTrackingChanged: timeTrackingChangedAction(dispatch),
    manageProjects: manageProjectsAction(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeTracking);