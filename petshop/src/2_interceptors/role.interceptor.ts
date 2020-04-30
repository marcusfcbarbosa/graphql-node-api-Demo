import { NestInterceptor, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtPayload } from "src/3_shared/interfaces/jwt-payload.interface";
import { ResultDto } from "src/1_modules/store-module/2-dtos/result.dto";


export class RoleInterceptor implements NestInterceptor {

    constructor(public roles: string[]) {
    }

    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
        const payload: JwtPayload = context.switchToHttp().getRequest().user;
        let hasRole = false;
        payload.roles.forEach((role) => {
            if (this.roles.includes(role)) {
                hasRole = true;
            }
        });

        if (!hasRole) {
            throw new HttpException(new ResultDto('Acesso não autorizado', false, null, null),
                HttpStatus.UNAUTHORIZED);
        }
        return call$;
    }
}