import axios from 'axios';

// API cố định, không cần dùng process.env
const KIMLONG_API_BASE_URL = 'https://bg2.kimlongdongthap.vn';

// Tạo axios instance riêng cho Kim Long
export const apiClient = axios.create({
  baseURL: KIMLONG_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Nếu sau này API này có token thì thêm interceptor vào đây
// Nhưng hiện tại không cần Authorization nên bỏ interceptor request

// Xử lý lỗi nếu cần (ví dụ log hoặc toast)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('Lỗi gọi Kim Long API:', error.message);
    return Promise.reject(error);
  }
);
