import { React, useState, useEffect } from 'react';
import NotePlanner from './planners/NotePlanner'
import EventPlanner from './planners/EventPlanner'
import TaskPlanner from './planners/TaskPlanner'

const ItemsView = ({ currentUser, currentType, currentJournalId }) => {

    const CurrentPlanner = () => {
        switch (currentType) {
            case "Notes":
                return (<NotePlanner user={currentUser} type="Note" journal={currentJournalId} />);

            case "Event":
                return (<EventPlanner user={currentUser} type="Event" journal={currentJournalId} />);

            case "Task":
                return (<TaskPlanner user={currentUser} type="Task" journal={currentJournalId} />);

            default:
                return null;
        }
    }
    return (
        <CurrentPlanner />
    );
}


export default ItemsView;