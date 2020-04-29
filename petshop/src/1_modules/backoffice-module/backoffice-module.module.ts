import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './2_schemas/customer.schema';
import { UserSchema } from './2_schemas/user.schema';
import { AccountService } from './5_services/account.service';
import { CustomerService } from './5_services/customer.service';
import { AddressService } from './5_services/address.service';
import { PetService } from './5_services/pet.service';
import { CustomerController } from './1_controllers/customer.controller';
import { AddressController } from './1_controllers/address.controller';
import { PetsController } from './1_controllers/pet.controller';

@Module({
  imports:
    [
      MongooseModule.forFeature(
        [
          {
            name: 'Customer',
            schema: CustomerSchema
          },
          {
            name: 'User',
            schema: UserSchema
          }
        ])],
  controllers: [
    CustomerController,
    AddressController,
    PetsController],
  providers: [
      AccountService,
    CustomerService,
    AddressService,
    PetService
  ]
})
export class BackofficeModuleModule { }