import './TimeTracking.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { Project } from '../types/index';
import { StoreState } from '../types/index';
import SummaryRow from './SummaryRow';
import { timeTrackingChangedAction, updateCurrentWeekAction, TimeTrackingAction } from '../actions/TimeTracking';
import ProjectsList from './ProjectsList';
import { CurriedBinary, TimeTrackingChangedPayload, Func, UpdateCurrentWeekPayload } from '../types/index';
import { find, map, take, takeLast } from 'ramda';
import * as moment from 'moment';

interface TimeTrackingProps {
    timeTrackingChanged: CurriedBinary<string, TimeTrackingChangedPayload, void>;
    updateCurrentWeek: Func<UpdateCurrentWeekPayload, void>;
    projects: Project[];
    weekNumber: number;
}

const getWeek = (weekNumber: number) =>
    map((numDays: number) => moment().week(weekNumber).startOf('week').add(numDays, 'days').format('DD.MM'), [1, 2, 3, 4, 5, 6, 7]);

const anyActiveProjects = (projects: Project[]) => {
    const findActive = find((project: Project) => project.active, projects);
    return findActive ? true : false;
};

// TODO: Legg til ukenummer på app state. Finn ut dagens uke, og begynn med ukenummeret for den. Når man går til neste uke, ukenummer +1
// Legg til currentWeek på state som holder på datoer og ukenummer.
// Når man endrer uke, byttes currentWeek ut med nytt ukenummer og datoer.

const TimeTracking: React.SFC<TimeTrackingProps> = ({ timeTrackingChanged, projects, weekNumber, updateCurrentWeek }) => {
    const currentWeek = getWeek(weekNumber);
    const nextWeekButton = (<button className="ManageProjects-Button" onClick={() => updateCurrentWeek({ number: 1 })} >Next week</button>);
    const previousWeekButton = 
        <button className="ManageProjects-Button" onClick={() => updateCurrentWeek({ number: (-1) })} >Previous week</button>;

    if (anyActiveProjects(projects)) {
        return (
            <div>
                <span>Ukenummer: {weekNumber} ({take(1, currentWeek)} - {takeLast(1, currentWeek)})</span>
                <table>
                    <tbody>
                        <tr>
                            <th>Project</th>
                            <th>Monday {currentWeek[0]}</th>
                            <th>Tuesday {currentWeek[1]}</th>
                            <th>Wednesday {currentWeek[2]}</th>
                            <th>Thursday {currentWeek[3]}</th>
                            <th>Friday {currentWeek[4]}</th>
                            <th>Saturday {currentWeek[5]}</th>
                            <th>Sunday {currentWeek[6]}</th>
                        </tr>
                        <ProjectsList projects={projects} timeTrackingChanged={timeTrackingChanged} currentWeek={currentWeek} />
                        <SummaryRow projects={projects} currentWeek={currentWeek} />
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
    timeTrackingChanged: timeTrackingChangedAction(dispatch),
    updateCurrentWeek: updateCurrentWeekAction(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeTracking);