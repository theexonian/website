import { APIObject } from './APIObject';
import { API, APICredentials } from './API';
import { List, ListData } from './List';
import { Template } from './Template';

type CampaignData = {
    id?: number,
    uuid?: string,
    name: string,
    subject: string,
    lists: number[] | ListData[],
    type: "regular" | "optin",
    content_type: 'richtext' | 'html' | 'markdown' | 'plain',
    body: string,
    from_email?: string,
    alt_body?: string,
    send_at?: string,
    messenger?: string,
    template_id?: number,
    tags?: string[],
    headers?: { [key: string]: string },
    status?: "draft" | "scheduled" | "running" | "paused" | "cancelled",
    created_at?: string,
    updated_at?: string
}

/**
 * Represents a campaign in Listmonk.
 */
export class Campaign extends APIObject {
    /** Identifier for the Campaign */
    private id?: number;
    /** Universal Unique Identifier (UUID) for the Campaign */
    private uuid?: string;
    /** Campaign name. */
    private name: string;
    /** Campaign email subject. */
    private subject: string;
    /** Lists to send campaign to. */
    private lists: List[];
    /** Campaign type: 'regular' or 'optin'. */
    private type?: 'regular' | 'optin';
    /** Content type: `richtext`, `html`, `markdown`, `plain` */
    private contentType?: 'richtext' | 'html' | 'markdown' | 'plain';
    /** Content body of campaign. */
    private campaignBody: string;
    /** 'From' email in campaign emails. Defaults to value from settings if not provided. */
    private fromEmail?: string;
    /** Alternate plain text body for HTML (and richtext) emails. */
    private altBody?: string;
    /** Timestamp to schedule campaign. Format: `YYYY-MM-DDTHH:MM:SSZ` */
    private sendAt?: string;
    /** `email` or a custom messenger defined in settings. Defaults to `email` if not provided. */
    private messenger?: string;
    /** Template to use */
    private template?: Template;
    /** Tags to mark campaign. */
    private tags?: string[];
    /** Key-value pairs to send as SMTP headers. Example: `[{"x-custom-header": "value"}]`. */
    private headers?: { [key: string]: string };
    /** 
     * status for campaign: `draft`, `scheduled`, `running`, `paused`, `cancelled`. 
     * 
     * Note:
     * - Only `scheduled` campaigns can change status to `draft`.
     * - Only `draft` campaigns can change status to `scheduled`.
     * - Only `paused` and `draft` campaigns can start (`running` status).
     * - Only `running` campaigns can change status to `cancelled` and `paused`.
     */
    private status?: 'draft' | 'scheduled' | 'running' | 'paused' | 'cancelled';
    /** Timestamp for when the campaign was created. Format: `YYYY-MM-DDTHH:MM:SSZ` */
    private createdAt?: string;
    /** Timestamp for when the campaign was last updated. Format: `YYYY-MM-DDTHH:MM:SSZ` */
    private updatedAt?: string;

