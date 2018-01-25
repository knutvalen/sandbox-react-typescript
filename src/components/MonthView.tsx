import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState, Func } from '../types/TimeTracking';
import { TimeTrackingAction } from '../actions/TimeTracking';
import { Project } from '../types/TimeTracking';
import * as moment from 'moment';
import MonthViewList from './MonthViewList';
import MonthViewSummaryRow from './MonthViewSummaryRow';
import './MonthView.css';
import { map, filter } from 'ramda';

interface MonthViewProps {
    readonly projects: Project[];
    readonly weekNumber: number;
}

const getMonthNumber = (weekNumber: number) =>
    moment().week(weekNumber).month();

const getMonthName = (weekNumber: number) =>
    moment().month(getMonthNumber(weekNumber)).format('MMMM');

const generateMonthNameArray = (monthName: string, monthNumberArray: number[]) =>
    map((numDays: number) => moment().month(monthName).startOf('month').add(numDays, 'days').format('dddd'), monthNumberArray);

const generateMonthNumberArray = (numDays: number) => {
    let array: number[] = [];
    for (let i: number = 0; i < numDays; i++) {
        array.push(i);
    }
    return array;
};

const getWorkDays = (monthName: string) => {
    const days = moment(monthName, 'MMMM').daysInMonth();
    const monthArray = generateMonthNameArray(monthName, generateMonthNumberArray(days));
    const mappedMonthWithNoWeekends = filter((dayName: string) => (dayName !== 'Saturday' && dayName !== 'Sunday'), monthArray);
    return mappedMonthWithNoWeekends.length;
};

const MonthView: React.SFC<MonthViewProps> = ({ projects, weekNumber }) => {
    const monthNumber = getMonthNumber(weekNumber);
    const monthName = getMonthName(weekNumber);
    const workDays = getWorkDays(monthName);
    const hoursGoal = workDays * 7.5;
    return (
        <div>
            <span>Month: {monthName}</span>
            <table>
                <tbody>
                    <tr>
                        <th>Project</th>
                        <th>Hours</th>
                        <th>Earnings</th>
                    </tr>
                    <MonthViewList projects={projects} currentMonth={monthNumber} />
                    <MonthViewSummaryRow projects={projects} currentMonth={monthNumber} hoursGoal={hoursGoal}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MonthView);