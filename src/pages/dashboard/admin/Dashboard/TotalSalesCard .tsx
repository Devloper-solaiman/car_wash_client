import { Card, CardBody, CardHeader } from '@nextui-org/react';

const TotalSalesCard = ({ totalSales }: { totalSales: number }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <h2 className="text-sm font-medium">Total Sales</h2>
      <p className="h-4 w-4 text-muted-foreground"> ৳ </p>
    </CardHeader>
    <CardBody>
      <div className="text-2xl font-bold">{totalSales || 0}</div>
    </CardBody>
  </Card>
);

export default TotalSalesCard;
