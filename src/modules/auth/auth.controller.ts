import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common'
import { LoginDto } from './auth.dto'
import { AuthService } from './auth.service'
import { validatePipe } from 'src/utils'

@Controller('login')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post()
    @UsePipes(validatePipe)
    async login(@Body() dto: LoginDto) {
        return await this.authService.login(dto)
    }
}