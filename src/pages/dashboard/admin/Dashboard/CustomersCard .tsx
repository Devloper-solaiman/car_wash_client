import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Users } from 'lucide-react';
import { TMeta } from '../../../../types';

const CustomersCard = ({ usersMeta }: { usersMeta: TMeta | undefined }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <h2 className="text-sm font-medium">Customers</h2>
      <Users className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardBody>
      <div className="text-2xl font-bold">{usersMeta?.total || 0}</div>
    </CardBody>
  </Card>
);

export default CustomersCard;
