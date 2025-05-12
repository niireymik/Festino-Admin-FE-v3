import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 단일 이미지 업로드
export const imageUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/admin/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.imageUrl;
  } catch (error) {
    alert('Image Upload Error, Please try again! 관리자에게 문의하세요.');
    return '';
  }
};

// 다중 이미지 업로드
export const imagesUpload = async (files: FileList | File[]): Promise<string[]> => {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append('files', file);
  });

  try {
    const response = await api.post('/admin/image/all', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.imageUrlList;
  } catch (error) {
    alert('Images Upload Error, Please try again! 관리자에게 문의하세요.');
    return [];
  }
};

// 에러 알림 및 이동
export const alertError = (errorMessage: string | unknown) => {
  // const navigate = useNavigate();
  alert(`${errorMessage}, 관리자에게 문의하세요.`);

  if (true) {
    const currentPath = window.location.pathname;
    if (currentPath.includes('mobile')) {
      // navigate('/mobile/main');
    } else {
      // navigate('/');
    }
  }
};