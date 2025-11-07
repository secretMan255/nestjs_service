import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User } from 'src/entities';
import { GetUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async getUser(dto: GetUserDto) {
        const where: FindOptionsWhere<User>[] = []

        if (dto.id !== undefined) where.push({ id: dto.id })
        if (dto.username) where.push({ username: dto.username })

        const [items, total] = await this.userRepository.findAndCount({
            where: where.length ? where : [],
            take: dto.limit,
            skip: dto.offset,
            order: { id: 'ASC' }
        })

        return { total, items }
    }
}