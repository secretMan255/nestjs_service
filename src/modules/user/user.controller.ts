import { Controller, Get, Post, Body, UsePipes, Query, UseGuards } from '@nestjs/common'
import { GetUserDto } from './user.dto'
import { UserService } from './user.service'
import { validatePipe } from 'src/utils'
import { JwtAuthGuard } from 'src/guard/auth/jwt.auth.guard'
import { Throttle, SkipThrottle } from '@nestjs/throttler';

// controller skip rate limit
// @SkipThrottle()
// Override default configuration for Rate limiting and duration
// @Throttle({ default: { limit: 60, ttl: 60 } })
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    // @Throttle({ default: { limit: 60, ttl: 60 } })
    @Get()
    @UseGuards(JwtAuthGuard)
    @UsePipes(validatePipe)
    async getUser(@Query() dto: GetUserDto) {
        return await this.userService.getUser(dto)
    }
}