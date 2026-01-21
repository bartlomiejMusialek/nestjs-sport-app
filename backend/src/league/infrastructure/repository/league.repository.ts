import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../../common/prisma.service';

/**
 * LeagueRepository provides methods to interact with the League data in the database.
 */
@Injectable()
export class LeagueRepository {
    /**
     * Constructor of LeagueRepository
     *
     * @param PrismaService prismaService
     */
    constructor(private prismaService: PrismaService)  {}

    /**
     * Create or update a league in the database.
     *
     * @param number leagueId
     * @param string name
     * @param string country
     * @param string type
     * @param string logo
     *
     * @return Promise<number> The ID of the created or updated league.
     */
    async createLeague(leagueId: number, name: string, country: string, type: string, logo: string): Promise<number> {
        const league = await this.prismaService.league.upsert({
            where: { leagueId: leagueId },
            update: {
                name,
                country,
                type,
                logo,
            },
            create: {
                leagueId: leagueId,
                name: name,
                country: country,
                type: type,
                logo: logo,
            }
        });

        return league.id;
    }
}