import { FC } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  Chip,
  DropdownMenu,
  DropdownItem,
  Slider,
} from '@nextui-org/react';
import { FaFilter } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

interface ServiceFilterProps {
  sortItem: string;
  setSortItem: (sortItem: string) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  minPrice: string;
  maxPrice: string;
  setMinPrice: (minPrice: string) => void;
  setMaxPrice: (maxPrice: string) => void;
}

const ServiceFilter: FC<ServiceFilterProps> = ({
  setSortItem,
  searchTerm,
  setSearchTerm,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  const handleItemClick = (key: string) => setSortItem(key);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinPrice(value[0].toString());
      setMaxPrice(value[1].toString());
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mx-auto rounded-full bg-default-50 border border-default-200 w-full md:w-1/3 px-2 py-1 my-5">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-full outline-none bg-default-50"
          placeholder="Find your service here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="p-2 text-warning-600">
          <FiSearch size={25} />
        </button>
      </div>

      {/* Price Range Slider and Reset Button */}
      <div className="flex flex-row gap-3 justify-between items-center mb-4">
        <div className="flex flex-col justify-start gap-5">
          <div className="flex flex-col md:flex-row items-center justify-start gap-4">
            <Slider
              size="sm"
              label="Price Range"
              defaultValue={[
                parseFloat(minPrice) || 0,
                parseFloat(maxPrice) || 1000,
              ]}
              minValue={0}
              maxValue={1000}
              step={2}
              classNames={{
                base: 'max-w-md gap-3',
                track: 'border-s-warning-100',
                filler: 'bg-gradient-to-r from-warning-100 to-warning-500',
              }}
              onChange={handleSliderChange}
              renderThumb={(props) => (
                <div
                  {...props}
                  className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span className="transition-transform bg-gradient-to-br shadow-small from-warning-100 to-warning-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                </div>
              )}
            />
          </div>
        </div>

        {/* Sort Dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Chip
              variant="flat"
              color="default"
              endContent={<FaFilter size={14} />}
            >
              Filter
            </Chip>
          </DropdownTrigger>
          <DropdownMenu aria-label="Filter options" selectionMode="single">
            <DropdownItem
              key="createdAt"
              onClick={() => handleItemClick('-createdAt')}
            >
              New
            </DropdownItem>
            <DropdownItem
              key="-createdAt"
              onClick={() => handleItemClick('createdAt')}
            >
              Old
            </DropdownItem>
            <DropdownItem
              key="-price"
              onClick={() => handleItemClick('-price')}
            >
              Price (High to low)
            </DropdownItem>
            <DropdownItem key="price" onClick={() => handleItemClick('price')}>
              Price (Low to high)
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default ServiceFilter;
