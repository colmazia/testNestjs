import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UpdateDateColumn } from 'typeorm';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService){}

    // http://localhost:3000/user/:id

    @Get(':id')
    findById(@Param('id', new ParseIntPipe()) id: number){
        return this.service.findById(id);
    }

    @Post()
    create(@Body() dto: Omit<User, 'id'>){
        return this.service.create(dto);
    }

    @Patch(':id')
    update( @Param('id', new ParseIntPipe()) id:number,
            @Body() dto: Partial<Omit<User, 'id'>>,){
        return this.service.update(id,dto);
    }

    @Delete(':id')
    delete(@Param('id', new ParseIntPipe()) id: number){
        return this.service.delete(id);
    }
}
