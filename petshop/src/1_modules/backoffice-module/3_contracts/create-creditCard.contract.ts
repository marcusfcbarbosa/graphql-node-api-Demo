'use strict'
import { IContract } from 'src/3_shared/icontract';
import { Flunt } from 'src/4_utils/flunt';
import { Injectable } from '@nestjs/common';
import { CreditCard } from '../8_models/CreditCard.model';

@Injectable()
export class CreateCreditCardContract implements IContract {
    errors: any[];
    validate(model: CreditCard): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.holder, 5, 'holder necessita de pelo menos 5 caracteres');
        flunt.isFixedLen(model.number, 16, 'Numero de cartão inválido');
        flunt.hasMinLen(model.expiration, 4, 'Data de expiracao inválida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}