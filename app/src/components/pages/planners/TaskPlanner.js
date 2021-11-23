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


const TaskPlanner = ({ user, type, journal }) => {
    const [tasksToDisplay, setTasksToDisplay] = useState(new Array())
    const [currentDate, setCurrentDate] = useState(new Date());
    const [anchorAddForm, setAnchorAddForm] = useState(null);
    const [anchorEditForm, setAnchorEditForm] = useState(null);
    const [fetchedTasks, setFetchedTasks] = useState(new Array());
    const [anchorDatePicker, setAnchorDatePicker] = useState(null);

    const datePickerOpen = Boolean(anchorDatePicker);

    const editFormOpen = Boolean(anchorEditForm);
    const addFormOpen = Boolean(anchorAddForm);


    useEffect(() => {
        //Fetch when a journal is selected
        if (journal != null) {
            fetchTasks();
        }
    }, [])

    const fetchTasks = () => {
        axios.get(`http://localhost:8000/api/items?id=${user.id}&journal=${journal}&type=${type}`)
            .then((result) => { storeFetchedTasks(result.data) });
    }
    const storeFetchedTasks = (tasks) => {
        setFetchedTasks(tasks);
    }


    const handleDelete = (task) => {
        axios.delete(`http://localhost:8000/api/allitems/${task.id}/`)
            .then((result => { console.log(result) }))
            .then(() => { fetchTasks() })
    }

    const handleSetStatus = (task) => {
        let updatedTask = {}
        console.log()
        if (task.status === 'Pending') {
            updatedTask = {
                user: task.user, type: task.type,
                title: task.title, body: task.body, date: task.date, journal: task.journal, status: 'Completed'
            }

            axios.put(`http://localhost:8000/api/allitems/${task.id}/`, updatedTask)
                .then(() => { fetchTasks() })
        }
        else {
            updatedTask = {
                user: task.user, type: task.type,
                title: task.title, body: task.body, date: task.date, journal: task.journal, status: 'Pending'
            }

            axios.put(`http://localhost:8000/api/allitems/${task.id}/`, updatedTask)
                .then(() => { fetchTasks() })
                .catch((error) => { console.log(error.response) })
        }
    }

    const TaskCard = ({ task }) => {
        return (
            <Grid sx={{ boxShadow: 4 }} item lg={4}>
                <Box sx={{ display: 'flex', height: '100%', width: '100%', padding: 0 }}>
                    <Card sx={{ width: '100%', height: '100%' }}>
                        <CardHeader
                            title={task.title}
                            subheader={task.date}
                        />
                        <CardActions disableSpacing>
                            <IconButton aria-label="Delete" onClick={() => handleDelete(task)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton aria-label="Edit" onClick={openEditForm}>
                                <EditIcon />
                            </IconButton>
                            <EditForm currTask={task} />
                            <Checkbox
                                sx={{ marginLeft: 'auto' }}
                                checked={(task.status === 'Completed') ? true : false}
                                onChange={() => { handleSetStatus(task) }}
                            />
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
        );
    }

    const filterTasks = () => {
        let tasks = []

        fetchedTasks.forEach(task => {
            if (task.date === currentDate.toLocaleDateString()) {
                tasks.push(task);
            }
        })

        // setTasksToDisplay(tasks);
        return tasks;
    }

    const renderTasks = () => {
        let display = filterTasks();

        return (
            display.map(task => {
                return <TaskCard id={task.id} key={task.id} task={task} />
            })
        );
    }

    const EditForm = ({ currTask }) => {
        const [taskTitle, setTaskTitle] = useState(currTask.title);


        const handleChangeTitle = (event) => {
            setTaskTitle(event.target.value);
        }

        const handleEditTask = (event) => {
            event.preventDefault();

            let date = new Date();

            let newTask = { user: user.id, type: 'Task', title: taskTitle, body: null, date: date.toLocaleDateString(), journal: journal, status: currTask.status };

            axios.put(`http://localhost:8000/api/allitems/${currTask.id}/`, newTask)
                .then(() => { fetchTasks() })


        }

        return (
            <Menu
                sx={{ padding: 3 }}
                open={editFormOpen}
                onClose={closeEditForm}
                anchorEl={anchorEditForm}
            >
                <Box display='flex'>
                    <Form onSubmit={handleEditTask}>
                        <Form.Control onChange={handleChangeTitle} id="taskField" type="text" defaultValue={currTask.title} />
                        <Button margin='auto' type='submit'>Edit</Button>
                    </Form>
                </Box>
            </Menu>
        );
    }

    const AddForm = () => {
        const [taskTitle, setTaskTitle] = useState('');


        const handleChangeTitle = (event) => {
            setTaskTitle(event.target.value);
        }

        const handleAddTask = (event) => {
            event.preventDefault();

            let date = new Date();

            let newTask = { user: user.id, type: 'Task', title: taskTitle, body: null, date: date.toLocaleDateString(), journal: journal, status: 'Pending' };

            axios.post('http://localhost:8000/api/items/', newTask)
                .then((result) => { fetchTasks() })


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
                        <Form.Control onChange={handleChangeTitle} id="taskField" type="text" placeholder="Enter Task" />
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
        setAnchorEditForm(event.target)
    }

    const closeEditForm = () => {
        setAnchorEditForm(null)
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
                            TASKS
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
            <Box className='tasksView' width='100%' height='100%' p={3} >
                <Grid container spacing={2}>
                    {renderTasks()}
                </Grid>
            </Box>
        </Box >

    );
}

export default TaskPlanner;