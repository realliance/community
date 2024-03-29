import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './db';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/group.module';
import { ConnectionsModule } from './connections/connections.module';

// 3rd Party Modules
const LIBRARY_IMPORTS = [
  ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
    envFilePath: ['.env', '.env.development'],
  }),
  TypeOrmModule.forRoot(getDatabaseConfig()),
];

// Application Feature Imports
const FEATURE_IMPORTS = [UsersModule, GroupsModule];

// App Module Configuration
@Module({
  imports: [...LIBRARY_IMPORTS, ...FEATURE_IMPORTS],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
