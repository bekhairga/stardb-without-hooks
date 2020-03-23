import React, { Component } from "react";
import Spinner from "../spinner";
import ItemListView from "./item-list-view";
import PropType from "prop-types";
const ItemListLogic = View => {
    return class ItemList extends Component {
        state = {
            data: null,
            loading: true,
            catch: false
        };
        componentDidMount() {
            this.setState(state => ({ ...state, loading: true }));
            this.props
                .getData()
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
            const { loading, data } = this.state;
            const { onItemSelected } = this.props;
            if (loading) {
                return <Spinner />;
            }
            if (!loading) {
                return <View data={data} onItemSelected={onItemSelected} />;
            }
        }
    };
};

ItemListLogic.defaultProps = {
    onItemSelected: () => {}
};
ItemListLogic.propTypes = {
    onItemSelected: PropType.func
};
export default ItemListLogic(ItemListView);
