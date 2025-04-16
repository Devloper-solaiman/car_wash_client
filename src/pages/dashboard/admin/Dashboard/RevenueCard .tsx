import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Activity } from 'lucide-react';

const RevenueCard = ({ totalSalesRevenue }: { totalSalesRevenue: number }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <h2 className="text-sm font-medium">Revenue</h2>
      <Activity className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardBody>
      <div className="text-2xl font-bold">{totalSalesRevenue || 0}</div>
    </CardBody>
  </Card>
);

export default RevenueCard;
