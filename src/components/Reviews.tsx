import { FC, useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import { ReviewItem } from "../models/ReviewItem";

const reviews: ReviewItem[] = [
  {
    username: "atuny0",
    rating: 5,
    review:
      "The product is nice. I got the delivery on time. I am using it for the last four months. My exprience with this product is very good.",
  },
  {
    username: "hbingley1",
    rating: 4,
    review:
      "I am satisfied with the value for money of the product. Everything seems nice but the delivery time seems a bit delayed",
  },
  {
    username: "rshawe2",
    rating: 3,
    review:
      "I found the product not long lasting. The quality also seemed a bit downgraded. I don't think its value for money.",
  },
  {
    username: "yraigatt3",
    rating: 4,
    review:
      "The product is nice. I got the delivery on time. I am using it for the last four months. My exprience with this product is very good.",
  },
  {
    username: "kmeus4",
    rating: 3,
    review:
      "The quality could have been better. I feel like wasting my money. I should have been more careful while buying it.",
  },
  {
    username: "dpettegre6",
    rating: 5,
    review:
      "The product is nice. I got the delivery on time. I am using it for the last four months. My exprience with this product is very good.",
  },
  {
    username: "ggude7",
    rating: 4,
    review:
      "I am satisfied with the value for money of the product. Everything seems nice but the delivery time seems a bit delayed",
  },
  {
    username: "nloiterton8",
    rating: 3,
    review:
      "I found the product not long lasting. The quality also seemed a bit downgraded. I don't think its value for money.",
  },
  {
    username: "umcgourty9",
    rating: 4,
    review:
      "The product is nice. I got the delivery on time. I am using it for the last four months. My exprience with this product is very good.",
  },
  {
    username: "rhallawellb",
    rating: 3,
    review:
      "The quality could have been better. I feel like wasting my money. I should have been more careful while buying it.",
  },
];

const getShuffledArr = () => {
  const arr: ReviewItem[] = [];
  const start = Math.floor(Math.random() * 4);
  for (let index = start; index < start + 5; index++) {
    arr.push(reviews[index]);
  }
  return arr;
};

const Reviews: FC<{ id: number }> = ({ id }) => {
  const [items, setItems] = useState<ReviewItem[]>([]);

  useEffect(() => {
    const _arr = getShuffledArr();
    setItems(_arr);
  }, [id]);

  return (
    <div className="px-2">
      <h1 className="text-2xl font-semibold mb-2">Reviews</h1>
      <div className="space-y-2">
        {items?.map(({ username, rating, review }) => (
          <div key={username} className="leading-4" data-test="review-item">
            <h3 className="font-semibold text-md">{username}</h3>
            <RatingStar rating={rating} />
            <p className="text-sm leading-4">{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Reviews;
