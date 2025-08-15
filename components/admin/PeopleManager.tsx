import DirectorForm from './DirectorForm';
import DirectorList from './DirectorList';
import ManagementForm from './ManagementForm';
import ManagementList from './ManagementList';
import { Separator } from '../ui/separator';

const PeopleManager = () => {
  return (
    <div className="space-y-8">
      <div>
        <DirectorList />
        <Separator className="my-8" />
        <DirectorForm />
      </div>
      <Separator className="my-8" />
      <div>
        <ManagementList />
        <Separator className="my-8" />
        <ManagementForm />
      </div>
    </div>
  );
};

export default PeopleManager;
