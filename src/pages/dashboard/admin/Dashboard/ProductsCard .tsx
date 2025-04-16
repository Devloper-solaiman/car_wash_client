import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Box } from 'lucide-react';
import { TMeta } from '../../../../types';

const ProductsCard = ({ servicesMeta }: { servicesMeta: TMeta }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <h2 className="text-sm font-medium">Products</h2>
      <Box className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardBody>
      <div className="text-2xl font-bold">{servicesMeta?.total || 0}</div>
    </CardBody>
  </Card>
);

export default ProductsCard;