    constructor(credentials?: APICredentials, id?: number, uuid?: string, name?: string, subject?: string, lists?: List[], type?: 'regular' | 'optin', contentType?: 'richtext' | 'html' | 'markdown' | 'plain', campaignBody?: string, fromEmail?: string, altBody?: string, sendAt?: string, messenger?: string, template?: Template, tags?: string[], headers?: { [key: string]: string }, status?: 'draft' | 'scheduled' | 'running' | 'paused' | 'cancelled', createdAt?: string, updatedAt?: string) {
        super(credentials);

        this.id = id;
        this.uuid = uuid;
        this.name = typeof name !== 'undefined' ? name : '';
        this.subject = typeof subject !== 'undefined' ? subject : '';
        this.lists = typeof lists !== 'undefined' ? lists : [];
        this.type = type;
        this.contentType = contentType;
        this.campaignBody = typeof campaignBody !== 'undefined' ? campaignBody : '';
        this.fromEmail = fromEmail;
        this.altBody = altBody;
        this.sendAt = sendAt;
        this.messenger = messenger;
        this.template = template;
        this.tags = typeof tags !== 'undefined' ? tags : [];
        this.headers = headers;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * @returns Identifier for the Campaign
     */
    getID(): number | undefined {
        return this.id;
    }

    /**
     * @returns Universal Unique Identifier (UUID) for the Campaign
     */
    getUUID(): string | undefined {
        return this.uuid;
    }

    /**
     * @returns Campaign name
     */
    getName(): string {
        return this.name;
    }
    /**
     * Set the name of the campaign
     * 
     * @param name The name to set the Campaign name to
     */
    setName(name: string): void {
        this.name = name;
    }

    /**
     * @returns Campaign email subject
     */
    getSubject(): string {
        return this.subject;
    }
    /**
     * Set the subject of the campaign
     * 
     * @param subject The subject to set the Campaign email subject to
     */
    setSubject(subject: string): void {
        this.subject = subject;
    }

    /**
     * @returns Lists to send the campaign to
     */
    getLists(): List[] {
        return this.lists;
    }
    /**
     * Add a list for the campaign to send to
     * 
     * @param list List to add to the campaign
     */
    addList(list: List): void {
        this.lists.push(list);
    }
    /**
     * Remove a list from the campaign
     * 
     * @param list List to remove from the campaign
     */
    removeList(list: List): void {
        this.lists = this.lists.filter((l: List) => l.getID() !== list.getID());
    }
    /**
     * Check if the campaign includes a list
     * 
     * @param list The list to check if the campaign includes
     * @returns A boolean indicating if the campaign includes the list
     */
    includesList(list: List): boolean {
        return this.lists.some((l: List) => l.getID() === list.getID());
    }

    /**
     * @returns Campaign type: 'regular' or 'optin'
     */
    getType(): 'regular' | 'optin' | undefined {
        return this.type;
    }
    /**
     * Set the type of the campaign
     * 
     * @param type Campaign type: 'regular' or 'optin'
     */
    setType(type: 'regular' | 'optin'): void {
        this.type = type;
    }

    /**
     * @returns Content type: `richtext`, `html`, `markdown`, `plain`
     */
    getContentType(): 'richtext' | 'html' | 'markdown' | 'plain' | undefined {
        return this.contentType;
    }
    /**
     * Set the content type of the campaign
     * 
     * @param contentType Content type: `richtext`, `html`, `markdown`, `plain`
     */
    setContentType(contentType: 'richtext' | 'html' | 'markdown' | 'plain'): void {
        this.contentType = contentType;
    }

    /**
     * @returns Content body of the campaign
     */
    getCampaignBody(): string {
        return this.campaignBody;
    }
    /**
     * Set the content body of the campaign
     * 
     * @param campaignBody The content body to set the campaign body to
     */
    setCampaignBody(campaignBody: string): void {
        this.campaignBody = campaignBody;
    }

    /**
     * @returns 'From' email in campaign emails. Defaults to value from settings if not provided.
     */
    getFromEmail(): string | undefined {
        return this.fromEmail;
    }
    /**
     * Set the 'From' email in campaign emails
     * 
     * @param fromEmail The email to set the 'From' email in campaign emails to
     */
    setFromEmail(fromEmail: string): void {
        this.fromEmail = fromEmail;
    }

    /**
     * @returns Alternate plain text body for HTML (and richtext) emails
     */
    getAltBody(): string | undefined {
        return this.altBody;
    }
    /**
     * Set the alternate plain text body for HTML (and richtext) emails
     * 
     * @param altBody The alternate plain text body to set for HTML (and richtext) emails
     */
    setAltBody(altBody: string): void {
        this.altBody = altBody;
    }

    /**
     * @returns Timestamp to schedule the campaign. Format: `YYYY-MM-DDTHH:MM:SSZ`
     */
    getSendAt(): string | undefined {
        return this.sendAt;
    }
    /**
     * Set the timestamp to schedule the campaign
     * 
     * @param sendAt The timestamp to set to schedule the campaign
     */
    setSendAt(sendAt: string): void {
        this.sendAt = sendAt;
    }

    /**
     * @returns `email` or a custom messenger defined in settings. Defaults to `email` if not provided.
     */
    getMessenger(): string | undefined {
        return this.messenger;
    }
    /**
     * Set the messenger for the campaign
     * 
     * @param messenger The messenger to set for the campaign
     */
    setMessenger(messenger: string): void {
        this.messenger = messenger;
    }

    /**
     * Get the ID of the template used for the campaign
     * 
     * @returns ID of the template used for the campaign or -1 if the template isn't set explicitly
     */
    getTemplateID(): number {
        return this.getTemplate()?.getID() ?? -1;
    }
    /**
     * @returns The template used for the campaign
     */
    getTemplate(): Template | undefined {
        return this.template;
    }
    /**
     * Set the template for the campaign
     * 
     * @param template The template to set for the campaign
     */
    setTemplate(template: Template): void {
        this.template = template;
    }
    /**
     * Set the template for the campaign by it's ID
     * 
     * @param templateID The ID of the template to set for the campaign
     */
    setTemplateByID(templateID: number): void {
        this.template = new Template(this.api.getCredentials(), templateID);
    }

    /**
     * @returns Tags to mark the campaign
     */
    getTags(): string[] | undefined {
        return this.tags;
    }
    /**
     * Add a tag to the campaign
     * 
     * @param tag The tag to add to the campaign
     */
    addTag(tag: string): void {
        if(this.tags === undefined) {
            this.tags = [];
        }
        this.tags.push(tag);
    }
    /**
     * Remove a tag from the campaign
     * 
     * @param tag The tag to remove from the campaign
     */
    removeTag(tag: string): void {
        if(this.tags === undefined) {
            return;
        }
        this.tags = this.tags.filter((t: string) => t !== tag);
    }

    /**
     * @returns Key-value pairs to send as SMTP headers
     */
    getHeaders(): { [key: string]: string } | undefined {
        return this.headers;
    }
    /**
     * Add a header to the campaign
     * 
     * @param key The key of the header to add
     * @param value The value of the header to add
     */
    addHeader(key: string, value: string): void {
        if(this.headers === undefined) {
            this.headers = {};
        }
        this.headers[key] = value;
    }
    /**
     * Remove a header from the campaign
     * 
     * @param key The key of the header to remove
     */
    removeHeader(key: string): void {
        if(this.headers === undefined) {
            return;
        }
        delete this.headers[key];
    }

    /**
     * @returns Status for the campaign: `draft`, `scheduled`, `running`, `paused`, `cancelled`
     */
    getStatus(): 'draft' | 'scheduled' | 'running' | 'paused' | 'cancelled' | undefined {
        return this.status;
    }
    /**
     * Set the status for the campaign
     * 
     * Note:
     * - Only `scheduled` campaigns can change status to `draft`.
     * - Only `draft` campaigns can change status to `scheduled`.
     * - Only `paused` and `draft` campaigns can start (`running` status).
     * - Only `running` campaigns can change status to `cancelled` and `paused`.
     * 
     * @param status The status to set for the campaign: `draft`, `scheduled`, `running`, `paused`, `cancelled`
     */
    setStatus(status: 'draft' | 'scheduled' | 'running' | 'paused' | 'cancelled'): void {
        this.status = status;
    }

    /**
     * @returns Timestamp for when the campaign was created. Format: `YYYY-MM-DDTHH:MM:SSZ`
     */
    getCreatedAt(): string | undefined {
        return this.createdAt;
    }

    /**
     * @returns Timestamp for when the campaign was last updated. Format: `YYYY-MM-DDTHH:MM:SSZ`
     */
    getUpdatedAt(): string | undefined {
        return this.updatedAt;
    }

    /**
     * Creates or updates the campaign in Listmonk.
     */
    async save() {
        const data = this.toJSON();

        // If the UUID is not set, then we assume we need to create the subscriber in Listmonk
        if(typeof data.uuid === 'undefined') {
            // Technically, this might be unnecessary since the values should be set to undefined anyway, but it's good to be safe
            delete data.id;
            delete data.uuid;
            delete data.created_at;
            delete data.updated_at;
            delete data.status;
            

            // Make the API call to create the subscriber in Listmonk
            await this.api.post<CampaignData>('/campaigns', data);
        }
        else {
            await this.api.put<CampaignData>('/campaigns/' + data.id, data);
        }
    }

    toJSON(): CampaignData {
        return {
            id: this.id,
            uuid: this.uuid,
            name: this.name,
            subject: this.subject,
            lists: this.lists.map((list: List) => list.getID() as number),
            type: typeof this.type !== 'undefined' ? this.type : 'regular',
            content_type: typeof this.contentType !== 'undefined' ? this.contentType : 'plain',
            body: this.campaignBody,
            from_email: this.fromEmail,
            alt_body: this.altBody,
            send_at: this.sendAt,
            messenger: this.messenger,
            template_id: this.template?.getID(),
            tags: this.tags,
            headers: this.headers,
            status: typeof this.status !== 'undefined' ? this.status : 'draft',
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }

    async fromData<CampaignData>(data: CampaignData): Promise<Campaign> {
        const typedData = data as {id?: number, uuid?: string, name: string, subject: string, lists: number[] | ListData[], type: "regular" | "optin", content_type: 'richtext' | 'html' | 'markdown' | 'plain', body: string, from_email?: string, alt_body?: string, send_at?: string, messenger?: string, template_id?: number, tags?: string[], headers?: { [key: string]: string }, status: "draft" | "scheduled" | "running" | "paused" | "cancelled", created_at?: string, updated_at?: string };
        const lists = (
            await Promise.all(
                typedData.lists.map(
                    async (listData: Number | ListData) => {
                        if(typeof listData === 'number') {
                            return await List.find((list: List) => list.getID() === listData);
                        }
                        else {
                            return new List().fromData(listData);
                        }
                    }
                )
            )
        ).filter((list: List | undefined) => typeof list !== 'undefined');

        const template = typeof typedData.template_id !== 'undefined' ? await Template.find((template: Template) => template.getID() === typedData.template_id) : undefined;

        this.id = typedData.id;
        this.uuid = typedData.uuid; 
        this.setName(typedData.name);
        this.setSubject(typedData.subject); 
        this.lists = lists;
        this.setType(typedData.type);
        this.setContentType(typedData.content_type);
        this.setCampaignBody(typedData.body);
        this.fromEmail = typedData.from_email;
        this.altBody = typedData.alt_body; 
        this.sendAt = typedData.send_at; 
        this.messenger = typedData.messenger;
        this.template = template; 
        this.tags = typedData.tags; 
        this.headers = typedData.headers; 
        this.setStatus(typedData.status);
        this.createdAt = typedData.created_at; 
        this.updatedAt = typedData.updated_at;

        return this;
    }

    /**
     * Create a new Campaign object with the given data.
     * 
     * Note, this doesn't automatically create the campaign in Listmonk. You need to call `save` to do that.
     * 
     * @param name Name of the new campaign.
     * @param subject Subject of the new campaign.
     * @param lists Lists to send the campaign to.
     * @param type Type of the campaign: 'regular' or 'optin'.
     * @param contentType Content type: `richtext`, `html`, `markdown`, `plain`
     * @param body Raw HTML body of the campaign
     * @returns The new campaign object
     */
    static async create(name: string, subject: string, lists: List[], type: "regular" | "optin", content_type: 'richtext' | 'html' | 'markdown' | 'plain', body: string, credentials?: APICredentials): Promise<Campaign> {
        return await new Campaign(credentials).fromData({ name, subject, lists: lists.map((list: List) => list.toJSON()), type, content_type, body });
    }

    /**
     * Find a campaign based on the given predicate.
     * 
     * @param predicate A function that takes a campaign and returns true if it matches the desired template.
     * @param credentials Optional credentials to use to authenticate API requests
     * @returns The campaign that matches the predicate, or undefined if no campaign matches the predicate.
     */
    static async find(predicate: (campaign: Campaign) => boolean, credentials?: APICredentials): Promise<Campaign | undefined> {
        return await new API(credentials).get<CampaignData[]>('/campaigns')
            .then(async (campaigns: CampaignData[]) => {
                // Convert each CampaignData JSON object to a Campaign object
                const campaignObjs: Campaign[] = await Promise.all(campaigns.map((campaign: CampaignData) => new Campaign(credentials).fromData(campaign)));
                
                // Use the predicate function provided to find the desired campaign
                const campaign = campaignObjs.find(predicate);
                
                return campaign;
            });
    }
}