import { SERVER_URL } from '../utils/constants';
import HTTP from '../utils/HTTP';

const fetchBookList = async (field, query, currentPage, perPage) => {
  try {
    const [ response ] = await HTTP.get(
      `${SERVER_URL}/getBookList?field=${field}&query=${query}&currentPage=${currentPage}&perPage=${perPage}`
    );
    return {
      results: response.data,
      resultCount: response.totalCount[0].count,
      success: true,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
export default fetchBookList;
