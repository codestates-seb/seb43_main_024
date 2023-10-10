import { OAuthBtn } from '../../../default/styled';
import logoGoogle from '../../../default/image/google-logo.svg';

function GoogleButton() {
  const googleLogin = () => {
    window.location.href =
      'http://ec2-43-202-31-64.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google';
  };
  return (
    <>
      <OAuthBtn google onClick={googleLogin}>
        <img src={logoGoogle} alt="구글로그인" />
      </OAuthBtn>
    </>
  );
}
export default GoogleButton;
