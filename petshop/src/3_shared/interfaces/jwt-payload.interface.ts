export interface JwtPayload {
    username: string;
    email: string;
    document: string;
    roles: string[];
}