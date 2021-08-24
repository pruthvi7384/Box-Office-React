const API_BASE_URL =  'https://api.tvmaze.com';
  // https://www.tvmaze.com/api

export async function apiget(queryString){
    const response = await fetch(`${API_BASE_URL}${queryString}`).then(r=>r.json());
    // throw new Error('Oppps')
    return response;
}