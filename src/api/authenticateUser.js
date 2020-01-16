import { SERVER_URL } from '../utils/constants';
import HTTP from '../utils/HTTP';

const authenticateUser = async () => {
  try {
    const response = await HTTP.post(`${SERVER_URL}/authenticateUser`);
    return {
      user: response.user,
      success: true,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
export default authenticateUser;