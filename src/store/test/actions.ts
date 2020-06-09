import { TestState, GET_DATA} from './types';

export async function getData() {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(response => {
        return {
            type: GET_DATA,
            payload: response
        }
    });
};