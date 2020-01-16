import { SERVER_URL } from '../utils/constants';
import HTTP from '../utils/HTTP';

const fetchBookList = async (field, query) => {
  try {
    const response = await HTTP.get(
      `${SERVER_URL}/getBookList?field=${field}&query=${query}`
    );
    return {
      results: response,
      success: true,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
export default fetchBookList;
