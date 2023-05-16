import styled, { css, keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 64px; // 밀림방지
`;

export const InnerWrapper = styled.div`
  /* 기본 스타일 */
  ${(props) =>
    !props.flex &&
    css`
      width: 1240px; /* 기본 컨텐츠영역 크기 */
      height: 100%;
      box-sizing: border-box;
      margin: 0 auto;
    `}
  /* 헤더의 경우 */
  ${(props) =>
    props.flex &&
    css`
      width: 1240px;
      height: 100%;
      box-sizing: border-box;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}
`;

const defaultBtnStyles = css`
  padding: 10px 16px;
  border-radius: 50px;
  transition: all 0.125s ease-in 0s;
`;

const FilledBtnsStyle = css`
  ${defaultBtnStyles};
  background-color: var(--brand-color);
  color: white;
  &:hover {
    background-color: var(--color-darkgreen);
    color: var(--color-lightgreen);
  }
`;

const OutlineBtnsStyle = css`
  ${defaultBtnStyles};
  color: var(--brand-color);
  border: 1px solid var(--brand-color);
  background-color: white;
  &:hover {
    background-color: var(--light-background-color);
    color: var(--brand-color);
  }
`;

export const FilledBtns = styled.button`
  ${FilledBtnsStyle};
`;

export const OutlineBtns = styled.button`
  ${OutlineBtnsStyle};
`;

export const Tags = styled.span`
  font-size: 12px;
  display: inline-block;
  background: var(--light-background-color);
  border: 1px solid #e0e4d7;
  color: var(--brand-color);
  padding: 6px 12px;
  border-radius: 50px;
  margin-right: 8px;
`;

export const TextInput = styled.textarea`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 4px;
  display: block;
`;

export const TapMenu = styled.button`
  padding: 10px 10px 20px 10px;
  margin-right: 20px;
  /* font-family: 'NanumGothic'; */
  font-style: normal;
  font-weight: 700;
  color: #cccccc;
  font-size: 18px;
  border: none;
  box-sizing: border-box;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #222;
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
  }
  &:active,
  &:focus {
    color: #222222;
  }
  &:active::after,
  &:focus::after {
    color: #222222;
    transform: scaleX(1);
  }
`;

export const FollowListComponent = styled.li``;

/* Main style */
export const MainWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  box-sizing: border-box;
  background: #edf8f1;
`;

const FloatingAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const FlexContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h1 {
    font-size: 64px;
    font-weight: 800;
    line-height: 1.3;
  }
  & h1 span {
    color: var(--brand-color);
  }
  & p {
    font-size: 18px;
    font-weight: bold;
  }
  & a {
    font-size: 18px;
    display: inline-block;
    margin-top: 40px;
  }
  & img {
    width: 460px;
    height: 460px;
    animation: ${FloatingAnimation} 2s ease-in-out infinite;
  }
`;

export const PostLink = styled(NavLink)`
  ${FilledBtnsStyle}
`;

/* Header style */
export const HeaderWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  box-sizing: border-box;
  background: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

export const TextLogo = styled.div`
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 30px;
  line-height: 106.5%;
  letter-spacing: -0.03em;
  color: #222;
  transition: all 0.125s ease-in 0s;

  &:hover {
    color: var(--brand-color);
  }
`;

export const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

export const HeaderLink = styled(NavLink)`
  ${FilledBtnsStyle}; /* 참조할 스타일을 불러옵니다. */

  ${(props) =>
    props.outline &&
    css`
      ${OutlineBtnsStyle};
    `}
  ${(props) =>
    props.userInfo &&
    css`
      display: flex;
      align-items: center;
      background: #f8f8f8;
      border: 1px solid #dedede;
      color: #555;
      padding: 6px;
      gap: 6px;
      &:hover {
        background: #f8f8f8;
        border: 1px solid #dedede;
        color: #555;
      }
    `}
    ${(props) =>
    props.light &&
    css`
      ${defaultBtnStyles};
      background: #e1fbec;
      color: #222;
      font-weight: bold;
      &:hover {
        background: var(--brand-color);
        color: white;
      }
    `}
`;

export const UserPic = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 100px;
  background: black;
`;

export const TopNav = styled.div`
  position: relative;
  top: 6px;
`;

export const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
`;
