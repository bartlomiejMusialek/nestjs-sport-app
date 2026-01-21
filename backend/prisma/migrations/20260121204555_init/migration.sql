-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "name" VARCHAR(1024) NOT NULL,
    "country" VARCHAR(128) NOT NULL,
    "logo" VARCHAR(1024) NOT NULL,
    "type" VARCHAR(8) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopScorer" (
    "id" SERIAL NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "playerName" VARCHAR(1024) NOT NULL,
    "playerPhoto" VARCHAR(1024) NOT NULL,
    "playerCountry" VARCHAR(128) NOT NULL,
    "teamName" VARCHAR(1024) NOT NULL,
    "season" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopScorer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "League_leagueId_key" ON "League"("leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "TopScorer_playerId_key" ON "TopScorer"("playerId");

-- AddForeignKey
ALTER TABLE "TopScorer" ADD CONSTRAINT "TopScorer_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("leagueId") ON DELETE RESTRICT ON UPDATE CASCADE;
