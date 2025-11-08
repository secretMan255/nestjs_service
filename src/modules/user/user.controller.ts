import { Controller, Get, Post, Body, UsePipes, Query, UseGuards } from '@nestjs/common'
import { GetUserDto } from './user.dto'
import { UserService } from './user.service'
import { validatePipe } from 'src/utils'
import { JwtAuthGuard } from 'src/guard/auth/jwt.auth.guard'

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UsePipes(validatePipe)
    async getUser(@Query() dto: GetUserDto) {
        return await this.userService.getUser(dto)
    }
}