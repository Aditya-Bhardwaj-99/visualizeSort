import React, { Component } from 'react';
import { withStyles, Button } from '@material-ui/core'
import PropTypes from 'prop-types';

const style = (themes) => ({

})

class SortArea extends Component {
    constructor() {
        super();
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.setState({ array: this.props.array });
    }

    waithere = async (time) => {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    };

    bubblersort = async () => {
        let temp = this.state.array;
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp.length - i - 1; j++) {
                document.getElementById(j + "bar").childNodes[0].style.background =
                    "red";
                document.getElementById(j + 1 + "bar").childNodes[0].style.background =
                    "red";
                await this.waithere(this.props.selectionTime);
                if (temp[j] > temp[j + 1]) {
                    let x = temp[j];
                    temp[j] = temp[j + 1];
                    temp[j + 1] = x;
                    document.getElementById(
                        j + 1 + "bar"
                    ).childNodes[0].style.background = "green";
                    document.getElementById(j + "bar").childNodes[0].style.background =
                        "green";
                    await this.waithere(this.props.swapTime);
                    this.setState({ array: temp });
                }
                await this.waithere(this.props.waitTime).then(() => {
                    document.getElementById(j + "bar").childNodes[0].style.background =
                        "#0099ff";
                    document.getElementById(
                        j + 1 + "bar"
                    ).childNodes[0].style.background = "#0099ff";
                });
            }
        }
    };

    swap = (items, leftIndex, rightIndex) => {
        var temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;
    };

    partition = async (items, left, right) => {
        return new Promise(async (resolve) => {
            var pivot = items[parseInt((right + left) / 2)], //middle element
                i = left, //left pointer
                j = right; //right pointer
            document.getElementById(
                parseInt((right + left) / 2) + "bar"
            ).childNodes[0].style.background = "orange";
            while (i <= j) {
                while (items[i] < pivot) {
                    i++;
                    document.getElementById(i + "bar").childNodes[0].style.background =
                        "red";
                    if (document.getElementById(i - 1 + "bar"))
                        document.getElementById(
                            i - 1 + "bar"
                        ).childNodes[0].style.background = "#0099ff";
                    await this.waithere(this.props.selectionTime);
                }
                while (items[j] > pivot) {
                    j--;
                    document.getElementById(j + "bar").childNodes[0].style.background =
                        "red";
                    if (document.getElementById(j + 1 + "bar"))
                        document.getElementById(
                            j + 1 + "bar"
                        ).childNodes[0].style.background = "#0099ff";
                    await this.waithere(this.props.selectionTime);
                }
                if (i < j) {
                    document.getElementById(j + "bar").childNodes[0].style.background =
                        "red";
                    document.getElementById(i + "bar").childNodes[0].style.background =
                        "red";
                    await this.waithere(this.props.selectionTime);
                    document.getElementById(i + "bar").childNodes[0].style.background =
                        "green";
                    document.getElementById(j + "bar").childNodes[0].style.background =
                        "green";
                    this.swap(items, i, j);
                    document.getElementById(i + "bar").childNodes[0].style.background =
                        "green";
                    document.getElementById(j + "bar").childNodes[0].style.background =
                        "green";
                    await this.waithere(this.props.swapTime);
                    document.getElementById(i + "bar").childNodes[0].style.background =
                        "#0099ff";
                    document.getElementById(j + "bar").childNodes[0].style.background =
                        "#0099ff";
                    i++;
                    j--;
                    this.setState({ array: items });
                    await this.waithere(this.props.waitTime);
                } else if (i === j) {
                    document.getElementById(i + "bar").childNodes[0].style.background =
                        "#0099ff";
                    document.getElementById(j + "bar").childNodes[0].style.background =
                        "#0099ff";
                    i++;
                    j--;
                }
            }
            if (document.getElementById(pivot + "bar"))
                document.getElementById(pivot + "bar").childNodes[0].style.background =
                    "#0099ff";
            resolve(i);
        });
    };

    quicksort = async (items, left, right) => {
        var index;
        if (items.length > 1) {
            index = await this.partition(items, left, right);
            await this.waithere(1000); //index returned from partition
            if (left < index - 1) {
                //more elements on the left side of the pivot
                this.quicksort(items, left, index - 1);
                this.setState({ array: items });
            }
            if (index < right) {
                //more elements on the right side of the pivot
                this.quicksort(items, index, right);
                this.setState({ array: items });
            }
        }
        this.setState({ array: items });
    };
    

    merge = async(arr, l, m, r,temp) => {
        console.log(arr+'\n'+l+'\n'+m+'\n'+r);
        
    }

    mergesort = async(arr,l,r,temp) => {
        if(l<r){
            var mid=parseInt(l+(r-l)/2);
            console.log(mid);
            if(document.getElementById(mid+'bar'))document.getElementById(mid+'bar').style.marginRight='5px';
            this.mergesort(arr,l,mid,temp);
            this.mergesort(arr,mid+1,r,temp);
            await this.waithere(this.props.selectionTime);
            for(var i=l;i<=r;i++){
                for(var j=0;j<=r-i-1;j++){
                    if (arr[j] > arr[j + 1]) {
                        let x = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = x;
                    }
                }
                await this.waithere(this.props.waitTime);
            }
            console.log(l+' '+r);
            this.setState({array:arr});
            await this.waithere(this.props.swapTime);
            document.getElementById(mid+'bar').style.marginRight='0px';
            await this.waithere(this.props.waitTime);
        }
    }

    startsort = async () => {
        switch (this.props.method) {
            case "merge":
                this.mergesort(this.state.array, 0, (this.state.array.length - 1),this.state.array);
                break;
            case "quick":
                await this.quicksort(this.state.array, 0, this.state.array.length - 1);
                break;
            case "bubble":
                this.bubblersort();
                break;
            default:
                alert("no sort was given");
                this.props.myRefresh();
                break;
        }
    };

    render() {
        return (
            <div className="sortarea">
                <div
                    style={{
                        display: "flex",
                        marginLeft: "1%",
                        marginTop: "1%",
                        marginBottom: "1%",
                    }}
                >
                    {this.state.array.map((val, i) => (
                        <div id={i + "bar"} style={{ transform: "rotateZ(180deg)" }}>
                            <div
                                style={{
                                    width: "1px",
                                    height: val + "px",
                                    background: "#0099ff",
                                    marginLeft: "1px",
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
                <Button onClick={this.startsort} variant="contained">
                    Start Sort
        </Button>
                <Button onClick={this.props.myRefresh} variant="contained">
                    Reset
        </Button>
            </div>
        );
    }
}

SortArea.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(style)(SortArea);