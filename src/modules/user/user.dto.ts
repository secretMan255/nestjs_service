import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber
} from 'class-validator';

export class GetUserDto {
    @IsNumber()
    @IsOptional()
    id?: number

    @IsString()
    @IsOptional()
    username?: string

    @IsNumber()
    offset?: number = 0

    @IsNumber()
    limit?: number = 1
}