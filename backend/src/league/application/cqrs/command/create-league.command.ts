import { Command } from '@nestjs/cqrs';

/**
 * Command to create a new league.
 */
export class CreateLeagueCommand extends Command<{
    leagueId: number;
}> {
    /**
     *
     * @param number leagueId
     * @param string name
     * @param string country
     * @param string logo
     * @param string type
     */
    constructor(
        public readonly leagueId: number,
        public readonly name: string,
        public readonly country: string,
        public readonly logo: string,
        public readonly type: string,
    ) {
        super();
    }
}