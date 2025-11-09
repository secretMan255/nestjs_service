import { Controller, Get, Post, Body, UsePipes, Query, UseGuards } from '@nestjs/common'
import { GetUserDto } from './user.dto'
import { UserService } from './user.service'
import { validatePipe } from 'src/utils'
import { JwtAuthGuard } from 'src/guard/auth/jwt.auth.guard'
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { PermissionsGuard } from 'src/guard/auth/permissions.guard'
import { Permissions } from 'src/guard/auth/permissions.decorator'

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
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('user.visit', 'user.edit')
    @UsePipes(validatePipe)
    async getUser(@Query() dto: GetUserDto) {
        return await this.userService.getUser(dto)
    }
}