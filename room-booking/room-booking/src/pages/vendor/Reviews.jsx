import { useEffect, useState } from "react";
import getRating from "../../services/vendor/RatignRooms";
import ReviewsDisplay from "../../components/rooms/Reviews";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReview = async () => {
    try {
      const data = await getRating();
      console.log('Response from Rating page:', data);

      if (Array.isArray(data) && data.length > 0) {
        setReviews(data);
      
        // Calculate the average rating
        const totalRating = data.reduce((acc, review) => acc + review.rating, 0);
        const avgRating = totalRating / data.length;
        setAverageRating(avgRating);
      } else {
        setReviews([]);
        setAverageRating(0);
        console.log('No reviews found.');
      }
      
      setLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setError('Failed to load reviews.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <>
      <main>
        <header>
          <h1>Reviews Page</h1>
        </header>
        <div>
          {loading ? (
            <p>Loading reviews...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              
              {reviews.length > 0 && (
                <table className="min-w-full divide-y divide-gray-200 mt-6">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reviews.map((review, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{review.user__username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.rating}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.feedback}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(review.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
};

// Helper function to format the date
const formatDate = (dateTimeStr) => {
  const date = new Date(dateTimeStr);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

export default ReviewsPage;
