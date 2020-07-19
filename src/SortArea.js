import React, { Component } from 'react';
import { withStyles, Button } from '@material-ui/core'
import PropTypes from 'prop-types';

const style = (themes) => ({

})

class SortArea extends Component {
    constructor() {
        super();
        this.state = {
            array:[]
        }
    }

    componentDidMount(){
        this.setState({array:this.props.array});
    }

    startsort=()=>{
        switch(this.props.method){
            case 'merge': this.mergesort();
            break;
            case 'quick': this.quicksort();
            break;
            case 'bubble': this.bubblersort();
            break;
            default: alert('no sort was given');
            this.props.myRefresh();
            break;
        }
    }

    render() {
        return (
            <div className='sortarea'>
                <div style={{ display: 'flex', marginLeft:'1%', marginTop:'1%',marginBottom:'1%' }}>
                    {this.state.array.map((val, i) => (
                        <div id={i + 'bar'} style={{transform:'rotateZ(180deg)'}}>
                            <div style={{ width: '10px', height: val * 40 + 'px', background: '#0099ff', marginLeft: '2px' }}></div>
                        </div>
                    ))}
                </div>
                <Button onClick={this.startsort} variant='contained'>Start Sort</Button>
            </div>
        )
    }
}

SortArea.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(style)(SortArea);