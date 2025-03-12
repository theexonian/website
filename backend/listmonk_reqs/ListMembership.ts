import { APIObject } from './APIObject';
import { APICredentials } from './API';
import { List, ListData } from './List';

export type ListMembershipData = {
    subscription_status: 'unconfirmed' | 'confirmed',
    [key: string]: any
};

export class ListMembership extends APIObject {
    private subscriptionStatus?: 'unconfirmed' | 'confirmed';
    private list?: List;

    constructor(credentials?: APICredentials, subscriptionStatus?: 'unconfirmed' | 'confirmed', list?: List) {
        super(credentials);

        this.subscriptionStatus = subscriptionStatus;
        this.list = list;
    }

    getSubscriptionStatus(): 'unconfirmed' | 'confirmed' | undefined {
        return this.subscriptionStatus;
    }

    getList(): List | undefined {
        return this.list;
    }

    toJSON(): ListMembershipData {
        return {
            subscription_status: typeof this.subscriptionStatus !== 'undefined' ? this.subscriptionStatus : 'unconfirmed',
            ...this.list?.toJSON()
        };
    }

    fromData<ListMembershipData>(data: ListMembershipData): ListMembership {
        // NOTE types are weird here because TypeScript was complaining otherwise
        const subscriptionStatus = (data as { subscription_status: 'unconfirmed' | 'confirmed', [key: string]: any }).subscription_status;
        delete (data as { subscription_status?: 'unconfirmed' | 'confirmed', [key: string]: any }).subscription_status;
        const list = new List().fromData(data as ListData);
        
        this.subscriptionStatus = subscriptionStatus;
        this.list = list;

        return this;
    }
}