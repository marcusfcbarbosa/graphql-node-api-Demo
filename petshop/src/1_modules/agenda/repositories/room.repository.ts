import { Injectable } from "@nestjs/common";
import { Room } from "../models/room.module";

@Injectable()
export class RoomRepository {
    async findOneById(id: string): Promise<Room> {

        console.log('findOneById');

        return new Room('123456');

    }

}