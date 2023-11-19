import axios from 'axios'

// Axios 인스턴스 생성: HTTP 요청을 처리하기 위한 기본 설정을 포함
const api = axios.create({
    baseURL: 'http://localhost:8000', // 기본 URL 설정: FastAPI 백엔드 서버 주소
});

export default api; // 생성된 인스턴스 내보내기
