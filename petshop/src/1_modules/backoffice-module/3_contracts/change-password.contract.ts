import { IContract } from 'src/3_shared/icontract';
import { Flunt } from 'src/4_utils/flunt';
import { Injectable } from '@nestjs/common';
import { ChangePasswordDto } from '../6_dtos/change-password-dto';

@Injectable()
export class ChangePasswordContract implements IContract {
    errors: any[];
    validate(_dto: ChangePasswordDto): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(_dto.password, 6, 'senha necessita de pelo menos 6 caracteres');
        flunt.hasMinLen(_dto.newPassword, 6, 'nova senha necessita de pelo menos 6 caracteres');
        flunt.isEqual(_dto.newPassword, _dto.password, 'Seenha atual não pode ser igual a antiga');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}