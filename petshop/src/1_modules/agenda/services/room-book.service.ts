import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { BoookRoomCommand } from "../commands/book-room.commands";

@Injectable()
export class RoomBookSevice {
    constructor(
        private readonly commandBus: CommandBus
    ) { }

    async Book(customerId: string, roomId: string) {
        console.log(' RoomBookSevice:Book- Executando o serviço.... ');

        return await this.commandBus.execute(
            new BoookRoomCommand(customerId, roomId)
        );
    }
}