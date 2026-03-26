const StarRating = ({ rating, setRating }: any) => {
  return (
    <div className="flex gap-1 text-2xl cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          className={star <= rating ? "text-yellow-400" : "text-gray-400"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;