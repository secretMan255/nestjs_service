import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsDateString,
    IsOptional,
    IsInt,
    Min,
    IsIn
} from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsDateString()
    startDate: string

    @IsNotEmpty()
    @IsDateString()
    endDate: string

    @IsNotEmpty()
    @IsString()
    location: string

    @IsOptional()
    @IsString()
    @IsIn(['Ongoing'], {
        message: 'status must be Ongoing',
    })
    status?: string;

    @IsOptional()
    @IsString()
    thumbnail?: string;
}

export class GetEventListDto {
    @IsOptional()
    @IsString()
    keyword?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsDateString()
    startDateFrom?: string;

    @IsOptional()
    @IsDateString()
    startDateTo?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    pageSize?: number = 10;
}

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    thumbnail?: string | null;
}

export class DeleteEventDto {
    @IsNotEmpty()
    @IsString()
    password: string;
}