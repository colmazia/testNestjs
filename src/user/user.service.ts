import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>){}

    findById(id: number): Promise<User>{
        return this.repo.findOne(id);
    }

    async create(dto: Omit<User, 'id'>): Promise<User> {
        const password = await hash(dto.password, 10);
        // const u = new User();
        // const id = u.id+1000000;
        const user = { ... new User(), ... dto, password};
        // user.id = user.id+1000000;
        console.dir(user);
        return this.repo.save(user);
    }

    async update(id: number, dto: Partial<Omit<User, 'id'>>): Promise<User> {
        const user = { ... (await this.findById(id)), ... dto};
        if(dto.password){
            user.password = await hash(dto.password, 10);
        }
        return this.repo.save(user);
    }

    async delete(id: number): Promise<User>{
        const user = await this.findById(id);
        await this.repo.remove(user);
        return user;
    }

    findByUsername(username: string): Promise<User> {
        return this.repo.findOne({ username });
    }

}
