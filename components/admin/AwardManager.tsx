import { getPageDescription, getAwards } from './content-actions';
import { AwardEditor } from './AwardForms';

export default async function AwardManager() {
  const initialDescription = await getPageDescription('awards_page');
  const awards = await getAwards();

  return (
    <AwardEditor initialDescription={initialDescription} awards={awards} />
  );
}
