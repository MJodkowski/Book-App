import { SERVER_URL } from '../utils/constants';
import HTTP from '../utils/HTTP';

const fetchAuthorList = async (query, currentPage, perPage) => {
  try {
    const response = await HTTP.get(
      `${SERVER_URL}/getAuthorList?query=${query}&currentPage=${currentPage}&perPage=${perPage}`
    );
    return {
      results: response.data,
      resultCount: response.totalCount,
      success: true,
    };
  } catch (err) {
    console.error(err)
    return { success: false, error: err.message };
  }
};
export default fetchAuthorList;