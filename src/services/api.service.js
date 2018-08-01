import axios from 'axios';

const HTTP = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};

const URL = 'https://api.github.com/repos/facebook/react';

const APIService = {
    /**
     * Basically returns the full url made from
     * path and the URL
     * */
    getUrl(path) {
        return `${URL}/${path}`;
    },

    /**
     * Generic request method where we can perform
     * some actions before making the request itself
     * ex: setting some params, headers, auth token...etc
     * */
    request(method, path) {
        const url = this.getUrl(path);

        return axios({
            method,
            url
        });
    },

    /**
     * GET method
     * */
    get(path) {
        return this.request(HTTP.GET, path);
    }
};

export default APIService;