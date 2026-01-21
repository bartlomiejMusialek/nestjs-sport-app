import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LeagueModule } from './league/league.module';
import { CommonModule} from "./common/common.module";
import { ApiSportModule } from './apiSport/apisport.module';
import { TopScorerModule} from "./topScorer/top-scorer.module";
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true,
        }),
        CqrsModule.forRoot(),

        LeagueModule,
        CommonModule,
        ApiSportModule,
        TopScorerModule,
    ],
})
export class AppModule {}
