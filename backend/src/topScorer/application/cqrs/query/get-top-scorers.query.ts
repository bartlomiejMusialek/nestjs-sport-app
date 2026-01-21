import { Query } from '@nestjs/cqrs';

/**
 * Query to get top scorers for a specific league and season.
 */
export class GetTopScorersQuery{
    constructor(
        public readonly leagueId: number,
        public readonly season: number,
    ) {
    }
}