import { Controller, Post, Get, UseGuards, UseInterceptors, HttpException, HttpStatus, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from 'src/3_shared/services/auth.service';

import { SharedJwtAuthGuard } from 'src/3_shared/guards/shared.auth.guard';
import { RoleInterceptor } from 'src/2_interceptors/role.interceptor';
import { UserDto } from '../6_dtos/user-dto';

import { AuthenticateDto } from '../6_dtos/authenticate-dto';
import { ResultDto } from 'src/1_modules/store-module/2-dtos/result.dto';
import { AccountService } from '../5_services/account.service';
import { ResetPasswordDto } from '../6_dtos/reset-password-dto';

import { Guid } from 'guid-typescript'
import { ChangePasswordDto } from '../6_dtos/change-password-dto';
import { request } from 'http';
import { ValidatorInterceptor } from 'src/2_interceptors/validator.interceptor';
import { ChangePasswordContract } from '../3_contracts/change-password.contract';


@Controller('v1/accounts')
export class AccountController {
    constructor(private authService: AuthService,
        private readonly accountService: AccountService) {
    }

    @Post('authenticate')
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password);
        if (!customer) {
            throw new HttpException(new ResultDto('Usuário ou senha inválida', false, null, null), HttpStatus.NOT_FOUND);
        }
        if (!customer.user.active) {
            throw new HttpException(new ResultDto('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);
        }
        const token = await this.authService.createToken(
            customer.user.username,
            customer.document,
            customer.email,
            customer.user.roles);
        return new ResultDto(null, true, {
            name: customer.name,
            token: token
        }, null);
    }

    @Post('reset-password')
    async resetpassword(@Body() model: ResetPasswordDto): Promise<any> {
        try {
            const password = Guid.create().toString().substring(0, 8).replace('-', '');
            await this.accountService.update(model.document, { password: password });
            return new ResultDto('uma nova senha foi enviada para o seu e-mail', true, null, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível restaurar a senha', false, null, null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('change-password')
    @UseGuards(SharedJwtAuthGuard)//para esse tipo de ação o usuario deve ter um token válido
    @UseInterceptors(new ValidatorInterceptor(new ChangePasswordContract()))
    async changepassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            await this.accountService.update(request.user.document, { password: model.newPassword });
            return new ResultDto('Senha alterada com sucesso!', true, null, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível alterar a senha',
                false, null, null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('refresh')
    @UseGuards(SharedJwtAuthGuard)
    async createToken(@Req() request): Promise<any> {
        const token = await this.authService.createToken(
            request.user.username,
            request.user.document,
            request.user.email,
            request.user.roles);
        return new ResultDto(null, true, token, null);
    }

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