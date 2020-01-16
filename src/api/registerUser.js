import { SERVER_URL } from '../utils/constants';
import HTTP from '../utils/HTTP';

const registerUser = async (name, password, email) => {
  try {
    const response = await HTTP.post(`${SERVER_URL}/registerUser`, {
      name,
      password,
      email,
    });
    const { username } = response;
    return {
      username,
      success: true,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
export default registerUser;
