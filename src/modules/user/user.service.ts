import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
// import { User, UserSecurity } from 'src/entities';
import { GetUserDto, GetUserPasswordDto } from './user.dto';
import { RegisterDto } from '../auth/auth.dto';
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service';
import { ErrorExceptoin } from 'src/utils';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
        // @InjectRepository(User)
        // private readonly userRepo: Repository<User>,
        // @InjectRepository(UserSecurity)
        // private readonly userSecurityRepo: Repository<UserSecurity>
    ) { }

    // async getUser(dto: GetUserDto) {
    //     const where: FindOptionsWhere<User>[] = []

    //     if (dto.id !== undefined) where.push({ id: dto.id })
    //     if (dto.username) where.push({ username: dto.username })
    //     if (dto.email) where.push({ email: dto.email })

    //     const [items, total] = await this.userRepo.findAndCount({
    //         where: where.length ? where : {},
    //         take: dto.limit,
    //         skip: dto.offset,
    //         order: { id: 'ASC' },
    //     })

    //     return { total, items }
    // }

    // async getUserPassword(dto: GetUserPasswordDto) {
    //     const res = await this.userSecurityRepo.findOne({
    //         where: { userId: dto.id },
    //         select: [
    //             'userId',
    //             'passwordHash',
    //             'mfaEnabled',
    //             'mfaType',
    //             'failedAttempts',
    //             'lockedUntil',
    //         ],
    //     });

    //     return res
    // }

    // async updateLastLoginAt(userId: number) {
    //     await this.userRepo.update(userId, { lastLoginAt: new Date() })
    // }

    async getUser(dto: GetUserDto) {

    }

    async registerUser(dto: RegisterDto) {
        const exists = await this.prisma.user.findUnique({ where: { email: dto.email } })
        if (exists) ErrorExceptoin(404, 'Email already registered')


        const passwordHash = await bcrypt.hash(dto.password, 10)
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: passwordHash
            }
        })

        return { id: user.id, email: user.email }
    }

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } })
    }
}