import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './auth.dto';
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
        const { total, items } = await this.userService.getUser({ email: dto.email })

        if (total <= 0) ErrorExceptoin(401, 'Invalid username or password')

        const user = items[0]
        const secret = await this.userService.getUserPassword({ id: user.id })

        if (!secret || !secret.passwordHash) throw new UnauthorizedException('Invalid username or password')

        const isMatch = await bcrypt.compare(dto.password, String(secret.passwordHash))

        if (!isMatch) ErrorExceptoin(401, 'Invalid username or password')

        // generate token
        const payload = { id: user.id, name: user.displayName }

        await this.userService.updateLastLoginAt(user.id)

        return {
            id: user.id,
            user: user.displayName,
            email: user.email,
            token: await this.jwtService.signAsync(payload)
        }
    }
}