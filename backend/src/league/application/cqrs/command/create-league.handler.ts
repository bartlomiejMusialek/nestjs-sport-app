import { CreateLeagueCommand } from "./create-league.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LeagueRepository } from "../../../infrastructure/repository/league.repository";

@CommandHandler(CreateLeagueCommand)
export class CreateLeagueHandler implements ICommandHandler<CreateLeagueCommand> {
    /**
     * Constructor
     *
     * @param LeagueRepository leagueRepository
     */
    constructor(private readonly leagueRepository: LeagueRepository) {}

    /**
     * Execute the command to create a new league.
     *
     * @param CreateLeagueCommand command
     * @return Promise<{leagueId: number}>
     */
    async execute(command: CreateLeagueCommand): Promise<{leagueId: number}> {
        const row =  await this.leagueRepository.createLeague(
            command.leagueId,
            command.name,
            command.country,
            command.type,
            command.logo
        );

        return { leagueId: row}
    }
}