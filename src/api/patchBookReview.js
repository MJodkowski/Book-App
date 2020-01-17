import { SERVER_URL } from '../utils/constants';
import HTTP from '../utils/HTTP';

const patchBookReview = async (author, title, rating, contents, reviewId) => {
  try {
    const response = await HTTP.patch(`${SERVER_URL}/patchBookReview`, {
      author,
      title,
      rating,
      contents,
      reviewId,
    });
    return {
      book: response,
      success: true,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
export default patchBookReview;