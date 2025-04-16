import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { GoArrowUpRight } from 'react-icons/go';
import { useGetAllServicesQuery } from '../../redux/features/admin/serviceManagementApi';
import { TService } from '../../types';
import { Link } from 'react-router-dom';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch services based on search query
  const { data: servicesData, isLoading } = useGetAllServicesQuery(
    { searchTerm: query },
    { skip: !query } // Skip fetching if query is empty
  );

  const services = (servicesData?.data as TService[]) || [];

  return (
    <div className="relative w-full max-w-md mx-auto mb-16">
      {/* Search Input */}
      <div className="flex items-center rounded-full bg-default-50 shadow-md px-2 py-1">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-full outline-none bg-default-50"
          placeholder="Find your service here"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <button className="p-2 text-warning-600">
          <FiSearch size={25} />
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && query && (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg max-h-40 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-2 text-default-800">Loading...</div>
          ) : services.length > 0 ? (
            services.map((item, index) => (
              <Link
                to={`/service-details/${item?._id}`}
                key={index}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => setQuery(item.name)} // Set input value to selected item
              >
                <GoArrowUpRight className="text-gray-800" />
                <span className="text-gray-900">{item.name}</span>
                <IoIosArrowForward className="text-warning-600" />
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
