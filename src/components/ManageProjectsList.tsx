import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState, Project } from '../types/index';
import { map } from 'ramda';

interface ManageProjectsListProps {
    readonly projects: Project[];
}

const mapProjects = (projects: Project[]) => map((project: Project) => <button>{project.name}</button>, projects);

const ManageProjectsList: React.SFC<ManageProjectsListProps> = ({ projects }) => {
    return (
        <React.Fragment>
            {mapProjects(projects)}
        </React.Fragment>
    );
}

const mapStateToProps = (state: StoreState) => ({

});

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProjectsList);