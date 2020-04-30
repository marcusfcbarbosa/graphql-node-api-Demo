import { Controller, Post, Get, UseGuards, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from 'src/3_shared/services/auth.service';

@Controller('v1/accounts')
export class AccountController {
    constructor(private authService: AuthService) {
    }
    
    @Post('')
    async createToken() : Promise<any>{
        return await this.authService.createToken();
    }
    
    @Get('')
    @UseGuards(AuthGuard())
    findAll() {
        //AuthGuard que guarda as informacoes armazenadas no TOKEN
        //req.user

        return [];
    }
}