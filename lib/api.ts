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

  const response = await fetch(`${API_BASE_URL}/api/public/queries`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    // 상태 코드별 특별 처리
    if (response.status === 413) {
      throw new Error('FILE_TOO_LARGE');
    }

    // JSON 파싱 시도 (실패할 수 있음)
    try {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || '신청 처리 중 오류가 발생했습니다');
    } catch (jsonError) {
      // JSON 파싱 실패 시 상태 코드 기반 메시지
      const statusMessages: Record<number, string> = {
        400: 'BAD_REQUEST',
        401: 'UNAUTHORIZED',
        403: 'FORBIDDEN',
        404: 'NOT_FOUND',
        413: 'FILE_TOO_LARGE',
        429: 'TOO_MANY_REQUESTS',
        500: 'SERVER_ERROR',
        502: 'BAD_GATEWAY',
        503: 'SERVICE_UNAVAILABLE'
      };

      throw new Error(statusMessages[response.status] || `HTTP_ERROR_${response.status}`);
    }
  }

  return response.json();
}