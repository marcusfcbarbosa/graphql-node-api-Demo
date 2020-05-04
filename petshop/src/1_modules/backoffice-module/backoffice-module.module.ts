import { Module, CacheModule } from '@nestjs/common';
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
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/3_shared/services/auth.service';
import { JwtStrategy } from 'src/3_shared/strategies/jwt.strategy';
import { AccountController } from './1_controllers/account.controller';

@Module({
  imports:
    [
      CacheModule.register({ stdTTL: 100, checkperiod: 120 }),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register(
        {
          secretOrPrivateKey: 'ed97d99f',
          signOptions: {
            expiresIn: 3600
          },
        }),
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
    AccountController
    , CustomerController
    , AddressController
    , PetsController
  ],
  providers: [
    AccountService
    , CustomerService
    , AddressService
    , PetService
    , AuthService
    , JwtStrategy
  ]
})
export class BackofficeModuleModule { }