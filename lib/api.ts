const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export interface SubmitApplicationRequest {
  email: string;
  name?: string;
  resume: File;
}

export interface SubmitApplicationResponse {
  success: boolean;
  data: {
    id: number;
    email: string;
    name: string;
    resumeFileName: string;
    resumeAssetId: string;
    createdAt: string;
  };
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
}

export async function submitBetaApplication(data: SubmitApplicationRequest): Promise<SubmitApplicationResponse> {
  const formData = new FormData();
  formData.append('email', data.email);
  if (data.name) {
    formData.append('name', data.name);
  }
  formData.append('resume', data.resume);

  const response = await fetch(`${API_BASE_URL}/api/queries`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new Error(errorData.message || '신청 처리 중 오류가 발생했습니다');
  }

  return response.json();
}