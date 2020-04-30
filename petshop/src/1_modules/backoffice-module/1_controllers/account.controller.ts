import { Controller, Post, Get, UseGuards, UseInterceptors, HttpException, HttpStatus, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from 'src/3_shared/services/auth.service';
import { SharedJwtAuthGuard } from 'src/3_shared/guards/shared.auth.guard';
import { RoleInterceptor } from 'src/2_interceptors/role.interceptor';
import { UserDto } from '../6_dtos/user-dto';

@Controller('v1/accounts')
export class AccountController {
    constructor(private authService: AuthService) {
    }

    @Post('')
    async createToken(@Body() body: UserDto): Promise<any> {

        return await this.authService.createToken(body);
    }

    @Get('')
    @UseGuards(SharedJwtAuthGuard)
    @UseInterceptors(new RoleInterceptor(['user']))
    findAll(@Req() request) {
        //SharedJwtAuthGuard que guarda as informacoes armazenadas no TOKEN
        //req.user
        //SharedJwtAuthGuard preenche o @Req
        return [];
    }
}