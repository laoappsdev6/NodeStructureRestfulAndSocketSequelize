
export interface IGPSLocation {
    lat: number;
    lng: number;
    angle: number;
    speed: number;
    others: string;
    alt: number;
    gpsTime: string;
    serverTime: string;
}
export interface IBase {
    id?: number;
    uuid?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    // deletedAt?:Date;
}

// Resources
export interface IUserLocation extends IGPSLocation, IBase { // private _UserUuid

}
export enum EOnlineStatus {
    online = 'online',
    offline = 'offline',
    idle = 'idle'
}
export enum EContactInfoStatus {
    blocked = 'blocked',
    private = 'private',

}
export enum EContractType {
    p2p = 'p2p',
    group = 'group'
}
export interface IMember {
    signature: string;
    phonenumbers: string;
}
export interface IMessage extends IBase { // private ( room)
    text: string;
    video: string;
    voice: string;
    photo: string;
    sender: string;
    delete: boolean;
}
export interface IFriendInfo extends IBase { // private
    name: string;
    nickname: string;
    members: Array<IMember>; //members
    mobilephones: Array<string>;
    emails: Array<string>;
    facebook: Array<string>;
    websites: Array<string>;
    description: string;
    photo: Array<string>;
    others: Array<string>;
    room: string;
    status: Array<{ status: EContactInfoStatus, signature: string }>,
    onlineStatus: Array<{ status: EOnlineStatus, signature: string }>
    type: EContractType;
}

export interface IContract extends IBase { // public 
    members: Array<IMember>; // members
    room: string;
    type: EContractType;
    status: Array<{ status: EContactInfoStatus, signature: string }>,
    onlineStatus: Array<{ status: EOnlineStatus, signature: string }>
}





// resources

export interface IUser extends IBase {
    username: string;
    password: string;
    phonenumber: string;
    answers: Array<string>;
}
export interface ISignature extends IBase {  // public 
    userUuid: string;
    signature: string; // public key

    privatekey: string;
    hashM: string;

    service: EService;

    otp: Array<{ text: string, time: string }>
}
export interface IShare extends IBase { // public
    signature: string;
    resource: EResource
}

export interface IToken { // private _UserUuid & public
    signature: string;
    ip: string;
    tokenTime: Date;
    tokenEnd: Date;
    machine: string;
    otherinfo: string;
    time: string;
    location: string;
    hashM: string;

}
export enum EResource {
    gpslocation = 'gpslocation',
    contactinfo = 'contactinfo',
}
export enum EService {
    wallet = 'wallet',
    grab = 'grab',
    hr = 'hr',
    onlinestore = 'onlinestore',
    orderbilling = 'orderbilling',
    inventory = 'inventory',
    freelance = 'freelance',
    forrent = 'forrent',
    chat = 'chat',

    resource = 'resource',

    digitalsignature = 'digitalsignature'
}

export interface IReport extends IBase {
    reportTime: Date;
    name: string;
    reportType: string;
    json: string;
}



export interface IUser extends IBase {

}
export interface IContact extends IBase {

}
export interface ISignature extends IBase {

}


export interface IResModel {
    data: any;
    message: string;
    status: number;
    code: string;
}
export interface IReqModel {
    data: any;
    command: EEntityNames;
    method: EMethods
    time: string;
    ip: string;
    dbtoken: string;
}
export enum EPostType {
    work = 'work',
    talent = 'talent'
}
export enum ERole {
    admin = 'admin'
}



export enum EMethods {
    new = 'new',
    edit = 'edit',
    delete = 'delete',
    selectone = 'selectone',
    selectmany = 'selectmany',
    findone = 'findone',
    findmany = 'findmany',
}
export enum EMessage {
    succeeded = 'succeeded',
    error = 'error',
    insertSucceeded = 'inserting succeeded',
    insertError = 'inserting error',
    updateSucceeded = 'updating succeeded',
    updateError = 'updating error',
    deletingSucceeded = 'deleting succeeded',
    deletingerror = 'deleting error',
    notfound = 'not found',
    exist = 'exist',
    bodyIsEmpty = "body is empty",
    idIsEmpty = "id is empty",
    unknownError = "unknown Error",
    selectOneSucceeded = "select One Succeeded",
    selectOneError = "select One Error",
    selectManySucceeded = "select Many Succeeded",
    selectManyError = "select Many Error",
    generateSucceeded = "find Succeeded",
    findError = "find Error",
    noAuthorized = "No Authorized"
}
export enum EEntityNames {
    profiles = 'profiles',
    gstore = 'stores',
    address = 'address',
    paymentmethod = 'paymentmethod',
    reports = "reports",
    store = "store",
    posts = "posts",
    location = "location",
    contactinfo = "contactinfo",
    users = "users",
    signature = "signature",
    shares = "shares"
}

export enum ECurrency {
    USD = 'USD',
    LAK = 'LAK',
    THB = 'THB',
    VND = 'VND',
    EUR = 'EUR',
    CNY = 'CNY',
    JPY = 'JPY',
    KRW = 'KRW'
}
export enum EUnit {
    PCS = 'PCS',
    KG = 'KG',
    L = 'L',
    SETS = 'SETS',
}
export enum EStoreType {
    grocery = 'grocery',
    minimart = 'minimart',
    supermarket = 'supermarket',
    restaurant = 'restaurant'
}



