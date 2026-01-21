import { Command, CommandRunner } from 'nest-commander';
import { lastValueFrom } from 'rxjs';
import { TopScorerService } from '../application/service/top-scorer.service';

/**
 * Command to get top scorers and store them in the database.
 */
@Command({
    name: 'get:top-scorers',
    description: 'Get top scorers to database',
})
export class GetTopScorersCommand extends CommandRunner {
    /**
     * Creates an instance of GetTopScorersCommand.
     *
     * @param TopScorerService topScorerService
     */
    constructor(
        private readonly topScorerService: TopScorerService,
    ) {
        super();
    }

    /**
     * Runs the command to fetch and store top scorers.
     *
     * @return Promise<void>
     */
    async run(): Promise<void> {
        const results = await lastValueFrom(this.topScorerService.getTopScorersFromApi(
            process.env.API_SPORT_CHAMPIONS_LEAGUE_ID as string,
            process.env.API_SPORT_SEASON as string
        ));

        const topScorers = results.response.map((result: any) =>
            this.topScorerService.createTopScorer(
                result.player.id,
                result.player.name,
                result.player.photo,
                result.player.nationality,
                result.statistics[0].team.name,
                result.statistics[0].league.season,
                result.statistics[0].goals.total,
                result.statistics[0].goals.assists?? 0,
                result.statistics[0].league.id,
            )
        );
    }
}