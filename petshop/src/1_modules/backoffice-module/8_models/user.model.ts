export class User {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public active: boolean,
        public roles: String[]
    ) {
       
    }
}