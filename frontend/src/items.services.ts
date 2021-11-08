import config from './config';
import axios from 'axios';


export interface Item {
    id: number,
    text: string,
    checked: boolean,
}

export const getItems = () => {
    return axios.get(config.apiRoot + '/items', {});
}

export const updateItem = (item: Item) => {
    return axios.put(config.apiRoot + '/item/' + item.id, item);
}

export const deleteItem = (id: number) => {
    return axios.delete(config.apiRoot + '/item/' + id);
}

export const addItem = (text: string) => {
    return axios.post(config.apiRoot + '/item', {
        text: text,
        checked: false,
    });
}
