import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import momentPlugin from '@fullcalendar/moment'

import { React, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Button,
    ButtonGroup,
}
    from '@mui/material';

import axios from 'axios';




const Calendar = ({ currentUser }) => {
    const [fetchedItems, setFetchedItems] = useState('');
    const [itemsToDisplay, setItemsToDisplay] = useState(null)
    const [currentJournal, setCurrentJournal] = useState(null);
    const [currentItemType, setCurrentItemType] = useState(null);
    const [fetchedJournals, setFetchedJournals] = useState(null);
    const [isJournalsMenuOpen, setJournalsMenuOpen] = useState(false);
    const [currentJournalId, setcurrentJournalId] = useState(null);
    const [anchorAddForm, setAnchorAddForm] = useState(null);

    useEffect(() => {
        fetchAllItems();
        fetchJournals();
    }, [])

    const fetchAllItems = () => {
        axios.get(`http://localhost:8000/api/alluseritems/?id=${currentUser.id}`)
            .then((result) => { storeFetchedItems(result.data) })
    }

    const fetchJournals = () => {
        axios.get(`http://localhost:8000/api/journals?id=${currentUser.id}`)
            .then((result) => { storeFetchedJournals(result.data) });
    }

    const storeFetchedItems = (items) => {
        if (items.length > 0) {
            let formattedItems = items.map(item => formatDate(item));
            console.log(formattedItems)
            setFetchedItems(formattedItems);
        }
    }

    const storeFetchedJournals = (journals) => {
        if (journals.length > 0) {
            setFetchedJournals(journals);
        }
    }

    function formatDate(item) {
        let date = new Date(item.date);

        let formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        item.date = formattedDate;
        console.log(item);
        return item;
    }

    const renderJournalsMenu = () => {
        if (Boolean(fetchedJournals)) {
            return (
                <List>
                    {
                        fetchedJournals.map(journal => {
                            return (
                                <JournalItem key={journal.id} journal={journal} />
                            );
                        })
                    }
                </List>
            );
        }
    }


    function openAddForm(event) {
        setAnchorAddForm(event.target)
    }

    function toggleJournalsMenu(toggle) {
        setJournalsMenuOpen(toggle);
    }

    function handleSelectType(event) {
        let currentType = event.target.textContent;
        let items = [];

        //If there are fetched items
        if (fetchedItems) {
            fetchedItems.forEach(item => {
                if (item.type == currentType && item.journal == currentJournalId) {
                    items.push(item)
                }
            })
        }

        setItemsToDisplay(items);
        setCurrentItemType(currentType);
    }

    function handleSelectJournal(event) {
        let journalId = event.currentTarget.id;
        let journal = event.target.textContent;
        let items = [];

        //If there are fetched items
        if (fetchedItems) {
            fetchedItems.forEach(item => {
                if (item.type == currentItemType && item.journal == journalId) {
                    items.push(item)
                }
            })
        }

        setItemsToDisplay(items);
        setCurrentJournal(journal);
        setcurrentJournalId(journalId);
    }


    const JournalItem = ({ journal }) => {
        return (
            <ListItemButton id={journal.id} onClick={handleSelectJournal}>
                <ListItemText primary={journal.name} color='blue' />
            </ListItemButton>
        );
    }

    return (

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            flexGrow: 1,
        }}>
            <AppBar
                sx={{ height: '50px', backgroundColor: 'white' }}
                position="static"
                color="secondary"
            >
                <Toolbar>
                    <Box mx={{ lg: 3 }}>
                        <Button
                            variant="text"
                            size="small"
                            sx={{ paddingBottom: '15px' }}
                            onClick={() => toggleJournalsMenu(true)}
                        >
                            <Typography>
                                {currentJournal ? currentJournal : 'Journals'}
                            </Typography>
                        </Button>

                        <Drawer
                            className="drawerJournals"
                            anchor={'left'}
                            open={isJournalsMenuOpen}
                            onClose={() => toggleJournalsMenu(false)}
                        >
                            <Box sx={{ padding: '15px' }} mx={{ lg: '10px' }} display={{ display: 'flex' }}>
                                <Typography variant='h5'>
                                    MY JOURNALS
                                </Typography>
                            </Box>
                            <Box >{renderJournalsMenu()}</Box>
                        </Drawer>

                    </Box>

                    <Box mx={3}>
                        <ButtonGroup
                            variant="outlined"
                            size="small"
                            sx={{ paddingBottom: '15px' }}

                        >
                            <Button onClick={handleSelectType}>Task</Button>
                            <Button onClick={handleSelectType}>Event</Button>
                        </ButtonGroup>
                    </Box>
                </Toolbar >
            </AppBar >
            <Box sx={{ display: 'flex', width: '100%', height: '80%', overflowY: 'auto' }}>
                <Box sx={{ width: '95%', height: '20%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        events={[
                            { title: 'event 1', date: '2019-04-01' },
                            { title: 'event 2', date: '2019-04-02' }
                        ]}

                    />
                </Box>
            </Box>
        </Box >
    );
}



export default Calendar;