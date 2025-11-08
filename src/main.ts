import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      referrerPolicy: { policy: 'no-referrer' },
    })
  )

  const origins = process.env.ORIGIN
    ? String(process.env.ORIGIN)
      .split(',')
      .map(o => o.trim())
      .filter(Boolean)
    : ['*'];

  const isWildcard = origins.length === 1 && origins[0] === '*'

  app.enableCors({
    origin: isWildcard ? true : origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, X-CSRF-Token',
    credentials: isWildcard,
    maxAge: 600,
  })

  // if using cookie
  // app.use(
  //   csurf({
  //     cookie: {
  //       key: 'XSRF-TOKEN',
  //       httpOnly: false,
  //       sameSite: 'lax',
  //       secure: true,
  //     },
  //   }),
  // );

  app.use(cookieParser());

  // if using cookie
  // app.use((req: any, res, next) => {
  //   const token = req.csrfToken();
  //   res.cookie('XSRF-TOKEN', token, {
  //     sameSite: 'lax',
  //     secure: true,
  //   });
  //   next();
  // });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
