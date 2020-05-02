import { Controller, Post, Get, UseGuards, UseInterceptors, HttpException, HttpStatus, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from 'src/3_shared/services/auth.service';

import { SharedJwtAuthGuard } from 'src/3_shared/guards/shared.auth.guard';
import { RoleInterceptor } from 'src/2_interceptors/role.interceptor';
import { UserDto } from '../6_dtos/user-dto';

import { AuthenticateDto } from '../6_dtos/authenticate-dto';
import { ResultDto } from 'src/1_modules/store-module/2-dtos/result.dto';
import { AccountService } from '../5_services/account.service';

@Controller('v1/accounts')
export class AccountController {
    constructor(private authService: AuthService,
        private readonly accountService: AccountService) {
    }

    @Post('authenticate')
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password);
        console.log(customer);
        if (!customer) {
            throw new HttpException(new ResultDto('Usuário ou senha inválida', false, null, null), HttpStatus.NOT_FOUND);
        }
        if (!customer.user.active) {
            throw new HttpException(new ResultDto('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);
        }
        const token = await this.authService.createToken(customer);
        return new ResultDto(null, true, {
            name: customer.name,
            token: token
        }, null);
    }

    // @Post('')
    // async createToken(@Body() body: UserDto): Promise<any> {
    //     return await this.authService.createToken(body);
    // }

    // @Get('')
    // @UseGuards(SharedJwtAuthGuard)
    // @UseInterceptors(new RoleInterceptor(['admin']))
    // findAll(@Req() request) {
    //     //SharedJwtAuthGuard que guarda as informacoes armazenadas no TOKEN
    //     //req.user
    //     //SharedJwtAuthGuard preenche o @Req
    //     return request.user;
    // }
}