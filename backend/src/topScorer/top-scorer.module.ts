import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTopScorerHandler } from './application/cqrs/command/create-top-scorer.handler';
import { TopScorerRepository } from './infrastructure/repository/top-scorer.repository';
import { TopScorerService } from './application/service/top-scorer.service';
import { GetTopScorersCommand } from './cli/get-top-scorers.command';
import { GetTopScorersHandler} from "./application/cqrs/query/get-top-scorers.handler";
import { TopScorerController } from './ui/top-scorer.controller';

@Module({
    imports: [HttpModule, CqrsModule],
    providers: [
        CreateTopScorerHandler,
        TopScorerRepository,
        TopScorerService,
        GetTopScorersCommand,
        GetTopScorersHandler
    ],
    controllers: [TopScorerController],
})
export class TopScorerModule {}