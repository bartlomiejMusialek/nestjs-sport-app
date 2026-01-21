import { Command } from '@nestjs/cqrs';

/**
 * Command to create a new top scorer.
 */
export class CreateTopScorerCommand extends Command<{
    topScorerId: number;
}> {
    /**
     * @param number leagueId
     * @param number playerId
     * @param string playerName
     * @param string playerPhoto
     * @param string playerCountry
     * @param string teamName
     * @param number season
     * @param number goals
     * @param number assists
     */
    constructor(
        public readonly leagueId: number,
        public readonly playerId: number,
        public readonly playerName: string,
        public readonly playerPhoto: string,
        public readonly playerCountry: string,
        public readonly teamName: string,
        public readonly season: number,
        public readonly goals: number,
        public readonly assists: number,
    ) {
        super();
    }
}