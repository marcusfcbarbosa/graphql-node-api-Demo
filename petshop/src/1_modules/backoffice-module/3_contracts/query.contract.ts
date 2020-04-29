'use strict'
import { IContract } from 'src/3_shared/icontract';
import { Flunt } from 'src/4_utils/flunt';
import { Injectable } from '@nestjs/common';
import { QueryDto } from '../6_dtos/query.dto';

//Com  essa adequação vc torna a classe injetavel nos interceptadores de rota
@Injectable()
export class QueryContract implements IContract {

    errors: any[];

    validate(_dto: QueryDto): boolean {

        if(!_dto.query){
            _dto.query = {};
        }

        const flunt = new Flunt();
        flunt.isGreatherThan(_dto.take, 1000, 'Sua query não pode exceder 100 registos');
        
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}