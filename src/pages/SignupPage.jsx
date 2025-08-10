import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function SignupPage() {
  // 페이지 이동 설정
  const navigate = useNavigate()
  // 현재 페이지의 URL 정보 및 상태를 가져오는 훅
  const location = useLocation()
  // 이전 페이지에서 전달된 state 객체에서 id와 token을 꺼냄
  const { id, token } = location.state || {}
  // supabase 주소
  const SUPABASE_URL = 'https://arhsbrbleaidzmladlur.supabase.co';
  // supabase 공개키 하드 코딩 가능하나, .env 파일에 넣어서 import.meta.env.VITE_SUPABASE_KEY로 불러오는게 안전
  const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaHNicmJsZWFpZHptbGFkbHVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NzAwOTQsImV4cCI6MjA2OTI0NjA5NH0.w-4mMHMLX1LLKp41rFUsQ1znSSwWlRG6yOAH3r8ZggI';

  // 닉네임, 오픈채팅, 에러 메시지 초기화
  const [nickname, setNickname] = useState('')
  const [openchat, setOpenchat] = useState('')
  const [error, setError] = useState('')

  // 닉네임 사용 가능 여부 확인, 닉네임 전달
  const checkNickname = async () => {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/check-nickname?nickname=${encodeURIComponent(nickname)}`,{
      method : 'GET',
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      throw new Error('닉네임 확인 실패');
    }

    const result = await res.json();
    return result; // true면 사용 불가, false면 사용 가능
  };

  // 닉네임 사용 가능 여부를 확인하고 유저 생성
  const handleSubmit = async () => {
  setError('');

  // 간단 검증
  if (!id || !token) {
    setError('세션이 만료되었습니다. 다시 로그인해 주세요.');
    navigate('/');
    return;
  }
  if (!nickname.trim()) {
    setError('닉네임을 입력하세요.');
    return;
  }

  try {
    // 닉네임 중복 체크
    const isAvailable = await checkNickname();
    if (!isAvailable) {
      setError('이미 사용 중인 닉네임입니다.');
      return;
    }

    // Users 테이블에 INSERT (REST API)
    const res = await fetch(`${SUPABASE_URL}/rest/v1/Users`, {
      method: 'POST',
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${token}`,         // 로그인한 사용자 세션 토큰
        'Content-Type': 'application/json',
        Prefer: 'return=representation',          // 추가된 행을 응답으로 돌려받기
      },
      body: JSON.stringify({
        id,                                        // auth.uid()와 동일해야 RLS 통과, 설정 여부 모름
        user_nickname: nickname,
        user_openchat: openchat || null,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`${res.status} ${res.statusText}: ${errText}`);
    }

    const [row] = await res.json();

    // 닉네임 로컬에 저장해서 헤더에 바로 반영
    localStorage.setItem('nickname', row?.user_nickname ?? nickname);

    // 3) 메인으로 이동
    navigate('/');
  } catch (e) {
    console.error(e);
    setError('회원가입에 실패했어요. 잠시 후 다시 시도해 주세요.');
  }
};

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">회원가입</h2>
      <input placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} className="border p-2 w-full mb-2" />
      <input placeholder="오픈채팅 링크" value={openchat} onChange={(e) => setOpenchat(e.target.value)} className="border p-2 w-full mb-2" />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">회원가입 완료</button>
    </div>
  )
}
