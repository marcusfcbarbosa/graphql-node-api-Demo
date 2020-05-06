import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { AgendaController } from './controllers/agenda.controller';
import { RoomBookSevice } from './services/room-book.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomRepository } from './repositories/room.repository';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';

@Module({
    imports: [CqrsModule],
    controllers: [AgendaController],
    providers: [
        RoomBookSevice,
        RoomRepository,
        ...CommandHandlers//ele nao chama o arquivo e ele chama o diretório que tem um arquivo index.ts
        ,...EventHandlers
    ],
})
export class AgendaModule { }