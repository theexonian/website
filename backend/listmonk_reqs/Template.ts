import { APIObject } from './APIObject';
import { API, APICredentials } from './API';

type TemplateData = {
    id?: number,
    name: string,
    type: 'campaign' | 'tx',
    body: string,
    subject?: string,
    is_default?: boolean,
    created_at?: string,
    updated_at?: string
};

/**
 * A class that represents a template in Listmonk.
 */
export class Template extends APIObject {
    private id?: number;
    /** Name of the template */
    private name: string;
    /** Type of the template (`campaign` or `tx`) */
    private type?: 'campaign' | 'tx';
    /** Raw HTML body of the template */
    private body: string;
    /** Subject line for the template (only for tx) */
    private subject?: string;
    /** Whether the template is the default template */
    private isDefault?: boolean;
    /** Timestamp when the template was created. Format: `YYYY-MM-DDTHH:MM:SSZ` */
    private createdAt?: string;
    /** Timestamp when the template was last updated. Format: `YYYY-MM-DDTHH:MM:SSZ` */
    private updatedAt?: string;

    /**
     * Create a new template object
     * 
     * @param credentials Optional credentials to use to authenticate API requests
     * @param id The identifier for the template
     * @param name The name of the template
     * @param type The type of the template (`campaign` or `tx`)
     * @param body The raw HTML body of the template
     * @param isDefault Whether the template is the default template
     * @param createdAt When the template was created. Format: `YYYY-MM-DDTHH:MM:SSZ`
     * @param updatedAt When the template was last updated. Format: `YYYY-MM-DDTHH:MM:SSZ`
     */
    constructor(credentials?: APICredentials, id?: number, name?: string, type?: "campaign" | "tx", body?: string, isDefault?: boolean, createdAt?: string, updatedAt?: string) {
        super(credentials);

        this.id = id;
        this.name = typeof name !== 'undefined' ? name : '';
        this.body = typeof body !== 'undefined' ? body : '';
        this.type = type;
        this.isDefault = isDefault;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * @returns Identifier for the template
     */
    getID(): number | undefined {
        return this.id;
    }

    /**
     * @returns The name of the template
     */
    getName(): string {
        return this.name;
    }
    /**
     * Set the name of the template
     * 
     * @param name Name of the template
     */
    setName(name: string): void {
        this.name = name;
    }

    /**
     * @returns Raw HTML body of the template
     */
    getBody(): string {
        return this.body;
    }
    /**
     * Set the raw HTML body of the template
     * 
     * @param body Raw HTML body of the template
     */
    setBody(body: string): void {
        this.body = body;
    }

    /**
     * @returns Type of the template (`campaign` or `tx`)
     */
    getType(): 'campaign' | 'tx' | undefined {
        return this.type;
    }
    /**
     * Set the type of the template
     * 
     * @param type Type of the template (`campaign` or `tx`)
     */
    setType(type: 'campaign' | 'tx'): void {
        this.type = type;
    }

    /**
     * @returns Subject line for the template (only for tx)
     */
    getSubject(): string | undefined {
        return this.subject;
    }
    /**
     * Set the subject line for the template 
     * 
     * NOTE: ONLY relevant for `tx` type templates
     * 
     * @param subject Subject line for the template
     */
    setSubject(subject: string): void {
        this.subject = subject;
    }

    /**
     * @returns Whether the template is the default template 
     */
    getIsDefault(): boolean | undefined {
        return this.isDefault;
    }
    /**
     * Set whether the template is the default template
     * 
     * @param isDefault Whether the template is the default template
     */
    setIsDefault(isDefault: boolean): void {
        this.isDefault = isDefault;
    }

    /**
     * @returns Timestamp when the template was created. Format: `YYYY-MM-DDTHH:MM:SSZ`
     */
    getCreatedAt(): string | undefined {
        return this.createdAt;
    }

    /**
     * @returns Timestamp when the template was last updated. Format: `YYYY-MM-DDTHH:MM:SSZ`
     */
    getUpdatedAt(): string | undefined {
        return this.updatedAt;
    }

    /**
     * Creates or updates the template in Listmonk.
     */
    async save() {
        const data = this.toJSON();

        // If the UUID is not set, then we assume we need to create the subscriber in Listmonk
        if(typeof data.id === 'undefined') {
            // Technically, this might be unnecessary since the values should be set to undefined anyway, but it's good to be safe
            delete data.id;
            delete data.created_at;
            delete data.updated_at;

            // Make the API call to create the subscriber in Listmonk
            await this.api.post<TemplateData>('/templates', data);
        }
        else {
            await this.api.put<TemplateData>('/templates/' + data.id, data);
        }
    }

    toJSON(): TemplateData {
        return {
            id: this.id,
            name: this.name,
            body: this.body,
            type: typeof this.type !== 'undefined' ? this.type : 'campaign',
            is_default: this.isDefault,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }

    fromData<TemplateData>(data: TemplateData): Template {
        const typedData = data as { id?: number, name: string, type: 'campaign' | 'tx', body: string, subject?: string, is_default?: boolean, created_at?: string, updated_at?: string};
        
        this.id = typedData.id;
        this.name = typedData.name
        this.type = typedData.type; 
        this.body = typedData.body; 
        this.isDefault = typedData.is_default;
        this.createdAt = typedData.created_at;
        this.updatedAt = typedData.updated_at;

        return this;
    }

    /**
     * Create a new Template object with the given data.
     * 
     * Note, this doesn't automatically create the template in Listmonk. You need to call `save` to do that.
     * 
     * @param name Name of the new template.
     * @param type Type of the template (`campaign` or `tx`)
     * @param body Raw HTML body of the template
     * @param credentials Optional credentials to use to authenticate API requests
     * @returns The new template object
     */
    static async create(name: string, type: 'campaign' | 'tx', body: string, credentials?: APICredentials): Promise<Template> {
        return await new Template(credentials).fromData({ name, type, body });
    }

    /**
     * Find a template based on the given predicate.
     * 
     * @param predicate A function that takes a template and returns true if it matches the desired template.
     * @param credentials Optional credentials to use to authenticate API requests
     * @returns The template that matches the predicate, or undefined if no template matches the predicate.
     */
    static async find(predicate: (template: Template) => boolean, credentials?: APICredentials): Promise<Template | undefined> {
        return await new API(credentials).get<TemplateData[]>('/templates')
            .then(async (templates: TemplateData[]) => {
                // Convert each TemplateData JSON object to a Template object
                const templateObjs: Template[] = await Promise.all(templates.map((template: TemplateData) => new Template(credentials).fromData(template)));
                
                // Use the predicate function provided to find the desired template
                const template = templateObjs.find(predicate);
                
                return template;
            });
    }
}