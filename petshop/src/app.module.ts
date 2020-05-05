import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackofficeModuleModule } from './1_modules/backoffice-module/backoffice-module.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './1_modules/backoffice-module/2_schemas/customer.schema';
import { UserSchema } from './1_modules/backoffice-module/2_schemas/user.schema';
import { StoreModuleModule } from './1_modules/store-module/store-module.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaModule } from './1_modules/agenda/agenda.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
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
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'mfcb4625',
        database: '7180',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
      }
    ),
    BackofficeModuleModule,
    StoreModuleModule,
    AgendaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }