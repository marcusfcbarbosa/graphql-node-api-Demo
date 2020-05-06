import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
import { RoomBokedEvent } from "../../events/room-booked.event";

@EventsHandler(RoomBokedEvent)
export class RoomBookedHandler implements IEventHandler<RoomBokedEvent>{
    handle(event: RoomBokedEvent) {
        console.log('RoomBokedEvent: handle - Manipulando o evento de Room Booked..');
    }
}