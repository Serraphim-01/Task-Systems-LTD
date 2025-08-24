import { getPageDescription, getAchievements } from './content-actions';
import { PageDescriptionForm, AddAchievementForm, AchievementList } from './AchievementForms';

export default async function AchievementManager() {
  const initialDescription = await getPageDescription('achievements_page');
  const achievements = await getAchievements();

  return (
    <div>
      <PageDescriptionForm initialDescription={initialDescription} />
      <AddAchievementForm />
      <AchievementList achievements={achievements} />
    </div>
  );
}
