import { API, APICredentials } from "./API";

export abstract class APIObject {
    /** The API instance to use for making requests. */
    protected api: API;

    /**
     * Create a new API object.
     * 
     * @param api The API instance to use for making requests. Defaults to a new API instance if not provided.
     */
    protected constructor(credentials?: APICredentials) {
        this.api = new API(credentials);
    }

    /**
     * Convert the object to a JSON object.
     * 
     * This is mostly used for API call. But also sometimes for code reuse purposes.
     */
    abstract toJSON(): any;

    /**
     * Allows the object to be created from data.
     * 
     * @param data The data to create the object from.
     */
    abstract fromData<T>(data: T): APIObject | Promise<APIObject>;
}