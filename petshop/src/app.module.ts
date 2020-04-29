import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackofficeModuleModule } from './1_modules/backoffice-module/backoffice-module.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './1_modules/backoffice-module/2_schemas/customer.schema';
import { UserSchema } from './1_modules/backoffice-module/2_schemas/user.schema';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://marcusfcb:mfcb4625@cluster0-8nqe9.azure.mongodb.net/test?retryWrites=true&w=majority'),
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
      ]),
    BackofficeModuleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
