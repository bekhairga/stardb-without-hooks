import React from 'react';
import './random-planet.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
// function RandomPlanet() {
//     const [planet, setPlanet] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setLoading(true);
//             const id = Math.floor(Math.random() * 17) + 2;
//             getPlanet(id).then((res) => setPlanet(res));
//             setLoading(false);
//         }, 3000);
//         return () => {
//             clearInterval(interval);
//         }
//     })
    
//     if(loading){
//         return (
//             <Spinner />
//         )
//     }
//     if(!loading) {
//         return (
       
//             <PlanetView planet= {planet}/>
//         )
//     }
// }


class RandomPlanet extends React.Component {

    state = {
        planet: null,
        loading: true,
        error: false
    }
    swapi = new SwapiService();

    componentDidMount(){
        this.interval = setInterval(this.updatePlanet, 3000);
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    // // interval =  setInterval(() => {
    // //     this.updatePlanet();
    // // }, 3000);

    updatePlanet = async() => {
        // this.setState((state) => ({
        //     ...state, 
        //     loading: true
        // }))
        const id = Math.floor(Math.random() * 17) + 2;
        this.swapi.getPlanet(id)
        .then((planet) => {this.setState((state) => ({
            planet,
            loading: false,
            error: false
        }))}
        ).catch(err => {
            this.setState((state) => ({
                planet: null,
                loading: false,
                error: true
            }))
        });
    }

    render() {
        const {planet, loading, error} = this.state;
        const whatToRender = loading ? <Spinner /> : <PlanetView planet = {planet} img = {this.swapi.getPlanetImg}/>
        return (
            <div className ="random-planet jumbotron rounded">
                {whatToRender}
            </div>
        )
    }
}





function PlanetView({planet, img}) {
    const {id, name,population, rotationPeriod, diameter} = planet;
    const image = img(id);
    
    return (
        <React.Fragment>
            <img src={image} alt="" className="planet-image"/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population </span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period </span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter </span>
                        <span>{diameter}</span>
                    </li>
                </ul >
            </div>
        </React.Fragment>   
    )
}

export default RandomPlanet
