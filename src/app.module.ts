import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Vow } from './modules/vows/vow.entity';
import { IncidentLog } from './modules/incidents/incident-log.entity';
import { VowsModule } from './modules/vows/vows.module';
import { IncidentsModule } from './modules/incidents/incidents.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'better-sqlite3',
        database: config.get<string>('DB_PATH', 'echoes_of_her.sqlite'),
        entities: [Vow, IncidentLog],
        synchronize: config.get<string>('DB_SYNCHRONIZE', 'true') === 'true',
      }),
    }),
    VowsModule,
    IncidentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


