export const handleAxiosError = (error, onLogout, navigate) => {
  if (error.response.data?.statusMessage === 'EXPIRED_RT') {
    alert('시간이 경과하여 재 로그인이 필요합니다.');
    onLogout();
    navigate('/');
  } else if (error.response.data.message === 'NO_LOGIN') {
    alert('로그인 필요1');
    navigate('/');
  } else {
    alert('로그인 필요2');
    navigate('/');
  }
};
