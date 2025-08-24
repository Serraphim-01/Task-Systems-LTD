import { getPageDescription, getAwards } from './content-actions';
import { PageDescriptionForm, AddAwardForm, AwardList } from './AwardForms';

export default async function AwardManager() {
  const initialDescription = await getPageDescription('awards_page');
  const awards = await getAwards();

  return (
    <div>
      <PageDescriptionForm initialDescription={initialDescription} />
      <AddAwardForm />
      <AwardList awards={awards} />
    </div>
  );
}
