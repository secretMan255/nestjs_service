import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { ErrorExceptoin } from 'src/utils';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    async login(dto: LoginDto) {
        const user = await this.userService.findUserByEmail(dto.email)
        if (!user || !user.password) return ErrorExceptoin(401, 'Invalid username or password')

        const passwordValidate = await bcrypt.compare(dto.password, user.password)
        if (!passwordValidate) return ErrorExceptoin(401, 'Invalid username or password')

        return { data: { accessToken: await this.jwtService.signAsync({ id: user.id, email: user.email }) } }
    }
    // async login(dto: LoginDto) {
    //     const { total, items } = await this.userService.getUser({ email: dto.email })

    //     if (total <= 0) ErrorExceptoin(401, 'Invalid username or password')

    //     const user = items[0]
    //     const secret = await this.userService.getUserPassword({ id: user.id })

    //     if (!secret || !secret.passwordHash) throw new UnauthorizedException('Invalid username or password')

    //     const isMatch = await bcrypt.compare(dto.password, String(secret.passwordHash))

    //     if (!isMatch) ErrorExceptoin(401, 'Invalid username or password')

    //     // generate token
    //     const payload = { id: user.id, name: user.displayName, permission: ['product.visit_test'] }

    //     await this.userService.updateLastLoginAt(user.id)

    //     return {
    //         id: user.id,
    //         user: user.displayName,
    //         email: user.email,
    //         accesstoken: await this.jwtService.signAsync(payload)
    //     }
    // }

    async register(dto: RegisterDto) {
        return await this.userService.registerUser(dto)
    }
}