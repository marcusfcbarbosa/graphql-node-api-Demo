import { Controller, Post, Param, Body, UseInterceptors, HttpException, HttpStatus, Get } from '@nestjs/common';
import { Result } from '../8_models/result.model';
import { ValidatorInterceptor } from 'src/2_interceptors/validator.interceptor';
import { CreateAddressContract } from '../3_contracts/create-address.contract';
import { Address } from '../8_models/addres.model';
import { AddressService } from '../5_services/address.service';
import { AddressType } from '../7_enums/address-type.enum';

@Controller('v1/Address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {
    }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddres(@Param('document') document, @Body() model: Address) {
        try {
            const addres = await this.addressService.create(document, model, AddressType.Billing);
            return new Result('Endereço de cobrança inserido com sucesso', true, addres, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('search/:zipcode')
    async search(@Param('zipcode') zipcode) {
        try {
            const response = await this.addressService.getAddressByZipCode(zipcode).toPromise();
            return new Result(null, true, response.data, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }


    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddressgAdress(@Param('document') document, @Body() model: Address) {
        try {
            const addres = await this.addressService.create(document, model, AddressType.Shipping);
            return new Result('Endereço de entrega inserido com sucesso', true, addres, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}