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
    Popover
}
    from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

import { InputGroup, FormControl, Form } from 'react-bootstrap'


import axios from 'axios';

const NotePlanner = ({ user, type, journal }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [fetchedNotes, setFetchedNotes] = useState(new Array());
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        if (journal != null) {
            fetchNotes();
        }
    }, [])


    const fetchNotes = () => {
        axios.get(`http://localhost:8000/api/items?id=${user.id}&journal=${journal}&type=${type}`)
            .then((result) => { storeFetchedNotes(result.data) })
    }

    const storeFetchedNotes = (notes) => {
        setFetchedNotes(notes);
    }

    const handleNoteSelect = (note) => {
        setSelectedNote(note);
    }

    const Notes = () => {
        const ItemCard = ({ note }) => {
            return (
                <ListItemButton onClick={() => handleNoteSelect(note)}>
                    <CardContent sx={{ m: 'auto', boxShadow: 3, width: 300 }}>
                        <Typography variant="h5" >
                            {note.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} variant='caption' color="text.secondary">
                            <Typography variant="caption">
                                Last Updated:
                            </Typography>
                            {note.date}
                        </Typography>
                    </CardContent>
                </ListItemButton>
            );

        }

        const renderNotes = () => {
            return (
                <>{
                    fetchedNotes.map(note => {
                        return (
                            <ItemCard key={note.id} note={note} />
                        );
                    })

                }</>
            );
        }

        function handleAddNote() {

            let newNote = { user: user.id, type: 'Note', date: currentDate.toLocaleDateString(), journal: journal, status: 'Pending' };
            axios.post('http://localhost:8000/api/items/', newNote)
                .then(() => fetchNotes())
                .catch((error) => { console.log(error.response) })

            // const notes = [...notesToDisplay];
            // notes.push({ 'Title': 'Untitled', 'Date': new Date().toLocaleDateString() });
        }

        return (
            <Box className='items' sx={{ height: '100%', m: 3 }}>
                <List sx={{ overflowY: 'auto', height: '80%' }} resize='none'>
                    {renderNotes()}
                </List >
                <IconButton onClick={handleAddNote} sx={{ position: 'fixed', bottom: 0, left: 120 }}>
                    <AddCircleIcon sx={{ height: 64, width: 64 }} />
                </IconButton>
            </Box >
        );
    }

    const SearchBar = () => {
        return (
            <Box className='searchItem' width={{ lg: '90%' }}>
                <InputGroup className='m-3' style={{ width: '100%' }}>
                    <InputGroup.Text id='inputGroup-sizing-default'>
                        <SearchIcon />
                    </InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
            </Box>
        );
    }

    const NoteForm = () => {
        const [title, setTitle] = useState(null);
        const [body, setBody] = useState(null);

        const handleTitleChange = (event) => {
            setTitle(event.target.value);
        }

        const handleBodyChange = (event) => {
            setBody(event.target.value);
        }

        const handleSave = (event) => {
            event.preventDefault();
            let updatedNote = {
                user: selectedNote.user, type: selectedNote.type,
                title: title, body: body, date: currentDate.toLocaleDateString(), journal: selectedNote.journal, status: 'Pending'
            }

            axios.put(`http://localhost:8000/api/allitems/${selectedNote.id}/`, updatedNote)
                .then(() => { fetchNotes() })
        }

        const handleDelete = (event) => {
            axios.delete(`http://localhost:8000/api/allitems/${selectedNote.id}/`)
                .then(() => { fetchNotes() })
        }

        return (
            <Box display={{ lg: 'flex' }} flexDirection='column'>
                <Box display='flex' justifyContent='center' className="formLabel" m={3}>
                    <Typography variant='h5'>
                        NOTE DETAILS
                    </Typography>
                </Box>
                <Box className="form" m={3}>
                    <Form onSubmit={handleSave}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" placeholder="Title" onChange={handleTitleChange} defaultValue={selectedNote ? selectedNote.title : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control style={{ resize: 'none' }} as="textarea" rows={20} onChange={handleBodyChange} defaultValue={selectedNote ? selectedNote.body : ''} />
                        </Form.Group>
                        <Button id="saveNote" type='submit' sx={{ margin: 'auto' }} >Save</Button>
                        <Button id="deleteNote" onClick={handleDelete} sx={{ marginLeft: 'auto' }} >Delete</Button>
                    </Form>
                </Box>
            </Box>
        );
    }


    return (
        <Box display="flex" height="100%">
            <Box
                className='listItemsContainer'
                sx={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    width: '500px'
                }}
                boxShadow={4}
            >
                <SearchBar />
                <Notes />
            </Box>
            <Box
                sx={{
                    height: '100%',
                    width: '100%'
                }}
                boxShadow={4}
            >
                <NoteForm />
            </Box>
        </Box>
    );
}

export default NotePlanner;