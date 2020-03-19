import React, { Component } from 'react'
import SwapiService from '../../services/swapi-service';

export default class ItemDetails extends Component {
    state = {
        loading: true,
        item: null,
        error: false,
        image: null,
    }
    swapi = new SwapiService();
    componentWillReceiveProps(prevProps){
        if(prevProps.itemId !== this.props.itemId){
            this.updateItem(this.props.itemId);
        }
    }
    updateItem = (itemId) => {
        if(!itemId){
            return;
        }
        this.setState({...this.state, loading: true});
        this.swapi.getPerson(itemId).then(res=> this.setState((state)=> ({
            loading: false,
            item: res,
            image: this.swapi.getPersonImg(itemId),
            error: false
        }))).catch(error => this.setState((state) => ({
            loading: false,
            item: null,
            image: null,
            error: true,
        })))
    }

    render() {
        const {loading, item, error} = this.state;
        if(item === null && !loading){
            return(
                <h3>Please choose a character</h3>
            )
        }
        return (
            <div>
                {console.log(this.state.item)}
            </div>
        )
    }
}
