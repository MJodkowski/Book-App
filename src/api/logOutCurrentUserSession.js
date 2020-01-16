import { SERVER_URL } from '../utils/constants';
import HTTP from '../utils/HTTP';

const logOutCurrentUserSession = async () => {
  try {
    await HTTP.post(`${SERVER_URL}/logOutCurrentUserSession`);
    return {
      success: true,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
export default logOutCurrentUserSession;