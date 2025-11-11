import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, GetEventListDto, UpdateEventDto } from './event.dto';
import { ErrorExceptoin } from 'src/utils';
import * as bcrypt from 'bcrypt'

@Injectable()
export class EventService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getEventList(dto: GetEventListDto) {
        const where: any = {}
        const keyword: string | undefined = dto.keyword

        if (keyword) {
            where.OR = [
                { name: { contains: keyword, mode: 'insensitive' } },
                { location: { contains: keyword, mode: 'insensitive' } }
            ]
        }

        if (dto.status) where.status = dto.status

        const page = dto.page ? Number(dto.page) : 1
        const pageSize = dto.pageSize ? Number(dto.pageSize) : 10

        const skip = (page - 1) * pageSize
        const take = pageSize

        const [total, items] = await this.prisma.$transaction([
            this.prisma.event.count({ where }),
            this.prisma.event.findMany({
                where,
                orderBy: { startDate: 'desc' },
                skip,
                take,
            }),
        ])

        return { items, total }
    }

    async getEvent(id: number) {
        return await this.prisma.event.findUnique({ where: { id } })
    }

    async deleteEvent(id: number, userId: number, password: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId }, })
        if (!user) throw new UnauthorizedException('Unauthorized')

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw new UnauthorizedException('Invalid password')

        const exists = await this.prisma.event.findUnique({ where: { id } });
        if (!exists) throw new NotFoundException('Event not found');

        await this.prisma.event.delete({ where: { id } });

        return { success: true };
    }

    async createEvent(dto: CreateEventDto, thumbnailPath?: string | null) {
        const exists = await this.prisma.event.findUnique({ where: { name: dto.name }, })
        if (exists) ErrorExceptoin(404, 'Event name already registered')

        return this.prisma.event.create({
            data: {
                name: dto.name,
                startDate: new Date(dto.startDate),
                endDate: new Date(dto.endDate),
                location: dto.location,
                thumbnail: thumbnailPath ?? null,
                status: dto.status ?? 'Ongoing'
            }
        })
    }

    async updateEvent(id: number, dto: UpdateEventDto, thumbnailPath?: string | null) {
        if (dto.name) {
            const sameName = await this.prisma.event.findUnique({
                where: { name: dto.name },
            });

            if (sameName && sameName.id !== id) {
                ErrorExceptoin(404, 'Event name already exists')
            }
        }

        const data: any = {}

        if (dto.name !== undefined) data.name = dto.name
        if (dto.location !== undefined) data.location = dto.location
        if (dto.status !== undefined) data.status = dto.status
        if (dto.thumbnail !== undefined) data.thumbnail = dto.thumbnail
        if (dto.startDate !== undefined) data.startDate = new Date(dto.startDate)
        if (dto.endDate !== undefined) data.endDate = new Date(dto.endDate)
        if (thumbnailPath !== undefined) data.thumbnail = thumbnailPath

        return this.prisma.event.update({
            where: { id },
            data
        })
    }
}