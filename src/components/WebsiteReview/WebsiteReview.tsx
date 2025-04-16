import { FC, useRef } from 'react';
import { useGetAllWebsiteReviewsQuery } from '../../redux/features/websiteReviewApi';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { useAppSelector } from '../../redux/hook';
import { useCurrentUser } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import RatingDisplay from './Rating';
import AddReviewModal from '../modal/AddReviewModal';
import WebsiteReviewSkeleton from './WebsiteReviewSkeleton';
import SectionTitle from '../ui/SectionTitle';
import { VscEmptyWindow } from 'react-icons/vsc';
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Container from '../ui/Container';

type WebsiteReviewType = {
  _id: string;
  user: {
    name: string;
    profileImg: string;
  };
  rating: number;
  feedback: string;
  createdAt: string;
};

const WebsiteReview: FC = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();

  const { data: websiteReviewData, isLoading: reviewLoading } =
    useGetAllWebsiteReviewsQuery({ limit: '10' });

  const reviewHandler = () => {
    navigate('/auth/login');
  };

  const websiteReviews: WebsiteReviewType[] = websiteReviewData?.data || [];

  // Calculate overall site rating
  const overallRating =
    websiteReviews.length > 0
      ? websiteReviews.reduce((acc, review) => acc + review.rating, 0) /
        websiteReviews.length
      : 0;

  if (reviewLoading) {
    return (
      <Container>
        <WebsiteReviewSkeleton />
      </Container>
    );
  }

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <Container>
      <div className="mt-10 mx-2">
        <SectionTitle
          subHeader="Customer Reviews"
          header="What Our Clients Say"
          des="Read real testimonials from our satisfied clients. We pride ourselves on our quality of service and customer satisfaction."
        />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
          <div className="text-center flex items-center gap-3 font-semibold">
            Overall website rating: {overallRating.toFixed(1)} / 5{' '}
            <RatingDisplay rating={overallRating} size={14} color="#D4D4D8" />
          </div>

          {user ? (
            <AddReviewModal />
          ) : (
            <Button
              onClick={reviewHandler}
              color="warning"
              variant="shadow"
              size="sm"
              radius="full"
              className="text-white"
            >
              Add Review
            </Button>
          )}
        </div>

        {websiteReviews.length === 0 ? (
          <div className="flex items-center justify-center w-full mt-5">
            <h2 className="text-default-900 text-center text-sm flex flex-col items-center gap-2 bg-default-50 rounded-lg px-6 py-1 my-10">
              <VscEmptyWindow className="text-warning text-lg" />
              No reviews are here!
            </h2>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={2} // Adjust based on your responsiveness needs
            autoplay={{ delay: 5000 }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3 },
            }}
            className="mt-5"
          >
            {websiteReviews.map((review) => (
              <SwiperSlide key={review._id}>
                <motion.div
                  className={`p-4 border border-default-100 rounded-lg bg-default-50 my-3 hover:shadow-lg transition-shadow duration-300 cursor-pointer `}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-1 items-center ">
                    <div className="flex flex-col md:flex-row items-center space-x-2">
                      <img
                        src={review.user?.profileImg}
                        alt={review.user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex items-center justify-center flex-col md:justify-start md:items-start">
                        <h3 className="text-sm font-semibold text-center md:text-start">
                          {review.user?.name}
                        </h3>
                        <div className="flex space-x-1 text-warning">
                          <RatingDisplay
                            rating={review.rating}
                            size={14}
                            color="#E4E6E7"
                          />
                        </div>
                      </div>
                    </div>{' '}
                    <div className="text-center text-xs text-default-600">
                      {format(new Date(review.createdAt), 'MMMM dd, yyyy')}
                    </div>
                  </div>
                  <p
                    className={`mt-4 text-xs text-default-800 text-center md:text-start`}
                  >
                    {review.feedback}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="flex items-center justify-center gap-3 mt-4">
          <Button
            isIconOnly
            radius="full"
            startContent={<IoIosArrowBack size={25} />}
            onClick={handlePrevSlide}
            aria-label="Previous review"
            className="bg-default-200 p-1 rounded-full text-warning-500"
          />
          <Button
            isIconOnly
            radius="full"
            startContent={<IoIosArrowForward size={25} />}
            onClick={handleNextSlide}
            aria-label="Next review"
            className="bg-default-200 p-1 rounded-full text-warning-500"
          />
        </div>
      </div>
    </Container>
  );
};

export default WebsiteReview;
