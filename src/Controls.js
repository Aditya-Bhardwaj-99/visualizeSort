import React, { Component } from 'react';
import { Select, TextField, Button, MenuItem, Toolbar, withStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import PropTypes from 'prop-types';

const style = (theme) => ({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        }
    },
    input: {
        color: 'white'
    }
})

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff'
        },
        secondary: {
            main: '#11cb5f',
        },
    },
});

class Controls extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    onChange = (e) => {
        this.setState({ value: e.target.value });
    }

    render() {
        const { classes } = this.props
        return (
            <div className='controls'>
                <ThemeProvider theme={theme}>
                    <h1> Visualising Sorting Algorithms </h1>
                    <form className='form' name='form' id='form'>
                        <Toolbar variant="dense">
                            <TextField InputProps={{ className: classes.input }} style={{ marginLeft: '26%' }} classes={{ root: classes.root }} edge='start' placeholder='ex: 1,2,3,4....' className='array' name='array'>Select Sort</TextField>
                            <Select style={{ width: '15%', marginLeft: '5%', color: 'white' }} color='primary' edge='end' labelId='sortlabel' className='dropdown' name='method' value={this.state.value} onChange={this.onChange}>
                                <MenuItem value='quick'>Quick Sort</MenuItem>
                                <MenuItem value='merge'>Merge Sort</MenuItem>
                                <MenuItem value='bubble'>Bubble Sort</MenuItem>
                            </Select>
                            <Button style={{ marginLeft: '5%' }} variant="contained" edge='end' onClick={this.props.onSubmit}>Set Sort</Button>
                        </Toolbar>
                    </form>
                </ThemeProvider>
            </div>
        )
    }
}

Controls.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(style)(Controls);