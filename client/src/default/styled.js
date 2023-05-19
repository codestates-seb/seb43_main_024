import styled, { css, keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import PreArrow from './image/preArrow.svg';
import PreArrowHover from './image/preArrowHover.svg';
import NextArrow from './image/nextArrow.svg';
import NextArrowHover from './image/nextArrowHover.svg';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 64px; // 밀림방지
`;

export const InnerWrapper = styled.div`
  /* 기본 InnerWrapper 스타일 */
  ${(props) =>
    !props.flex &&
    css`
      width: 1240px; /* 기본 컨텐츠영역 크기 */
      height: 100%;
      box-sizing: border-box;
      margin: 0 auto;
      padding: 80px 0;
    `}
  /* 헤더의 경우 InnerWrapper 스타일 */
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

/* 기본적인 버튼 스타일 */
const defaultBtnStyles = css`
  padding: 10px 16px;
  border-radius: 50px;
  transition: all 0.125s ease-in 0s;
`;

/* 버튼1 스타일 (css) */
const FilledBtnsStyle = css`
  /* 기본 버튼 스타일을 불러옵니다. */
  ${defaultBtnStyles}

  /* 여기 부터 추가 스타일 */
  background-color: var(--brand-color);
  color: white;
  &:hover {
    background-color: var(--color-darkgreen);
    color: var(--color-lightgreen);
  }
`;

/* 버튼2 스타일 (css) */
const OutlineBtnsStyle = css`
  /* 기본 버튼 스타일을 불러옵니다. */
  ${defaultBtnStyles}

  /* 여기 부터 추가 스타일 */
  color: var(--brand-color);
  border: 1px solid var(--brand-color);
  background-color: white;
  &:hover {
    background-color: var(--light-background-color);
    color: var(--brand-color);
  }
`;

/* <FilledBtns /> 형태로 사용하기 위한 코드 */
export const FilledBtns = styled.button`
  ${FilledBtnsStyle};
`;

/* <OutlineBtns /> 형태로 사용하기 위한 코드 */
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

/**
 * @MainStyle
 */
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

/**
 * @HeaderStyle
 */
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

export const TilWrapper = styled(InnerWrapper)`
  padding: 0;
  margin-top: 40px;
`;

export const TilFlexContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const PostComponent = styled.div`
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
`;

export const TitleH1 = styled.h1`
  margin: 0px 10px;
`;

export const PreNextButton = styled.button`
  background-size: cover;
  width: 35px;
  height: 35px;
  transition: background-image 0.3s ease;
  /* 이전 버튼 */
  ${(props) =>
    props.pre &&
    css`
      background-image: url(${PreArrow});
      &:hover {
        background-image: url(${PreArrowHover});
      }
    `}
  /* 다음 버튼 */
  ${(props) =>
    props.next &&
    css`
      background-image: url(${NextArrow});
      &:hover {
        background-image: url(${NextArrowHover});
      }
    `}
`;

/**
 * @TilWriteStyle
 */
export const WritrForm = styled.form`
  padding: 60px;
  background-color: white;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  & > textarea {
    border: 0;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 30px;
    width: 100%;
    height: 50px;
    font-size: 24px;
    box-sizing: border-box;
    resize: none;
  }
  & .w-md-editor {
    height: 500px !important;
  }
`;

export const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;

  & button {
    margin-left: 12px;
  }
`;

/**
 * @Modal
 */
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 60px;
  overflow-y: auto;
  text-align: center;
  & h1 {
    padding-top: 32px;
    line-height: 1.3;
  }
  & p {
    font-size: 15px;
    margin-bottom: 40px;
  }
  & b {
    color: var(--brand-color);
  }
`;

/**
 * 경고성 모달에 들어갈 버튼들
 */
export const GrayFilledBtns = styled.button`
  ${FilledBtnsStyle};
  background: #888;
  padding: 9px 32px;
  display: inline-block;
  &:hover {
    background: #999;
    color: white;
  }
`;

export const GrayOutlineBtns = styled.button`
  ${OutlineBtnsStyle};
  color: #888;
  border: 1px solid #888;
  padding: 9px 32px;
  display: inline-block;
  margin-right: 8px;
  &:hover {
    background: #f6f6f6;
    color: #888;
  }
`;
/* ---- */
