import {GetTopScorersQuery} from "./get-top-scorers.query";
import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {TopScorerRepository} from "../../../infrastructure/repository/top-scorer.repository";

/**
 * Handler to get top scorers for a specific league and season.
 */
@QueryHandler(GetTopScorersQuery)
export class GetTopScorersHandler implements IQueryHandler<GetTopScorersQuery> {
    /**
     * Constructor
     *
     * @param TopScorerRepository topScorerRepository
     */
    constructor(private readonly topScorerRepository: TopScorerRepository) {}

    /**
     * Execute the query to get top scorers.
     *
     * @param GetTopScorersQuery query
     * @return Promise<any[]>
     */
    async execute(query: GetTopScorersQuery): Promise<any[]> {
        return await this.topScorerRepository.getTopScorers(query.leagueId, query.season);
    }
}