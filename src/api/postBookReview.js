import { SERVER_URL } from '../utils/constants';
import HTTP from '../utils/HTTP';

const postBookReview = async (author, title, rating, contents) => {
  try {
    const response = await HTTP.post(`${SERVER_URL}/postaBookReview`, {
      author,
      title,
      rating,
      contents,
    });
    return {
      book: response,
      success: true,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
export default postBookReview;