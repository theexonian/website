import { APIObject } from "./APIObject";
import { API, APICredentials } from "./API";
import { List } from "./List";
import { ListMembership, ListMembershipData } from "./ListMembership";

type SubscriberData = {
    id?: number,
    uuid?: string,
    email: string,
    name: string,
    attribs: {
        [key: string]: any
    },
    status: "enabled" | "blocklisted",
    lists: number[] | ListMembershipData[],
    created_at?: string,
    updated_at?: string
};

export class Subscriber extends APIObject {
    private id?: number;
    private uuid?: string;
    private email: string;
    private name: string;
    private attribs: { [key: string]: any };
    private status?: 'enabled' | 'blocklisted';
    private lists: ListMembership[];
    private createdAt?: string;
    private updatedAt?: string;

    constructor(credentials?: APICredentials, id?: number, uuid?: string, email?: string, name?: string, attribs?: { [key: string]: any }, status?: 'enabled' | 'blocklisted', lists?: ListMembership[],  createdAt?: string, updatedAt?: string) {
        super(credentials);

        this.id = id;
        this.uuid = uuid;
        this.email = typeof email !== 'undefined' ? email : '';
        this.name = typeof name !== 'undefined' ? name : '';
        this.attribs = typeof attribs !== 'undefined' ? attribs : {};
        this.status = status;
        this.lists = typeof lists !== 'undefined' ? lists : [];
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getID(): number | undefined {
        return this.id;
    }

    getUUID(): string | undefined {
        return this.uuid;
    }

    getEmail(): string {
        return this.email;
    }

    getName(): string {
        return this.name;
    }

    getAttributes(): { [key: string]: any } {
        return this.attribs;
    }
    hasAttribute(key: string): boolean {
        return typeof this.attribs[key] !== 'undefined';
    }
    getAttribute(key: string): any {
        return this.hasAttribute(key) ? this.attribs[key] : undefined;
    }
    setAttribute(key: string, value: any) {
        this.attribs[key] = value;
    }
    removeAttribute(key: string) {
        delete this.attribs[key];
    }

    getStatus(): 'enabled' | 'blocklisted' | undefined {
        return this.status;
    }

    getLists(): ListMembership[] {
        return this.lists;
    }
    addList(list: List) {
        this.lists.push(new ListMembership(this.api.getCredentials()).fromData({ subscription_status: 'unconfirmed', ...list.toJSON() }));
    }
    removeList(list: ListMembership) {
        this.lists = this.lists.filter((listMembership: ListMembership) => listMembership !== list);
    }

    getCreatedAt(): string | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): string | undefined {
        return this.updatedAt;
    }

    /**
     * Creates or updates the subscriber in Listmonk.
     */
    async save() {
        const data = this.toJSON();

        // If the UUID is not set, then we assume we need to create the subscriber in Listmonk
        if(typeof data.uuid === 'undefined') {
            // Technically, this might be unnecessary since the values should be set to undefined anyway, but it's good to be safe
            delete data.id;
            delete data.created_at;
            delete data.updated_at;
            delete data.uuid;

            // Make the API call to create the subscriber in Listmonk
            await this.api.post<SubscriberData>('/subscribers', data);
        }
        else {
            await this.api.put<SubscriberData>('/subscribers/' + data.id, data);
        }
    }

    toJSON(): SubscriberData {
        return {
            id: this.id,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            uuid: this.uuid,
            email: this.email,
            name: this.name,
            attribs: this.attribs,
            status: this.status as 'enabled' | 'blocklisted',
            lists: this.lists.map((listMembership: ListMembership) => (listMembership.getList() as List).getID() as number)
        };
    }

    async fromData<SubscriberData>(data: SubscriberData): Promise<Subscriber> {
        // NOTE types are weird here because TypeScript was complaining otherwise
        const typedData = (data as { id?: number, uuid?: string, email: string, name: string, attribs: { [key: string]: any }, status: "enabled" | "blocklisted", lists: number[] | ListMembershipData[], created_at?: string, updated_at?: string });
        
        let listMemberships: ListMembership[] = [];
        // We only want to bother processing the lists if there are any
        if(typedData.lists.length > 0) {
            listMemberships = await Promise.all(
                typedData.lists.map(
                    async (listMembershipData: number | ListMembershipData) => {
                        if(typeof listMembershipData === 'number') {
                            // Get the list object based on it's IDs from Listmonk
                            const listObj = await List.find((list: List) => (list.getID() as number) === listMembershipData); 
                            
                            // Verify we found a list with the given ID
                            if(typeof listObj === 'undefined') {
                                throw new Error('List with ID ' + listMembershipData + ' not found');
                            }

                            // Default the membership object to unconfirmed
                            listMembershipData = {
                                subscription_status: 'unconfirmed',
                                ...listObj.toJSON()
                            }
                        }
                        
                        return new ListMembership(this.api.getCredentials()).fromData(listMembershipData);
                    }
                )
            );
        }

        this.id = typedData.id;
        this.uuid = typedData.uuid;
        this.email = typedData.email;
        this.name = typedData.name;
        this.attribs = typedData.attribs;
        this.status = typedData.status;
        this.lists = listMemberships;
        this.createdAt = typedData.created_at; 
        this.updatedAt = typedData.updated_at;

        return this;
    }

    /**
     * Create a new Subscriber object with the given data.
     * 
     * Note, this doesn't automatically create the subscriber in Listmonk. You need to call `save` to do that.
     * 
     * @param email Subscriber's email address                                                                           |
     * @param name Subscriber's name.                                                                                   |
     * @param status Subscriber's status.                                                           |
     * @param lists List of list IDs to subscribe to.                                                                    |
     * @param attribs Attributes of the new subscriber.                                                                    |
     * @param preconfirm_subscriptions If true, subscriptions are marked as confirmed and no-optin emails are sent for double opt-in lists. |
     * @param credentials Optional The credentials to use for the API call.
     */
    static async create(email: string, name: string, status: 'enabled' | 'blocklisted', lists?: List[], attribs?: { [key: string]: any }, preconfirm_subscriptions?: boolean, credentials?: APICredentials): Promise<Subscriber> {
        return await new Subscriber(credentials).fromData({ email, name, status, lists: typeof lists !== 'undefined' ? lists.map((list: List) => list.getID()) : [] , attribs });
    }

    /**
     * Find a subscriber based on the given predicate.
     * 
     * @param predicate A function that takes a subscriber and returns true if it matches the desired subscriber.
     * @param credentials Optional The credentials to use for the API call.
     * @returns The subscriber that matches the predicate, or undefined if no subscriber matches the predicate.
     */
    static async find(predicate: (subscriber: Subscriber) => boolean, credentials?: APICredentials): Promise<Subscriber | undefined> {
        return await new API(credentials).get<SubscriberData[]>('/subscribers?per_page=all')
            .then(async (subscribers: SubscriberData[]) => {
                // Convert each SubscriberData JSON object to a Subscriber object
                const subscriberObjs: Subscriber[] = await Promise.all(subscribers.map((subscriber: SubscriberData) => new Subscriber(credentials).fromData(subscriber)));
                
                // Use the predicate function provided to find the desired list
                const subscriber = subscriberObjs.find(predicate);
                
                return subscriber;
            });
    }
}