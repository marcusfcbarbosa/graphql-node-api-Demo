export class RoomBokedEvent {
    constructor(
        public readonly customerId: string,
        public readonly roomId: string
    ) { }
}