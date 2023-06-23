import { OAuthBtn } from '../../../default/styled';
import logoGithub from '../../../default/image/github-mark.svg';

function GithubButton() {
  const githubLogin = () => {
    window.location.href =
      'http://ec2-43-202-31-64.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/github';
  };
  return (
    <>
      <OAuthBtn google onClick={githubLogin}>
        <img src={logoGithub} alt="구글로그인" />
      </OAuthBtn>
    </>
  );
}
export default GithubButton;
