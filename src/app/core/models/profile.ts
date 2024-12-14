export interface Profile {
    id: number;
    roles: string[];
    grants: any[];
    status: string;
    personClass: string;
    personId: number;
    customerId?: number;
    contactId?: number;
    organization: any;
    name: string;
    firstName: string;
    lastName: string;
    applicationId: number;
    username: string;
    serviceClass: string;
    expireDate?: Date;
    viewEncryptedData: boolean;
    userIsTeamManager: boolean;
    userIsCustomer: boolean;
    userIsMaster: boolean;
    userIsClient: boolean;
    userIsSupplier: boolean;
    userIsAutoPilot: boolean;
}
