import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { AccountService } from "src/1_modules/backoffice-module/5_services/account.service";


@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
    ) {
    }

    async createToken() {
        const user: JwtPayload = { username: 'teste@gmail.com' };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: 3600,
            accessToken,
        };
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.accountService.findOneByUserName(payload.username);
    }
}