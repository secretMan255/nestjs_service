import { Controller, Get, Post, Body, UsePipes, Res } from '@nestjs/common'
import type { Response } from 'express'
import { LoginDto, RegisterDto } from './auth.dto'
import { AuthService } from './auth.service'
import { validatePipe } from 'src/utils'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @UsePipes(validatePipe)
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        // set cookie
        // const result = await this.authService.login(dto)

        // res.cookie('liangliang_access_token', result.token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'lax',
        //     path: '/',
        //     maxAge: 60 * 60 * 1000,
        // });

        // return result

        return await this.authService.login(dto)
    }

    @Post('register')
    @UsePipes(validatePipe)
    async register(@Body() dto: RegisterDto) {
        return await this.authService.register(dto)
    }
}