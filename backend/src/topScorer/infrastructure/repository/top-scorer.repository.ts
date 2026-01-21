import { Injectable } from '@nestjs/common';
import { PrismaService} from "../../../common/prisma.service";

/**
 * TopScorerRepository provides methods to interact with the Top Scorer data in the database.
 */
@Injectable()
export class TopScorerRepository {
    /**
     * Constructor of TopScorerRepository
     *
     * @param PrismaService prismaService
     */
    constructor(private prismaService: PrismaService) {}

    /**
     * Create or update a top scorer in the database.
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
     * @return Promise<number> The ID of the created or updated top scorer.
     */
    async execute(
        playerId: number,
        playerName: string,
        playerPhoto: string,
        playerCountry: string,
        teamName: string,
        season: number,
        goals: number,
        assists: number,
        leagueId: number
    ): Promise<number> {
        console.log(playerId, playerName, playerPhoto, playerCountry, teamName, season, goals, assists, leagueId);
        const topScorer = await this.prismaService.topScorer.upsert({
            where: { playerId: playerId },
            update: {
                playerName,
                playerPhoto,
                playerCountry,
                teamName,
                season,
                goals,
                assists,
                leagueId,

            },
            create: {
                playerId: playerId,
                playerName: playerName,
                playerPhoto: playerPhoto,
                playerCountry: playerCountry,
                teamName: teamName,
                season: season,
                goals: goals,
                assists: assists,
                league: {
                    connect: { leagueId: leagueId }
                }
            }
        });

        return topScorer.id;
    }

    /**
     * Get top scorers by league and season.
     *
     * @param number leagueId
     * @param number season
     * @return Promise<any[]> List of top scorers.
     */
    async getTopScorers(leagueId: number, season: number): Promise<any[]> {
        return this.prismaService.topScorer.findMany({
            where: { leagueId: leagueId, season: season },
            orderBy: { goals: 'desc' },
        });
    }
}