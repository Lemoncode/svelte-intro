import axios from 'axios';
import type { Character } from './api.model';

export const getCharacterDetail = async (id: string) =>
	axios
		.get<Character>(`https://rickandmortyapi.com/api/character/${id}`)
		.then((response) => response.data);
