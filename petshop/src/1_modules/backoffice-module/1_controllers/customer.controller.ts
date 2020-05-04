import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { Customer } from '../8_models/customer.model';
import { Result } from '../8_models/result.model';
import { ValidatorInterceptor } from 'src/2_interceptors/validator.interceptor';
import { CreateCustomerContract } from '../3_contracts/cutomer.contracts';
import { CreateCustomerDto } from '../6_dtos/create-customer-dto';
import { AccountService } from '../5_services/account.service';
import { User } from '../8_models/user.model';
import { CustomerService } from '../5_services/customer.service';
import { QueryDto } from '../6_dtos/query.dto';
import { UpdateCustomerContract } from '../3_contracts/update-customer.contract';
import { UpdateCustomerDto } from '../6_dtos/update-customer.dto';
import { CreateCreditCardContract } from '../3_contracts/create-creditCard.contract';
import { CreditCard } from '../8_models/CreditCard.model';
import { QueryContract } from '../3_contracts/query.contract';
import { Md5 } from 'md5-typescript'


@Controller('v1/Customers')
export class CustomerController {
    constructor(private readonly accountService: AccountService,
        private readonly customerService: CustomerService

    ) {
    }

    @Get()
    async get() {
        try {
            const customers = await this.customerService.findAll();
            return new Result('', true, customers, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':document')
    async getByDocument(@Param('document') document: string) {
        try {
            const customers = await this.customerService.findAllByDocument(document);
            return new Result('', true, customers, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }


    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() body: CreateCustomerDto) {
        try {
            const password = await Md5.init(`${body.password}${process.env.SALT_KEY}`);

            const user = await this.accountService.create(new User(
                body.username,
                body.email,
                password,
                true,
                body.roles));
            const customer = new Customer(body.name, body.document, body.email, user, [], null, null, null);
            await this.customerService.create(customer);

            return new Result('Inserido com sucesso', true, body.roles, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/credit-cards')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
    async createCreditCard(@Param('document') document: string, @Body() model: CreditCard) {
        try {
            let customer = await this.customerService.saveOrUpdateCrediCart(document, model);
            return new Result('Cartão de crédito inserido com sucesso!!', true, customer, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async updateCustomer(@Param('document') document: string, @Body() body: UpdateCustomerDto) {
        try {
            let customer = await this.customerService.update(document, body);
            return new Result('Customer atualizado com sucesso', true, customer, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const customer = await this.customerService.query(model);
        return new Result(null, true, customer, null);
    }
}