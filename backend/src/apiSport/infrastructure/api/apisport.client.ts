import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';


/**
 * ApiSportClient is a client to interact with the API Sport service.
 */
@Injectable()
export class ApiSportClient {
    /**
     * Constructor of ApiSportClient
     * @param HttpService httpService
     */
    constructor(private readonly httpService: HttpService) {}

    /**
     * Get leagues from API Sport
     *
     * @return Observable<any>
     */
    public getLeagues(): Observable<any> {
        return this.httpService.get(process.env.API_SPORT_URL + '/leagues', {
            headers: {
                'x-apisports-key': process.env.API_SPORT_KEY as string,
            },
        }).pipe(
            map(response => response.data),
        );
    }

    /**
     * Get top scorers from API Sport
     *
     * @param string leagueId
     * @param string season
     * @return Observable<any>
     */
    public getTopScorers(leagueId: string, season: string): Observable<any> {
        return this.httpService.get(process.env.API_SPORT_URL + '/players/topscorers?league=' + leagueId + '&season=' + season, {
            headers: {
                'x-apisports-key': process.env.API_SPORT_KEY as string,
            },
        }).pipe(
            map(response => response.data),
        );
    }
}