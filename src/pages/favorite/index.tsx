import { FC } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import {
  getAllFavoriteServices,
  removeFavorite,
  clearFavorites,
} from "../../redux/features/service/serviceSlice";
import { Button, Card } from "@nextui-org/react";
import { LuArrowUpRight } from "react-icons/lu";
import Container from "../../components/ui/Container";
import NoData from "../../components/serviceSlots/NoData";
import { Link } from "react-router-dom";

const FavoriteService: FC = () => {
  const favoriteServices = useAppSelector(getAllFavoriteServices);
  const dispatch = useAppDispatch();

  // Function to remove a specific favorite
  const handleRemoveFavorite = (serviceId: string) => {
    dispatch(removeFavorite(serviceId));
  };

  // Function to clear all favorites
  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };
  return (
    <Container>
      <div className="p-2 md:p-6 bg-defaults-100 min-h-screen">
        <div className="flex justify-between items-center mb-6 ">
          <Button
            onClick={handleClearFavorites}
            className={`text-white ${
              favoriteServices.length === 0 && "cursor-not-allowed bg-gray-300"
            }`}
            radius="full"
            color="warning"
            variant="solid"
            size="sm"
            disabled={favoriteServices.length === 0}
          >
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {favoriteServices.length > 0 ? (
            favoriteServices.map((service) => (
              <Card
                key={service._id}
                className="p-4 bg-default-50 border border-default-100 rounded flex flex-row justify-between gap-3"
              >
                <div className="flex flex-col md:flex-row gap-5 items-start">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="size-24 object-cover rounded-t-md"
                  />
                  <div className="flex flex-col gap-1 items-start">
                    <h3 className="text-xl font-semibold mb-2 text-defaults-800">
                      {service.name}
                    </h3>
                    <p className="text-sm text-defaults-600 mb-4">
                      {service.description.length > 50
                        ? `${service.description.slice(0, 50)}...`
                        : service.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col  items-center gap-2">
                  <span className="text-lg font-semibold text-primaryColor">
                    ৳ {service.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => handleRemoveFavorite(service._id)}
                    className="text-red-500 hover:text-red-700 w-[150px] h-[30px]"
                    color="warning"
                    variant="bordered"
                    radius="full"
                    startContent={<FaTrashAlt size={20} />}
                  >
                    Remove
                  </Button>
                  <Button
                    as={Link}
                    to={`/service-details/${service._id}`}
                    className="text-white w-[150px] h-[30px]"
                    color="warning"
                    variant="solid"
                    endContent={<LuArrowUpRight />}
                  >
                    Book Slots
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="col-span-12">
              <NoData text="Empty" />
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default FavoriteService;
