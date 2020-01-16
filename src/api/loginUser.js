import { SERVER_URL } from '../utils/constants';
import HTTP from '../utils/HTTP';

const loginUser = async (name, password) => {
  try {
    const response = await HTTP.post(`${SERVER_URL}/loginUser`, {
      name,
      password,
    });
    const { username } = response;
    return {
      success: true,
      username,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
export default loginUser;
