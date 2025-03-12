import { APIObject } from "./APIObject";
import { API, APICredentials } from "./API";

export type ListData = {
    id?: number,
    uuid?: string,
    name: string,
    type: 'public' | 'private',
    optin?: 'single' | 'double',
    tags: string[],
    created_at?: string,
    updated_at?: string
};

export class List extends APIObject {
    private id?: number;
    private uuid?: string;
    private name: string;
    private type?: 'public' | 'private';
    private optin?: 'single' | 'double';
    private tags: string[];
    private createdAt?: string;
    private updatedAt?: string;

    constructor(credentials?: APICredentials, id?: number, uuid?: string, name?: string, type?: 'public' | 'private', optin?: 'single' | 'double', tags?: string[], createdAt?: string, updatedAt?: string) {
        super(credentials);

        this.id = id;
        this.uuid = uuid;
        this.name = typeof name !== 'undefined' ? name : '';
        this.type = type;
        this.optin = optin;
        this.tags = typeof tags !== 'undefined' ? tags : [];
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getID(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
    
    /**
     * Creates or updates the list in Listmonk.
     */
    async save() {
        const data = this.toJSON();

        // If the UUID is not set, then we assume we need to create the list in Listmonk
        if(typeof data.uuid === 'undefined') {
            // Technically, this might be unnecessary since the values should be set to undefined anyway, but it's good to be safe
            delete data.id;
            delete data.created_at;
            delete data.updated_at;
            delete data.uuid;

            // Make the API call to create the list in Listmonk
            await this.api.post<ListData>('/lists', data);
        } else {
            // Make the API call to update the list in Listmonk
            await this.api.post<ListData>('/lists/' + data.uuid, data);
        }
    }

    toJSON(): ListData {
        return {
            id: this.id,
            uuid: this.uuid,
            name: this.name,
            type: typeof this.type !== 'undefined' ? this.type : 'private',
            optin: this.optin,
            tags: this.tags,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }

    fromData<ListData>(data: ListData): List {
        const typedData = data as { id?: number, uuid?: string, name: string, type: 'public' | 'private', optin?: 'single' | 'double', tags: string[], created_at?: string, updated_at?: string };
        
        this.id = typedData.id;
        this.uuid = typedData.uuid;
        this.name = typedData.name;
        this.type = typedData.type;
        this.optin = typedData.optin;
        this.tags = typedData.tags;
        this.createdAt = typedData.created_at;
        this.updatedAt = typedData.updated_at;

        return this;
    }

    /**
     * Create a new List object with the given data.
     * 
     * Note, this doesn't automatically create the list in Listmonk. You need to call `save` to do that.
     * 
     * @param name Name of the new list.
     * @param type Type of list. Options: private, public.
     * @param optin Opt-in type. Options: single, double.
     * @param tags Associated tags for a list.
     * @param credentials Optional credentials to use for the API call.
     * @returns A new List object with the given data.
     */
    static async create(name: string, type: 'public' | 'private', optin: 'single' | 'double', tags?: string[], credentials?: APICredentials): Promise<List> {
        return await new List(credentials).fromData({ name, type, optin, tags });
    }

    /**
     * Find a list based on a predicate function.
     * 
     * @param predicate The function to use to find the desired list.
     * @param credentials Optional The credentials to use for the API call.
     * @returns The list that matches the predicate, or undefined if no list matches the predicate.
     */
    static async find(predicate: (list: List) => boolean, credentials?: APICredentials): Promise<List | undefined> {
        return await new API(credentials).get<ListData[]>('/lists')
            .then((lists: ListData[]) => {
                // Convert each LIstData JSOn object to a List object
                const listObjs: List[] = lists.map((list: ListData) => new List(credentials).fromData(list));

                // Use the predicate function provided to find the desired list
                const list = listObjs.find(predicate);
                
                return list;
            });
    }
}