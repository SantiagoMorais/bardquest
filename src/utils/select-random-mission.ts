import { IMissionDifficulty } from "@/config/progression";
import { IMission } from "@/interfaces/api/mission";
import catalog from "@/utils/missions.json";

/**
 * Selects a random mission from the catalog based on difficulty probability.
 * * Rules:
 * - Easy missions have the highest chance to appear.
 * - Epic missions have the lowest chance to appear.
 * - It filters out missions the user already has (activeMissionIds).
 * - It adds a 'created_at' timestamp to the selected mission.
 * @param {IMission[]} catalog - The full list of available missions.
 * @param {string[]} activeMissionIds - IDs of missions currently assigned to the user.
 * @returns {IMission | null} A new random mission object, or null if no missions are available.
 */
export const selectRandomMission = ({
  activeMissionIds,
}: {
  activeMissionIds: string[];
}): IMission | null => {
  const availableMissions = catalog.filter(
    (mission) => !activeMissionIds.includes(mission.id)
  );

  if (availableMissions.length === 0) return null;

  const weights: Record<IMissionDifficulty, number> = {
    easy: 10,
    medium: 5,
    hard: 2,
    epic: 1000,
  };

  const totalWeight = availableMissions.reduce(
    (sum, mission) => sum + weights[mission.difficulty as IMissionDifficulty],
    0
  );

  let random = Math.random() * totalWeight;

  for (const mission of availableMissions) {
    const weight = weights[mission.difficulty as IMissionDifficulty];

    if (random < weight) {
      return {
        ...mission,
        difficulty: mission.difficulty as IMissionDifficulty,
        created_at: new Date().toISOString(),
      };
    }

    random -= weight;
  }

  const lastMission = availableMissions[availableMissions.length - 1];
  return lastMission
    ? {
        ...lastMission,
        difficulty: lastMission.difficulty as IMissionDifficulty,
        created_at: new Date().toISOString(),
      }
    : null;
};
