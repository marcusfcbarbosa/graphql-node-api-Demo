'use strict'
import { NestInterceptor, Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IContract } from '../3_shared/icontract';
import { Result } from 'src/1_modules/backoffice-module/8_models/result.model';


@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(
        public contract: IContract) { //Dessa forma, qualquer classe que herdar de IContract, pode ser chamada aqui
    }

    intercept(context: ExecutionContext, call$: Observable<any>)
        : Observable<any> {

        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {
            throw new HttpException(
                new Result(
                    'ValidatorInterceptor',
                    false,
                    null,
                    this.contract.errors
                ), HttpStatus.BAD_REQUEST);
        }
        return call$;
    }
}