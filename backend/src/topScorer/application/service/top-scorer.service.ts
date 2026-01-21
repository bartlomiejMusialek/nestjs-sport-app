import { Injectable } from '@nestjs/common';
import { ApiSportClient } from "../../../apiSport/infrastructure/api/apisport.client";
import { Observable } from 'rxjs';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTopScorerCommand } from "../cqrs/command/create-top-scorer.command";
import { GetTopScorersQuery } from "../cqrs/query/get-top-scorers.query";

/**
 * Service for managing top scorers.
 */
@Injectable()
export class TopScorerService {
    /**
     * Constructor
     *
     * @param ApiSportClient apiSportClient
     * @param CommandBus commandBus
     * @param QueryBus queryBus
     */
    constructor(
        private apiSportClient: ApiSportClient,
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {
    }

    /**
     * Get top scorers from API Sport
     *
     * @param string leagueId
     * @param string season
     * @return Observable<any>
     */
    public getTopScorersFromApi(leagueId: string, season: string): Observable<any> {
        return this.apiSportClient.getTopScorers(leagueId, season);
    }

    /**
     * Create a new top scorer
     *
     * @param number playerId
     * @param string playerName
     * @param string playerPhoto
     * @param string playerCountry
     * @param string teamName
     * @param number season
     * @param number goals
     * @param number assists
     * @param number leagueId
     * @return Promise<{topScorerId: number}>
     */
    async createTopScorer(
        playerId: number,
        playerName: string,
        playerPhoto: string,
        playerCountry: string,
        teamName: string,
        season: number,
        goals: number,
        assists: number,
        leagueId: number
    ): Promise<{topScorerId: number}> {
        return this.commandBus.execute(new CreateTopScorerCommand(
            leagueId,
            playerId,
            playerName,
            playerPhoto,
            playerCountry,
            teamName,
            season,
            goals,
            assists
        ));
    }

    /**
     * Get top scorers
     *
     * @param number leagueId
     * @param number season
     * @return Promise<any[]>
     */
    async getTopScorers(leagueId: number, season: number): Promise<any[]> {
        return this.queryBus.execute(new GetTopScorersQuery(leagueId, season));
    }
}