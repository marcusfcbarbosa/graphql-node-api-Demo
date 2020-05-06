import { AggregateRoot } from '@nestjs/cqrs';
import { RoomBokedEvent } from '../events/room-booked.event';


export class Room extends AggregateRoot {

    constructor(private readonly id: string) {
        super();
    }

    //os casos de uso ficam aqui!!
    book(customerId: string) {

        
        
        //ao finalizar um processamento, dispara um evento
        this.apply(new RoomBokedEvent(customerId, this.id));
    }
}