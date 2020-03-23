/** @format */

import React from "react";
import "./item-list.css";
import PropType from "prop-types";
const ItemListView = ({ data, onItemSelected }) => {
    const items = data.results.map(item => (
        <li
            onClick={() => onItemSelected(item.id)}
            className="list-group-item"
            key={item.id}
        >
            {item.name}
        </li>
    ));
    return (
        <div>
            <ul className="item-list list-group">{items}</ul>
        </div>
    );
};
ItemListView.defaultProps = {
    data: {},
    onItemSelected: () => {}
};
ItemListView.propTypes = {
    data: PropType.object,
    onItemSelected: PropType.func
};
export default ItemListView;
