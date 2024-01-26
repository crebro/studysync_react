import axios from 'axios';

export const authenticatedRequest = (url) => {
    const response = axios.get(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response;
}

export const authenticatedPost = (url, data) => {
    const response = axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response;
}
