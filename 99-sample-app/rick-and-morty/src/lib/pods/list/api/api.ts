import axios from 'axios';
import type { ApiResponse } from './api.model';

export const getCharacterList = async () =>
	axios
		.get<ApiResponse>('https://rickandmortyapi.com/api/character')
		.then((response) => response.data);
