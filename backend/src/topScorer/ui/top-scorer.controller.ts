import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TopScorerService } from "../application/service/top-scorer.service";

@Controller('top-scorer')
export class TopScorerController {
    /**
     * Constructor of TopScorerController
     *
     * @param HttpService httpService
     * @param TopScorerService topScorerService
     */
    constructor(
        private readonly httpService: HttpService,
        private readonly topScorerService: TopScorerService,
    ) {
    }

    /**
     * Get Champions League Top Scorers
     */
    @Get('get-champions-league-top-scorers')
    getTopScorers(): Promise<any> {
        return this.topScorerService.getTopScorers(
            Number(process.env.API_SPORT_CHAMPIONS_LEAGUE_ID),
            Number(process.env.API_SPORT_SEASON)
        );
    }
}