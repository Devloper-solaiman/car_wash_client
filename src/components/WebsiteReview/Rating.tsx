import { FC } from "react";
import { FaStar } from "react-icons/fa";

type RatingDisplayProps = {
  rating: number;
  size?: number;
  color?: string;
};

const RatingDisplay: FC<RatingDisplayProps> = ({ rating, size=24, color='#ffd700' }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          size={size}
          color={i <= rating ? '#ffd700' : color}
        />
      );
    }
    return stars;
  };
  return (
    <div>{renderStars()}</div>
  );
};

export default RatingDisplay;
