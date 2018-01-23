import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState, Func } from '../types/index';
import { TimeTrackingAction } from '../actions/TimeTracking';
import { Project } from '../types/index';
import * as moment from 'moment';
import OverviewList from './OverviewList';

interface OverviewProps {
    projects: Project[];
    weekNumber: number;
}

const getMonthNumber = (weekNumber: number) =>
    moment().week(weekNumber).month();

const getMonthName = (weekNumber: number) =>
    moment().month(getMonthNumber(weekNumber)).format('MMMM');

const Overview: React.SFC<OverviewProps> = ({ projects, weekNumber }) => {
    const currentMonth = getMonthNumber(weekNumber);
    return (
        <div>
            <span>Overview {getMonthName(weekNumber)}</span>
            <table>
                <tbody>
                    <tr>
                        <th>Project</th>
                        <th>Hours</th>
                        <th>Earnings</th>
                    </tr>
                    <OverviewList projects={projects} currentMonth={currentMonth} />
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state: StoreState) => ({
    projects: state.projects,
    weekNumber: state.weekNumber
});

const mapDispatchToProps = (dispatch: Func<TimeTrackingAction, void>) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);