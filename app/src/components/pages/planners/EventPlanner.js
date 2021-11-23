import { React, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    TextField,
    Button,
    ButtonGroup,
    InputBase,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    Item,
    Collapse,
    Checkbox,
    Menu,
    ButtonBase,
    Popover,
    Modal
}
    from '@mui/material';



import { Form } from 'react-bootstrap'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

import axios from 'axios';


const EventPlanner = ({ user, type, journal }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [anchorAddForm, setAnchorAddForm] = useState(null);
    const [anchorEditForm, setAnchorEditForm] = useState(null);
    const [fetchedEvents, setFetchedEvents] = useState(new Array());
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [anchorDatePicker, setAnchorDatePicker] = useState(null);

    const datePickerOpen = Boolean(anchorDatePicker);

    const addFormOpen = Boolean(anchorAddForm);
    const editFormOpen = Boolean(anchorEditForm);


    useEffect(() => {
        //Fetch when a journal is selected
        if (journal != null) {
            fetchEvents();
        }
    }, [])

    const fetchEvents = () => {
        axios.get(`http://localhost:8000/api/items?id=${user.id}&journal=${journal}&type=${type}`)
            .then((result) => { storeFetchedTasks(result.data) });
    }
    const storeFetchedTasks = (events) => {
        setFetchedEvents(events);
    }

    const toggleEditModal = (toggle) => {
        setEditModalOpen(toggle);
    }

    const handleDelete = (event) => {
        axios.delete(`http://localhost:8000/api/allitems/${event.id}/`)
            .then((result => { console.log(result) }))
            .then(() => { fetchEvents() })
    }

    const handleSetStatus = (event) => {
        let updatedTask = {}
        console.log()
        if (event.status == 'Pending') {
            updatedTask = {
                user: event.user, type: event.type,
                title: event.title, body: event.body, date: event.date, journal: event.journal, status: 'Completed'
            }

            axios.put(`http://localhost:8000/api/allitems/${event.id}/`, updatedTask)
                .then(() => { fetchEvents() })
        }
        else {
            updatedTask = {
                user: event.user, type: event.type,
                title: event.title, body: event.body, date: event.date, journal: event.journal, status: 'Pending'
            }

            axios.put(`http://localhost:8000/api/allitems/${event.id}/`, updatedTask)
                .then(() => { fetchEvents() })
                .catch((error) => { console.log(error.response) })
        }
    }

    const EventCard = ({ event }) => {
        return (
            <Grid sx={{ boxShadow: 4 }} item lg={4}>
                <Box sx={{ display: 'flex', height: '100%', width: '100%', padding: 0 }}>
                    <Card sx={{ width: '100%', height: '100%' }}>
                        <CardHeader
                            title={event.title}
                            subheader={event.date}
                        />
                        <CardActions disableSpacing>
                            <IconButton aria-label="Delete" onClick={() => handleDelete(event)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton aria-label="Edit" onClick={openEditForm} >
                                <EditIcon />
                            </IconButton>
                            <Checkbox
                                sx={{ marginLeft: 'auto' }}
                                checked={(event.status == 'Completed') ? true : false}
                                onChange={() => { handleSetStatus(event) }}
                            />
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
        );
    }

    const EditModal = ({ }) => {
        return (
            <Modal
                open={editModalOpen}
                onClose={() => { toggleEditModal(false) }}
                sx={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    margin: 0
                }}
            >
                <Box height='100%'>
                    <Form >
                        <Form.Control type='text' />
                    </Form>
                </Box>
            </Modal>
        );
    }

    const filterEvents = () => {
        let events = []

        fetchedEvents.forEach(event => {
            if (event.date == currentDate.toLocaleDateString()) {
                events.push(event);
            }
        })

        // setTasksToDisplay(events);
        return events;
    }

    const renderEvents = () => {
        let display = filterEvents();

        return (
            display.map(event => {
                return <EventCard id={event.id} key={event.id} event={event} />
            })
        );
    }

    const EditForm = ({ currEvent }) => {
        const [eventTitle, setEventTitle] = useState(currEvent.title);


        const handleChangeTitle = (event) => {
            setEventTitle(event.target.value);
        }

        const handleEditEvent = (event) => {
            event.preventDefault();

            let date = new Date();

            let newEvent = { user: user.id, type: 'Task', title: eventTitle, body: null, date: date.toLocaleDateString(), journal: journal, status: currEvent.status };

            axios.put(`http://localhost:8000/api/allitems/${currEvent.id}/`, newEvent)
                .then(() => { fetchEvents() })


        }

        return (
            <Menu
                sx={{ padding: 3 }}
                open={editFormOpen}
                onClose={closeEditForm}
                anchorEl={anchorEditForm}
            >
                <Box display='flex'>
                    <Form onSubmit={handleEditEvent}>
                        <Form.Control onChange={handleChangeTitle} id="taskField" type="text" defaultValue={currEvent.title} />
                        <Button margin='auto' type='submit'>Edit</Button>
                    </Form>
                </Box>
            </Menu>
        );
    }



    const AddForm = () => {
        const [eventTitle, setEventTitle] = useState('');


        const handleChangeTitle = (event) => {
            setEventTitle(event.target.value);
        }

        const handleAddTask = (event) => {
            event.preventDefault();

            let date = new Date();

            let newTask = { user: user.id, type: 'Event', title: eventTitle, body: null, date: date.toLocaleDateString(), journal: journal, status: 'Pending' };

            axios.post('http://localhost:8000/api/items/', newTask)
                .then((result) => { fetchEvents() })


        }

        return (
            <Menu
                sx={{ padding: 3 }}
                open={addFormOpen}
                onClose={closeAddForm}
                anchorEl={anchorAddForm}
            >
                <Box display='flex'>
                    <Form onSubmit={handleAddTask}>
                        <Form.Control onChange={handleChangeTitle} id="taskField" type="text" placeholder="Enter Event Name" />
                        <Button margin='auto' type='submit'>Add</Button>
                    </Form>
                </Box>
            </Menu>
        );
    }

    const handleDateChange = (identifier) => {
        let today = currentDate;
        let newDate = new Date(today);
        newDate.setDate(newDate.getDate() + identifier);
        setCurrentDate(newDate);

    }

    const openAddForm = (event) => {
        setAnchorAddForm(event.target);
    }

    const closeAddForm = () => {
        setAnchorAddForm(null);
    }

    const openEditForm = (event) => {
        setAnchorEditForm(event.target);
    }

    const closeEditForm = () => {
        setAnchorEditForm(null);
    }

    const openDatePicker = (event) => {
        setAnchorDatePicker(event.target);
    }

    const closeDatePicker = () => {
        setAnchorDatePicker(null);
    }


    return (
        <Box display='flex' flexDirection='column' height="100%" width="100%" >
            <Box flexGrow={1}>
                <AppBar
                    sx={{ height: '100px', backgroundColor: '#e3f6ff', boxShadow: 4 }}
                    position="static"
                >
                    <Box display='flex' m={3} >
                        <Typography variant='h3' color='black'>
                            EVENTS
                        </Typography>
                        <IconButton onClick={openAddForm}>
                            <AddIcon fontSize='large' />
                        </IconButton>
                        <AddForm />

                        <Box display='flex' marginLeft='auto'>
                            <IconButton onClick={() => handleDateChange(-1)}>
                                <NavigateBeforeIcon />
                            </IconButton>

                            <ButtonBase onClick={openDatePicker}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} display='flex' textAlign='center'>

                                        <Typography variant='h3' margin='auto' color='black'>
                                            {currentDate.getDate()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid item xs={12}>
                                            <Typography variant='caption' color='black' >
                                                {currentDate.toLocaleString('default', { month: 'short' })}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant='caption' color='black'>
                                                {currentDate.getFullYear()}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ButtonBase>

                            <Popover
                                open={datePickerOpen}
                                anchorEl={anchorDatePicker}
                                onClose={closeDatePicker}
                            >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        openTo="day"
                                        value={currentDate}
                                        renderInput={(params) => <TextField {...params} />}
                                        onChange={(date) => { setCurrentDate(date) }}
                                        onClose={closeDatePicker}
                                    />
                                </LocalizationProvider>
                            </Popover>

                            <IconButton onClick={() => handleDateChange(1)}>
                                <NavigateNextIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </AppBar >
            </Box>
            <Box className='eventsView' width='100%' height='100%' p={3} >
                <Grid container spacing={2}>
                    {renderEvents()}
                </Grid>
            </Box>
            <EditModal />
        </Box >

    );
}

export default EventPlanner;