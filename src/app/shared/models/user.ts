export class User {
    id: number;
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    photo?:string;
    status?:boolean;
    token?: string;
}