import { FC } from 'react';
import { Button, Card, Chip } from '@nextui-org/react';
import { TService } from '../../types';
import { FaClock } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../../redux/features/service/serviceSlice';
import { toast } from 'sonner';

interface ServiceCardProps {
  service: TService;
}

const ServiceCard: FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleServiceDetails = () => {
    navigate(`/service-details/${service._id}`);
  };

  const handleAddToFavorites = () => {
    dispatch(addFavorite(service));
    if (service) {
      toast.success('Add successfully');
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Card
      as={motion.div}
      className={`overflow-hidden h-[370px] md:h-[380px] border border-default-100 rounded  bg-default-50 hover:border-none hover:shadow-lg`}
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.9 }}
    >
      <img
        src={service.image}
        alt={service.name}
        className="h-[130px] w-full object-cover"
      />
      <div className="p-1 md:p-4 relative">
        <h3 className="text-sm md:text-xl font-semibold mb-2">
          {service.name}
        </h3>
        <p className="text-xs text-default-600 mb-4">
          {service.description?.length > 50
            ? `${service.description.slice(0, 50)}...`
            : service.description}
        </p>
        <div className="mt-2 md:mt-5 absolute inset-0 top-[90px] md:top-[120px] z-20 px-1 md:px-4">
          <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center">
            <Chip color="warning" variant="flat">
              <p className="text-sm flex items-center gap-2">
                <FaClock size={16} className="mb-0.5" /> {service.duration}{' '}
                minutes
              </p>
            </Chip>
            <Chip>
              <p className="text-primaryColor font-medium">
                ৳ {service.price.toFixed(2)}
              </p>
            </Chip>
          </div>
          <div className="mt-8 flex items-center justify-between gap-3 w-full">
            <Button
              className="text-white w-[150px] h-[30px]"
              onClick={handleServiceDetails}
              color="warning"
              variant="solid"
            >
              Book Slots
            </Button>
            <Button
              radius="full"
              size="sm"
              startContent={<FaHeart size={22} className="text-red-500" />}
              color="warning"
              isIconOnly
              variant="flat"
              onClick={handleAddToFavorites} // Add the onClick handler
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
