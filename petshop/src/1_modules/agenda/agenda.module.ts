import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { AgendaController } from './controllers/agenda.controller';
import { RoomBookSevice } from './services/room-book.service';
import { CqrsModule, CommandHandlerNotFoundException } from '@nestjs/cqrs';
import { BookRoomHandler } from './commands/handlers/book-room.handler';
import { RoomRepository } from './repositories/room.repository';
import { CommandHandlers } from './commands/handlers';


@Module({
    imports: [CqrsModule],
    controllers: [AgendaController],
    providers: [
        RoomBookSevice,
        RoomRepository,
        ...CommandHandlers//ele nao chama o arquivo e ele chama o diretório que tem um arquivo index.ts
    ],
})
export class AgendaModule { }
