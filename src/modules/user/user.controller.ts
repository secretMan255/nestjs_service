import { Controller, Get, Post, Body, UsePipes, Query } from '@nestjs/common'
import { GetUserDto } from './user.dto'
import { UserService } from './user.service'
import { validatePipe } from 'src/utils'

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    @UsePipes(validatePipe)
    async getUser(@Query() dto: GetUserDto) {
        return await this.userService.getUser(dto)
    }
}