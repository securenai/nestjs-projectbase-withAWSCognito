import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

// DB connection
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // type of database
      database: 'db.sqlite', // name of database
      entities: [User],
      /**
       * Extremely important setting *
       * This is only for DEVELOPMENT environment
       *
       * This automatically create and remove tables, add / remove columns
       * by TypeORM via looking at our ENTITIES.
       *
       * This means if we change our entities our tables and columns will change
       * dynamically to match our entities
       */
      synchronize: true,
    }),
    UsersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
