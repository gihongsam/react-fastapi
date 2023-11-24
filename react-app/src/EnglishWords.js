import React, { useState } from 'react' // React와 필요한 훅 임포트
import { fetchDictionary } from './api' // Axios 인스턴스를 api.js에서 임포트
import './App.css';

const EnglishWords = () => {
  // 네이버 영어단어 관련
  const [searchWord, setSearchWord] = useState('');
  const [dictionaryResult, setDictionaryResult] = useState('');
  const [dictionaryResults, setDictionaryResults] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);


  // 추가: 검색 함수
  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await fetchDictionary(searchWord);
    setDictionaryResult(response.data);
  };

  const handleFileUpload = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const handleFetchWords = async () => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const words = text.split('\n');
        const results = await Promise.all(
          words.map(word => fetchDictionary(word.trim()))
        );
        setDictionaryResults(results.map(res => res.data));
      };
      reader.readAsText(uploadedFile);
    }
  };

  // 결과를 클립보드에 복사하는 함수
  const handleCopy = () => {
    const textToCopy = dictionaryResults.join('\n');
    navigator.clipboard.writeText(textToCopy);
    alert('Copied to clipboard!');
  };


  return (
    <div>
      <h2>English Words Page</h2>
      {/* 네이버 영어사전 검색 폼 */}
      <div className='container'>
        <form onSubmit={handleSearch}>
          <div className='mb-3'>
            <label htmlFor='word' className='form-label'>
              Search Word
            </label>
            <input type='text' className='form-control' id='word' value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
          </div>
          <button type='submit' className='btn btn-primary'>
            Search
          </button>
        </form>

        {/* 검색 결과 출력 */}
        <p>Search Result: {dictionaryResult}</p>
      </div>
      {/* 파일 업로드 필드 */}
      <div className='container'>
        <input type="file" accept=".txt" onChange={handleFileUpload} />
        <button onClick={handleFetchWords}>영어단어 찾기</button>
      </div>

      {/* 사전 결과 박스 */}
      <div className='container'>
        <div className='result-box'>
          <h3>Dictionary Results</h3>
          <ul>
            {dictionaryResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
          {/* 복사 버튼 */}
          {dictionaryResults.length > 0 && (
            <button onClick={handleCopy} style={{ position: 'absolute', top: 10, right: 10 }}>Copy</button>
          )}
        </div>
      </div>

    </div>
  );
};

export default EnglishWords;
