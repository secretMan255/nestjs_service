import { Controller, Get, Post, Body, UsePipes, Res, UseGuards, Param, ParseIntPipe, Delete, Put, UseInterceptors, UploadedFile, Query, Req } from '@nestjs/common'
import { validatePipe } from 'src/utils'
import { CreateEventDto, DeleteEventDto, GetEventListDto, UpdateEventDto } from './event.dto'
import { JwtAuthGuard } from 'src/guard/auth/jwt.auth.guard'
import { EventService } from './event.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('event')
export class EventController {
    constructor(
        private readonly eventService: EventService
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getEventList(@Query() query: GetEventListDto) {
        return this.eventService.getEventList(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getEvent(@Param('id', ParseIntPipe) id: number) {
        return this.eventService.getEvent(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(validatePipe)
    async deleteEvent(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: DeleteEventDto,
        @Req() req: Request,
    ) {
        const user = (req as any).user
        const userId = user?.sub || user?.id

        return this.eventService.deleteEvent(id, userId, dto.password)
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('thumbnail'))
    @UsePipes(validatePipe)
    async createEvent(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: CreateEventDto,
    ) {
        const thumbnailPath = file ? `/uploads/events/${file.filename}` : null;
        return this.eventService.createEvent(dto, thumbnailPath);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('thumbnail'))
    @UsePipes(validatePipe)
    async updateEvent(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: UpdateEventDto,
    ) {
        const thumbnailPath =
            file !== undefined ? `/uploads/events/${file.filename}` : undefined;

        return this.eventService.updateEvent(id, dto, thumbnailPath);
    }
}