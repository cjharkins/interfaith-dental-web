import { GET_DATA } from './types'

export const getData = () => async (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  dispatch({ type: 'FETCHING_POKEMON', payload: true })
  try {
    const getPokemon = await fetch('https://pokeapi.co/api/v2/pokemon/ditto', {
      method: 'GET',
    })
    const data = await getPokemon.json()
    dispatch({
      type: GET_DATA,
      payload: data,
    })
  } catch (ex) {
    console.error(ex)
  } finally {
    dispatch({ type: 'FETCHING_POKEMON', payload: false })
  }
  return
}
