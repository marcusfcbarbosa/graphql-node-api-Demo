import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { AccountService } from "src/1_modules/backoffice-module/5_services/account.service";
import { UserDto } from "src/1_modules/backoffice-module/6_dtos/user-dto";
import { Customer } from "src/1_modules/backoffice-module/8_models/customer.model";


@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService
    ) { }

    async createToken(username: string, document: string, email: string, roles: String[]) {
        const user: JwtPayload = {
            username: username,
            document: document,
            email: email,
            roles: roles
        };
        const accessToken = "Bearer " + this.jwtService.sign(user);
        return {
            expiresIn: 3600,
            accessToken,
        };
    }
    // o SharedJwtAuthGuard que esta na notation do sccount chama esse validateUser
    async validateUser(payload: JwtPayload): Promise<any> {
        try {
            return payload;
            //return await this.accountService.findOneByUserName(payload.username);
        } catch (error) {
            return false;
        }

    }
}