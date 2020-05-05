import { AggregateRoot } from '@nestjs/cqrs';
//import { RoomBookEvent } from '../events/room-booked.event';

export class Room extends AggregateRoot {

    constructor(private readonly id: string) {
        super();
    }

    //os casos de uso ficam aqui!!
    book(customerId: string) {
    }
}