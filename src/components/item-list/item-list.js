import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import "./item-list.css";
export default class ItemList extends Component {
	state = {
		data: null,
		loading: true,
		catch: false
	};
	swapi = new SwapiService();
	componentDidMount() {
		this.setState(state => ({ ...state, loading: true }));
		this.swapi
			.getAllPeople()
			.then(res =>
				this.setState(state => ({
					loading: false,
					data: res,
					error: false
				}))
			)
			.catch(err =>
				this.setState(state => ({
					loading: false,
					data: null,
					error: true
				}))
			);
	}

	render() {
		const { loading, data, error } = this.state;
		const { onItemSelected } = this.props
		if (loading) {
			return <Spinner />;
		}
		if (!loading) {
			const items = data.results.map(item => (
				<li
					onClick={() => onItemSelected(item.id)}
					className='list-group-item'
					key={item.id}>
					{item.name}
				</li>
			));
			return (
				<div>
					<ul className='item-list list-group'>{items}</ul>
				</div>
			);
		}
	}
}
