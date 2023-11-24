import axios from 'axios';

// 환경변수에서 API 기본 URL 가져오기, env파일이 없을 경우 localhost:8000 사용
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Axios 인스턴스 생성: HTTP 요청을 처리하기 위한 기본 설정을 포함
const api = axios.create({
    baseURL: baseURL, // 기본 URL을 환경변수에서 설정
});

// 네이버 영어사전 검색 함수 추가
export const fetchDictionary = async (word) => {
    return await api.get(`/naverdic/${word}`);
};

export default api; // 생성된 인스턴스 내보내기
