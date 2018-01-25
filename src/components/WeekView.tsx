import './WeekView.css';
import * as React from 'react';
import { connect } from 'react-redux';
import ProjectSummaryRow from './ProjectSummaryRow';
import { WeekViewChangedAction, updateCurrentWeekAction, TimeTrackingAction } from '../actions/TimeTracking';
import ProjectList from './ProjectList';
import { CurriedBinary, WeekViewChangedPayload, Func, UpdateCurrentWeekPayload, Project, StoreState } from '../types/TimeTracking';
import { find, map, take, takeLast } from 'ramda';
import * as moment from 'moment';

interface WeekViewProps {
    weekViewChanged: CurriedBinary<string, WeekViewChangedPayload, void>;
    updateCurrentWeek: Func<UpdateCurrentWeekPayload, void>;
    projects: Project[];
    weekNumber: number;
}

const getWeek = (weekNumber: number) =>
    map((numDays: number) => moment().week(weekNumber).startOf('week').add(numDays, 'days').format(), [1, 2, 3, 4, 5, 6, 7]);

const anyActiveProjects = (projects: Project[]) => {
    const findActive = find((project: Project) => project.active, projects);
    return findActive ? true : false;
};

const getDateFormatted = (date: string) =>
    moment(date).format('DD.MM');

const WeekView: React.SFC<WeekViewProps> = ({ weekViewChanged, projects, weekNumber, updateCurrentWeek }) => {
    const currentWeek = getWeek(weekNumber);
    const nextWeekButton = (
        <button 
            className="ManageProjects-Button" 
            onClick={() => updateCurrentWeek({ updateNumber: 1, currentWeek: currentWeek })}
        >Next week
        </button>
    );
    const previousWeekButton = (
        <button 
            className="ManageProjects-Button" 
            onClick={() => updateCurrentWeek({ updateNumber: (-1), currentWeek: currentWeek })} 
        >Previous week
        </button>
    );

    if (anyActiveProjects(projects)) {
        return (
            <div>
                <span>Week: {weekNumber} ({getDateFormatted(take(1, currentWeek)[0])} - {getDateFormatted(takeLast(1, currentWeek)[0])})</span>
                <table>
                    <tbody>
                        <tr>
                            <th>Project</th>
                            <th>Monday {getDateFormatted(currentWeek[0])}</th>
                            <th>Tuesday {getDateFormatted(currentWeek[1])}</th>
                            <th>Wednesday {getDateFormatted(currentWeek[2])}</th>
                            <th>Thursday {getDateFormatted(currentWeek[3])}</th>
                            <th>Friday {getDateFormatted(currentWeek[4])}</th>
                            <th>Saturday {getDateFormatted(currentWeek[5])}</th>
                            <th>Sunday {getDateFormatted(currentWeek[6])}</th>
                        </tr>
                        <ProjectList projects={projects} weekViewChanged={weekViewChanged} currentWeek={currentWeek} />
                        <ProjectSummaryRow projects={projects} currentWeek={currentWeek} />
                    </tbody>
                </table>
                {previousWeekButton}
                {nextWeekButton}
            </div>
        );
    }

    return (
        <div>
            No active projects.
        </div>
    );
};

const mapStateToProps = (state: StoreState) => ({
    projects: state.projects,
    weekNumber: state.weekNumber
});

const mapDispatchToProps = (dispatch: Func<TimeTrackingAction, void>) => ({
    weekViewChanged: WeekViewChangedAction(dispatch),
    updateCurrentWeek: updateCurrentWeekAction(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekView);