import React, { Component } from 'react'
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list'
import ItemDetails from '../item-details';
// export default class App extends Component() {
//     state = {
//         selectedPerson: null,
//     }

//     // onItemSelected = (type, id) => {
//     //     if(type === 'people'){
//     //         this.setState(({selectedPerson}) => {
//     //             selectedPerson: id;
//     //         })
//     //     }
//     // }
//     render(){
//         return (
//             <div>
//                <Header />
//                <RandomPlanet />
//                <ItemList onItemSelected = {this.onItemSelected}/>
//                <ItemDetails itemId ={this.state.selectedPerson}/>
//             </div>
//         )
//     }
    
// }



export default class App extends Component {
    state = {
        selectedPerson: null,
    }
    onItemSelected = (id) => {
        this.setState(({selectedPerson}) => ({
            selectedPerson: id
        }))
    }
    render() {
        return (
            <div>
                <Header />
                <RandomPlanet />
                <ItemList onItemSelected = {this.onItemSelected}/>                <ItemDetails itemId ={this.state.selectedPerson}/>
            </div>
        )
    }
}
