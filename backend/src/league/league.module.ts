import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GetLeaguesCommand } from "./cli/get-leagues.command";
import { LeagueService } from "./application/service/league.service";
import { CreateLeagueHandler } from "./application/cqrs/command/create-league.handler";
import { CqrsModule } from '@nestjs/cqrs';
import { LeagueRepository } from "./infrastructure/repository/league.repository";

@Module({
    imports: [HttpModule, CqrsModule,],
    providers: [GetLeaguesCommand, LeagueService, CreateLeagueHandler, LeagueRepository],
})
export class LeagueModule {}