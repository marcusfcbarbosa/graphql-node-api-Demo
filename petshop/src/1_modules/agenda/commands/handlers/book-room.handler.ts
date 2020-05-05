import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { BoookRoomCommand } from "../book-room.commands";
import { RoomRepository } from "../../repositories/room.repository";


@CommandHandler(BoookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BoookRoomCommand>{
    constructor(private readonly repository: RoomRepository) { }

    async execute(command: BoookRoomCommand) {
        console.log('BookRoomHandler: execute - Executando o commando....');

        const room = await this.repository.findOneById(command.roomId);
        room.book(command.customerId);
        //room.commit();
    }
}