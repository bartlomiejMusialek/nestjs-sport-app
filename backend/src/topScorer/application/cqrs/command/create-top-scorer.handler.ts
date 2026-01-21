import { CreateTopScorerCommand } from "./create-top-scorer.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TopScorerRepository } from "../../../infrastructure/repository/top-scorer.repository";

/**
 * Handler to create a new top scorer.
 */
@CommandHandler(CreateTopScorerCommand)
export class CreateTopScorerHandler implements ICommandHandler<CreateTopScorerCommand> {
    /**
     * Constructor
     * @param TopScorerRepository topScorerRepository
     */
    constructor(private readonly topScorerRepository: TopScorerRepository) {}

    /**
     * Execute the command to create a new top scorer.
     *
     * @param CreateTopScorerCommand command
     * @return Promise<{topScorerId: number}>
     */
    async execute(command: CreateTopScorerCommand): Promise<{topScorerId: number}> {
        const row =  await this.topScorerRepository.execute(
            command.playerId,
            command.playerName,
            command.playerPhoto,
            command.playerCountry,
            command.teamName,
            command.season,
            command.goals,
            command.assists,
            command.leagueId
        );

        return { topScorerId: row }
    }
}