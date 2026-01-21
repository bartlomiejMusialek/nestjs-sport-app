import {Injectable} from '@nestjs/common';
import {ApiSportClient} from "../../../apiSport/infrastructure/api/apisport.client";
import { Observable } from 'rxjs';
import { CommandBus } from '@nestjs/cqrs';
import { CreateLeagueCommand } from '../cqrs/command/create-league.command';

/**
 * Service for managing leagues.
 */
@Injectable()
export class LeagueService {
    /**
     * Constructor
     *
     * @param ApiSportClient apiSportClient
     * @param CommandBus commandBus
     */
    constructor(
        private apiSportClient: ApiSportClient,
        private commandBus: CommandBus,
    ) {
    }

    /**
     * Get leagues from API Sport
     *
     * @return Observable<any>
     */
    public getLeagues(): Observable<any> {
        return this.apiSportClient.getLeagues();
    }

    /**
     * Create a new league
     *
     * @param number leagueId
     * @param string name
     * @param string country
     * @param string type
     * @param string logo
     *
     * @return Promise<{leagueId: number}>
     */
    async createLeague(
        leagueId: number,
        name: string,
        country: string,
        type: string,
        logo: string
    ): Promise<{leagueId: number}> {
        return this.commandBus.execute(new CreateLeagueCommand(leagueId, name, country, logo, type));
    }
}