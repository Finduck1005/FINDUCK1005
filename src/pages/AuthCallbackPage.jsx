// 로그인 이후 리다이렉션 처리 페이지
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function AuthCallback() {
  // React Router의 useNavigate() 훅을 사용
  const navigate = useNavigate()

  useEffect(() => {
    // 기본값. 아무것도 안하는 함수 onAuthStateChange구독 때문에
    let unsub = () => {}

    const run = async () => {
      try {
        // 세션 확인 (바로 안 잡히는 경우가 있어 이벤트도 구독)
        let { data: sessionData } = await supabase.auth.getSession()
        let session = sessionData?.session

        // 세션이 아직 안 잡힌 경우: onAuthStateChange로 한 번 더 대기
        if (!session) {
          const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
            if (s) {
              handleAfterLogin(s)
            }
          })
          // cleanup용
          unsub = sub.subscription.unsubscribe
          return
        }

        await handleAfterLogin(session)
      } catch (e) {
        console.error('Auth callback error:', e)
        navigate('/', { replace: true })
      }
    }

    const handleAfterLogin = async (session) => {
      const user = session.user
      if (!user) {
        navigate('/', { replace: true })
        return
      }

      // Users 테이블에서 존재 여부 확인 (단일 행 조회)
      const { data, error } = await supabase
        .from('Users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      if (error) {
        console.error('Users select error:', error)
        // RLS로 인해 null이 떨어질 수도 있으니 일단 홈으로
        navigate('/', { replace: true })
        return
      }

      // 이전 경로 복귀 (LoginGate 등에서 저장해둔 값)
      const redirect = localStorage.getItem('postLoginRedirect') || '/'

      if (!data) {
        // 유저 정보 없음 → 회원가입 페이지로 이동
        navigate('/signup', {
          state: { id: user.id, token: session.access_token, redirect },
          replace: true,
        })
      } else {
        navigate(redirect, { replace: true })
      }

      // cleanup
      try { localStorage.removeItem('postLoginRedirect') } catch {}
    }

    run()
    return () => unsub()
  }, [navigate])

  return <p>로그인 처리 중...</p>
}
