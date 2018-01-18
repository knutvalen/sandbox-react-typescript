import './TimeTracking.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { Project } from '../types/index';
import { StoreState } from '../types/index';
import SummaryRow from './SummaryRow';
import { timeTrackingChangedAction } from '../actions/index';
import ProjectsList from './ProjectsList';
import { CurriedBinary, TimeTrackingChangedPayload } from '../types/index';
import { find } from 'ramda';

interface TimeTrackingProps {
    timeTrackingChanged: CurriedBinary<string, TimeTrackingChangedPayload, void>;
    projects: Project[];
}

const anyActiveProjects = (projects: Project[]) => {
    const findActive = find((project: Project) => project.active, projects);
    return findActive ? true : false;
};

const TimeTracking: React.SFC<TimeTrackingProps> = ({ timeTrackingChanged, projects }) => {
    if (anyActiveProjects(projects)) {
        return (
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
                    <ProjectsList projects={projects} timeTrackingChanged={timeTrackingChanged} />
                    <SummaryRow projects={projects} />
                </tbody>
            </table>
        );
    }

    return (
        <div>
            No active projects.
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