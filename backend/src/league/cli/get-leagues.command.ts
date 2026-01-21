import { Command, CommandRunner } from 'nest-commander';
import { LeagueService} from "../application/service/league.service";
import { lastValueFrom } from 'rxjs';

/**
 * Command to get leagues and store them in the database.
 */
@Command({
    name: 'get:leagues',
    description: 'Get leagues to database',
})
export class GetLeaguesCommand extends CommandRunner {
    /**
     * @param LeagueService leagueService
     */
    constructor(
        private readonly leagueService: LeagueService,
    ) {
        super();
    }

    /**
     * Runs the command to fetch and store leagues.
     *
     * @return Promise<void>
     */
    async run(): Promise<void> {
        const results = await lastValueFrom(this.leagueService.getLeagues());

        const leagues = results.response.map((result: any) =>
            this.leagueService.createLeague(
                result.league.id,
                result.league.name,
                result.country.name,
                result.league.type,
                result.league.logo
            )
        );

        console.log('✅ Leagues seeded');
    }
}
