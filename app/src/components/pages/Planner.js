import { React, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Tooltip,
    TextField,
    Button,
    ButtonGroup,
    Menu
}
    from '@mui/material';

import ItemsView from './ItemsView'
import axios from 'axios';
import { Form } from 'react-bootstrap'


const Planner = ({ currentUser }) => {
    const [currentJournal, setCurrentJournal] = useState(null);
    const [currentJournalId, setcurrentJournalId] = useState(null);

    const [isJournalsMenuOpen, setJournalsMenuOpen] = useState(false);
    const [currentItemType, setCurrentItemType] = useState(null);
    const [fetchedJournals, setFetchedJournals] = useState(null);

    const [anchorAddForm, setAnchorAddForm] = useState(null);
    const addFormOpen = Boolean(anchorAddForm);


    const fetchJournals = () => {
        axios.get(`http://localhost:8000/api/journals?id=${currentUser.id}`)
            .then((result) => { storeFetchedJournals(result.data) });
    }

    useEffect(() => {
        fetchJournals();
    }, [])

    function storeFetchedJournals(journals) {
        if (journals.length > 0) {
            setFetchedJournals(journals);
        }
    }

    //Set the current selected journal
    function handleSelectJournal(event) {
        let journalId = event.currentTarget.id;
        let journal = event.target.textContent;
        setCurrentJournal(journal);
        setcurrentJournalId(journalId);
    }


    //Set the current item view to display
    function handleSelectType(event) {
        let currentType = event.target.textContent;
        setCurrentItemType(currentType);
    }

    function toggleJournalsMenu(toggle) {
        setJournalsMenuOpen(toggle);
    }

    function closeAddForm() {
        setAnchorAddForm(null);
    }

    function openAddForm(event) {
        setAnchorAddForm(event.target)
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

    const JournalItem = ({ journal }) => {

        const handleDelete = () => {
            axios.delete(`http://localhost:8000/api/alljournals/${journal.id}/`)
                .then((result => { console.log(result) }))
                .then(() => { fetchJournals() })
        }

        return (
            <ListItemButton id={journal.id} onClick={handleSelectJournal}>
                <ListItemText primary={journal.name} color='blue' />
                <Box>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </ListItemButton>
        );
    }



    const AddForm = () => {
        const [journalTitle, setJournalTitle] = useState('');


        const handleChangeTitle = (event) => {
            setJournalTitle(event.target.value);
        }

        const handleAddJournal = (event) => {
            event.preventDefault();


            let date = new Date();

            let currentDate = date.toLocaleDateString();

            let newJournal = { name: journalTitle, date_created: currentDate, user: currentUser.id };

            axios.post('http://localhost:8000/api/journals/', newJournal)
                .then((result) => { fetchJournals() })

        }

        return (
            <Menu
                sx={{ padding: 3 }}
                open={addFormOpen}
                onClose={closeAddForm}
                anchorEl={anchorAddForm}
            >
                <Box display='flex'>
                    <Form onSubmit={handleAddJournal}>
                        <Form.Control onChange={handleChangeTitle} id="taskField" type="text" placeholder="Enter the name of the journal" required />
                        <Button margin='auto' type='submit'>Add</Button>
                    </Form>
                </Box>
            </Menu>
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

                                <Tooltip title='Add'>
                                    <IconButton
                                        mx={{ lg: '15px' }}
                                        onClick={openAddForm}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>


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
                            <Button onClick={handleSelectType}>Notes</Button>
                        </ButtonGroup>
                    </Box>
                </Toolbar >
            </AppBar >
            <Box
                position='static'
                sx={{ display: 'flex' }}
                height='100%'
                mx={{ xl: '200px', md: '0' }}
            >
                <Box
                    className='itemsView'
                    sx={{
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                    boxShadow={4}
                >
                    {currentJournal ? <ItemsView currentUser={currentUser} currentType={currentItemType} currentJournalId={currentJournalId} /> : null}
                </Box>
            </Box>
            <AddForm />
        </Box >
    );
}

export default Planner;