import { getPageDescription, getAchievements } from './content-actions';
import { AchievementEditor } from './AchievementForms';

export default async function AchievementManager() {
  const initialDescription = await getPageDescription('achievements_page');
  const achievements = await getAchievements();

  return (
    <AchievementEditor initialDescription={initialDescription} achievements={achievements} />
  );
}
