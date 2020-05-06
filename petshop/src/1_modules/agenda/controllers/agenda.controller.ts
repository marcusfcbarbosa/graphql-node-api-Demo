import { Controller, Body, Post } from "@nestjs/common";
import { RoomBookSevice } from "../services/room-book.service";


@Controller('v1/rooms')
export class AgendaController {
    constructor(private readonly service: RoomBookSevice) {
    }

    @Post()
    async Book(@Body() body:any ){
        console.log('AppController: Book- Iniciando a requisição ..');
        await this.service.Book(body.customer,body.room);
    }
}