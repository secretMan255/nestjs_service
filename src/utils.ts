import { ValidationPipe } from '@nestjs/common';

export const validatePipe = new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })