import jwt_decode from 'jwt-decode';
import useStore from '../../default/useStore';
import { useNavigate } from 'react-router-dom';
import LoadingImage from '../../default/LoadingImage';

function OauthLoading() {
  const navigate = useNavigate();
  const { setLoginStatus } = useStore();
  const searchParams = new URLSearchParams(window.location.search);
  const googletoken = searchParams.get('access_token');
  const googlerefresh = searchParams.get('refresh_token');

  if (googletoken) {
    localStorage.setItem('access_token', `Bearer ${googletoken}`);
    localStorage.setItem('refresh_token', googlerefresh);
    const token = localStorage.getItem('access_token');
    const decodedToken = jwt_decode(token);
    const memberId = decodedToken.memberId;
    localStorage.setItem('token', token);
    localStorage.setItem('memberId', memberId);
    setLoginStatus(true);
    navigate('/');
  } else if (!googletoken) {
    navigate('/login');
  }

  return (
    <div>
      <LoadingImage />
    </div>
  );
}

export default OauthLoading;
