import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles , Card } from '@material-ui/core';
import Controls from './Controls';
import SortArea from './SortArea';

const style = (theme) => ({
    controls: {
        background: 'rgba(255, 255, 255, 0.4)',
        '-webkit-box-shadow': '5px 5px 15px rgba(0,0,0,0.5)',
        width: '98%',
        height: '250px',
        marginLeft: '1%',
        marginTop: '1%',
        color:'white'
    },
    sortarea:{
        background: 'rgba(255, 255, 255, 0.4)',
        '-webkit-box-shadow': '5px 5px 15px rgba(0,0,0,0.5)',
        width: '98%',
        height: '74%',
        marginLeft: '1%',
        marginTop: '1%',
        color:'white'
    }
});

class VisualSort extends Component {
    constructor() {
        super();
        this.state = {
            array:[],
            method:'',
            set:0,
            selectionTime:'',
            swapTime:'',
            waitTime:''
        }
    }

    onSubmitClick=()=>{
        let temp=document.getElementById('form').elements.array.value.split(',').map(x=>parseInt(x));
        let temp2=document.getElementById('form').elements.method.value;
        let temp3=document.getElementById('form').elements.selectiontime.value;
        let temp4=document.getElementById('form').elements.swaptime.value;
        let temp5=document.getElementById('form').elements.waittime.value;
        this.setState({array:temp,method:temp2,set:1,selectionTime:temp3,swapTime:temp4,waitTime:temp5});
    }

    refresh=()=>{
        this.setState({array:[],method:'',set:0});
    }

    render() {
        const { classes } = this.props
        return (
            <div className='mainArea'>
                <Card className='Controls' classes={{root:classes.controls}}>
                    <Controls onSubmit={this.onSubmitClick} />
                </Card>
                <Card className='SortArea' classes={{root:classes.sortarea}}>
                    {this.state.set?<SortArea array={this.state.array} method={this.state.method} selectionTime={this.state.selectionTime} swapTime={this.state.swapTime} waitTime={this.state.waitTime} myRefresh={this.refresh}/>:null}
                </Card>
            </div>
        )
    }
}

VisualSort.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(style)(VisualSort);