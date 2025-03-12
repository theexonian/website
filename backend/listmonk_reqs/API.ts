import axios, { AxiosResponse } from 'axios';

/**
 * Type defining the credentials to use when authenticating with the Listmonk API.
 */
export type APICredentials = {
    host: string,
    username: string,
    password: string
}

/**
 * A class that provides an interface to the Listmonk API.
 */
export class API {
    /** The hostname of the Listmonk instance. */
    private host: string;
    /** The username to use when authenticating with Listmonk. */
    private username: string;
    /** The password to use when authenticating with Listmonk. */
    private password: string;

    /**
     * Create a new Listmonk API instance.
     * 
     * @param credentials The credentials to use when authenticating with Listmonk.
     */
    constructor(credentials?: APICredentials) {
        if(typeof credentials === 'undefined') {
            credentials = this.getDefaultCredentialsFromEnvVars();
        }
        
        this.host = credentials.host;
        this.username = credentials.username;
        this.password = credentials.password;
    }

    /**
     * Get the default credentials for the Listmonk API (as found in the environment variables).
     * 
     * The table below describes the environment variables that are used:
     * 
     * | Environment Variable | Description                                            |
     * | -------------------- | ------------------------------------------------------ |
     * | LISTMONK_HOST        | The hostname of the Listmonk instance.                 |
     * | LISTMONK_USERNAME    | The username to use when authenticating with Listmonk. |
     * | LISTMONK_PASSWORD    | The password to use when authenticating with Listmonk. |
     * 
     * @returns The default credentials for the Listmonk API (as found in the environment variables).
     */
    private getDefaultCredentialsFromEnvVars(): APICredentials {
        if(typeof process.env.LISTMONK_HOST === 'undefined' || process.env.LISTMONK_HOST === null || process.env.LISTMONK_HOST === '') {
            throw new Error('LISTMONK_HOST is not defined');
        }

        if(typeof process.env.LISTMONK_USERNAME === 'undefined' || process.env.LISTMONK_USERNAME === null || process.env.LISTMONK_USERNAME === '') {
            throw new Error('LISTMONK_USERNAME is not defined');
        }

        if(typeof process.env.LISTMONK_PASSWORD === 'undefined' || process.env.LISTMONK_PASSWORD === null || process.env.LISTMONK_PASSWORD === '') {
            throw new Error('LISTMONK_PASSWORD is not defined');
        }

        return {
            host: process.env.LISTMONK_HOST,
            username: process.env.LISTMONK_USERNAME,
            password: process.env.LISTMONK_PASSWORD
        };
    }

    /**
     * @returns The credentials for the Listmonk API.
     */
    getCredentials(): APICredentials {
        return {
            host: this.host,
            username: this.username,
            password: this.password
        }
    }

    /**
     * Make a GET request to the Listmonk API.
     * 
     * T (type parameter 1) is the type of the data returned by the API call.
     * 
     * @param endpoint The endpoint/path to send the GET request to (that is, the URL without the hostname).
     * @returns A promise that resolves to the results of the API call.
     */
    async get<T = any>(endpoint: string): Promise<T> {
        const results = await axios.get<{ data: { results: T } }>(endpoint.startsWith('/') ? this.host + '/api' + endpoint : this.host + '/api/' + endpoint, { auth: { username: this.username, password: this.password } })
            .then(response => { /*console.log(`${endpoint}: ${JSON.stringify(response.data, null, 4)}`);*/ return typeof response.data.data.results !== 'undefined' ? response.data.data.results : (response.data.data as T); });
        
        return results;
    }

    /**
     * Make a POST request to the Listmonk API.
     * 
     * T (type parameter 1) is the type of the data returned by the API call.
     * D (type parameter 2)  is the type of the data to send to the API.
     * 
     * @param endpoint The endpoint/path to send the POST request to (that is, the URL without the hostname).
     * @param data The data to send to the API.
     * @returns A promise that resolves to the result of the API call.
     */
    async post<D = any,T = any>(endpoint: string, data: D): Promise<T> {
        const results = await axios.post<T, AxiosResponse<T,any>,D>(endpoint.startsWith('/') ? this.host + '/api' + endpoint : this.host + '/api/' + endpoint, data, { auth: { username: this.username, password: this.password } }).then(response => response.data);
        
        return results;
    }

    /**
     * Make a PUT request to the Listmonk API.
     * 
     * T (type parameter 1) is the type of the data returned by the API call.
     * D (type parameter 2) is the type of the data to send to the API.
     * 
     * @param endpoint The endpoint/path to send the PUT request to (that is, the URL without the hostname).
     * @param data The data to send to the API.
     * @returns A promise that resolves to the result of the API call.
     */
    async put<D = any,T = any>(endpoint: string, data: D): Promise<T> {
        const results = await axios.put<T, AxiosResponse<T,any>,D>(endpoint.startsWith('/') ? this.host + '/api' + endpoint : this.host + '/api/' + endpoint, data, { auth: { username: this.username, password: this.password } }).then(response => response.data);
        
        return results;
    }

    /**
     * Make a DELETE request to the Listmonk API.
     * 
     * T (type parameter 1) is the type of the data returned by the API call.
     * 
     * @param endpoint The endpoint/path to send the DELETE request to (that is, the URL without the hostname).
     * @returns A promise that resolves to the result of the API call.
     */
    async delete<T = any>(endpoint: string): Promise<T> {
        const results = await axios.delete<T>(endpoint.startsWith('/') ? this.host + '/api' + endpoint : this.host + '/api/' + endpoint, { auth: { username: this.username, password: this.password } }).then(response => response.data);
        
        return results;
    }
}