import styled, { css, keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
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
      position: relative;
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
  @media (max-width: 1300px) {
    width: 1250px;
    padding: 0 30px;
  }
  @media (max-width: 1200px) {
    width: 1100px;
  }
  @media (max-width: 1100px) {
    width: 900px;
  }
  @media (max-width: 900px) {
    width: 800px;
  }
  @media (max-width: 800px) {
    width: 600px;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
  ${(props) =>
    props.mypage &&
    css`
      @media (max-width: 1100px) {
        margin: 0;
        padding: 0;
      }
      @media (max-width: 800px) {
        width: 100%;
      }
    `}
`;

/* 기본적인 버튼 스타일 */
const defaultBtnStyles = css`
  padding: 10px 16px;
  border-radius: 50px;
  transition: all 0.125s ease-in 0s;
  @media (max-width: 900px) {
    font-size: 11px;
    padding: 9px 15px;
  }
  @media (max-width: 500px) {
    font-size: 11px;
    padding: 8px 13px;
  }
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

/* 취소버튼 */
export const GetBackBtn = styled(NavLink)`
  ${OutlineBtnsStyle};
  border: 1px solid #ccc;
  color: #555;
  background-color: #e8e8e8;
  display: inline-block;
  margin-right: 8px;
  &:hover {
    background: #f6f6f6;
    color: #888;
  }
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

export const NavStyle = styled(NavLink)`
  padding: 10px 12px 25px 10px;
  margin-right: 20px;
  font-weight: 800;
  color: var(--color-lightgray);
  font-size: 18px;
  :hover {
    color: var(--color-black);
  }
  &.active {
    border-bottom: 3px solid rgb(34, 34, 34);
    padding: 10px 12px 19px;
    color: var(--color-black);
    transform: scaleX(1);
    transition: transform 0.2s ease-in-out;
  }
  @media (max-width: 800px) {
    padding: 0px 0px 10px;
    font-weight: 600;
    font-size: 13px;
    &.active {
      border-bottom: 2px solid rgb(34, 34, 34);
      padding: 10px 10px 15px;
    }
  }
`;

export const NavStyleMobile = styled(NavLink)`
  color: var(--color-black);
  padding: 10px 0px 10px;
  font-weight: 600;
  font-size: 12px;
  :hover {
    color: var(--brand-color);
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
  @media (max-width: 1200px) {
    justify-content: space-around;
    & h1 {
      font-size: 52px;
      margin-bottom: 15px;
    }
    & p {
      font-size: 15px;
    }
    & a {
      font-size: 15px;
      margin-top: 32px;
    }
    & img {
      width: 400px;
      height: 400px;
    }
  }
  @media (max-width: 1100px) {
    & h1 {
      font-size: 41px;
      margin-bottom: 15px;
    }
    & p {
      font-size: 12px;
    }
    & a {
      font-size: 12px;
      margin-top: 30px;
    }
    & img {
      width: 350px;
      height: 350px;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: space-evenly;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    & h1 {
      text-align: center;
    }
    & a {
      margin-top: 27px;
    }
  }
  @media (max-width: 500px) {
    & h1 {
      font-size: 32px;
    }
    & p {
      font-size: 11px;
      width: 360px;
      text-align: center;
    }
    & img {
      width: 300px;
      height: 300px;
    }
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
  z-index: 3;
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
  @media (max-width: 700px) {
    font-size: 25px;
  }
`;

export const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  @media (max-width: 800px) {
    gap: 9px;
  }
`;

export const HeaderLink = styled(NavLink)`
  ${FilledBtnsStyle}; /* 참조할 스타일을 불러옵니다. */

  ${(props) =>
    props.outline &&
    css`
      ${OutlineBtnsStyle};
    `}
  ${(props) =>
    props.userinfo &&
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
    @media (max-width: 700px) {
    font-size: 11px;
    padding: 9px 15px;
    ${(props) =>
      props.userinfo &&
      css`
        padding: 6px;
      `}
  }
`;

export const UserPic = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 100%;
  background: black;
  @media (max-width: 700px) {
    width: 17px;
    height: 17px;
  }
`;

export const TopNav = styled.div`
  position: relative;
  top: 2px;
`;

export const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  @media (max-width: 700px) {
    gap: 30px;
  }
`;

export const DropdownWrapper = styled.div`
  position: fixed;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 64px;
  padding: 10px 50px;
  width: 100%;
  height: 220px;
  background-color: var(--color-white);
  border-top: 1px solid var(--color-title-linegray);
  border-radius: 0px 0px 10px 10px;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  z-index: 2;
`;

export const DropdownBorder = styled.div`
  width: 100%;
  padding: 10px 0px 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--color-title-linegray);
`;

/**
 * @TilListStyle
 */
export const TilWrapper = styled(InnerWrapper)`
  padding: 0;
  margin-top: 40px;

  & > h1 {
    margin-top: 80px;
    text-align: center;
  }
  @media (max-width: 1300px) {
    width: 825px;
  }
  @media (max-width: 900px) {
    width: 550px;
  }
  @media (max-width: 600px) {
    width: 330px;
    & > h1 {
      margin-top: 50px;
  }
  ${(props) =>
    props.hotlist &&
    css`
      @media (max-width: 600px) {
        width: 280px;
      }
    `}
`;

export const TilFlexContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const TilListWrapper = styled(TilFlexContainer)`
  justify-content: center;
  margin: 30px 0px;
`;

export const TilCardWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media (max-width: 1300px) {
    width: 825px;
  }
  @media (max-width: 900px) {
    width: 550px;
  }
  @media (max-width: 600px) {
    width: 270px;
  }
  ${(props) =>
    props.mypage &&
    css`
      @media (max-width: 1200px) {
        width: 560px;
        gap: 7px;
      }
      @media (max-width: 600px) {
        width: 270px;
      }
    `}
`;

export const PostComponent = styled.div`
  min-height: 300px;
  padding: 60px;
  border-radius: 8px;
  background-color: var(--color-white);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  @media (max-width: 900px) {
    padding: 50px;
  }
  @media (max-width: 500px) {
    padding: 35px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
`;

export const TitleH1 = styled.h1`
  margin: 0px 10px;
  @media (max-width: 900px) {
    font-size: 21px;
  }
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

export const PreNextButton = styled.button`
  background-size: cover;
  width: 35px;
  height: 35px;
  transition: background-image 0.3s ease;
  @media (max-width: 1200px) {
    width: 30px;
    height: 30px;
  }
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

export const MemberImg = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 4px;
  ${(props) =>
    props.post &&
    css`
      width: 25px;
      height: 25px;
      margin-right: 8px;
      @media (max-width: 900px) {
        width: 17px;
        height: 17px;
        margin-right: 5px;
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
  @media (max-width: 1300px) {
    margin-top: 64px;
  }
  @media (max-width: 900px) {
    padding: 50px;
    & > textarea {
      height: 40px;
      margin-bottom: 25px;
      font-size: 21px;
    }
  }
  @media (max-width: 500px) {
    padding: 35px;
  }
`;

export const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;

  & button {
    margin-left: 12px;
    @media (max-width: 500px) {
      margin-left: 8px;
    }
  }
  @media (max-width: 1300px) {
    margin-bottom: 60px;
  }
  @media (max-width: 900px) {
    font-size: 11px;
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    & div {
      margin-bottom: 10px;
    }
  }
`;

export const EditorMDEditor = styled(MDEditor)`
  .w-md-editor-preview {
    @media (max-width: 500px) {
      display: none;
    }
  }
  .w-md-editor-input {
    width: 100%;
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
  @media (max-width: 900px) {
    padding: 50px;
    & h1 {
      font-size: 18px;
      padding-top: 22px;
      line-height: 1.3;
    }
    & p {
      font-size: 13px;
      margin-bottom: 30px;
    }
  }
  @media (max-width: 600px) {
    padding: 35px;
    & h1 {
      font-size: 15px;
      padding-top: 15px;
      line-height: 1;
    }
    & p {
      font-size: 11px;
      margin-bottom: 20px;
      width: 190px;
      line-height: 1.3;
    }
  }
`;

export const ModalIcon = styled.img`
  @media (max-width: 900px) {
    width: 52px;
    height: 52px;
  }
  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
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
  @media (max-width: 900px) {
    padding: 8px 25px;
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
  @media (max-width: 900px) {
    padding: 9px 25px;
  }
`;

export const GreenOutlineBtns = styled.button`
  ${FilledBtnsStyle};
  background: var(--brand-color);
  color: var(--color-white);
  padding: 12px 32px;
  display: inline-block;
  margin-right: 8px;
  &:hover {
    background: var(--color-darkgreen);
    color: var(--color-white);
  }
`;
/* ---- */

/**
 * @loginStyle
 */
export const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 64px);
  box-sizing: border-box;
  background: #edf8f1;
  ${(props) =>
    props.bgGray &&
    css`
      background-color: #f8f8f8;
    `}
  ${(props) =>
    props.edit &&
    css`
      @media (max-width: 700px) {
        background-color: var(--color-white);
        height: 100vh;
        align-items: flex-start;
      }
    `}
`;

export const LoginWrap = styled.div`
  background: white;
  min-width: 420px;
  min-height: 357px;
  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
  padding: 40px;
  ${(props) =>
    props.autoHeight &&
    css`
      min-height: auto;
    `}
  ${(props) =>
    props.mypage &&
    css`
      min-height: auto;
      min-width: 660px;
      @media (max-width: 700px) {
        min-width: 100%;
        box-shadow: none;
      }
    `}
    @media (max-width: 500px) {
    min-width: 320px;
    padding: 30px;
  }
`;

export const JoinBox = styled.div`
  & p {
    display: inline-block;
  }
  & a {
    color: var(--brand-color);
    margin-left: 4px;
  }
  & a:hover {
    color: var(--brand-color);
    font-weight: bold;
  }
  & > span {
    display: block;
    text-align: center;
    margin-bottom: 24px;
    position: relative;
    color: #888;
  }
  & > span::after {
    content: '';
    position: absolute;
    top: 6px;
    right: 0;
    width: 90px;
    height: 1px;
    background-color: #ccc;
  }
  & > span::before {
    content: '';
    position: absolute;
    top: 6px;
    left: 0;
    width: 90px;
    height: 1px;
    background-color: #ccc;
  }
  @media (max-width: 500px) {
    & h1 {
      font-size: 21px;
    }
    & p,
    a {
      font-size: 11px;
    }
    & > span {
      font-size: 11px;
      margin-bottom: 20px;
    }
  }
`;

export const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: stretch;
  padding: 32px 0;

  input,
  textarea {
    width: 100%;
    padding-top: 20px;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;
    margin-bottom: 18px;
  }
  input:focus,
  textarea:focus {
    outline: none;
    border-bottom: 2px solid var(--brand-color);
  }

  .right {
    display: flex;
    flex-direction: row-reverse;
    text-align: right;
    flex-direction: column;
    align-items: flex-end;
  }
  @media (max-width: 900px) {
    padding: 25px 0;
    & h1 {
      font-size: 21px;
      margin-bottom: 12px;
    }
    input,
    textarea {
      width: 100%;
      padding-top: 17px;
      padding-bottom: 5px;
      margin-bottom: 15px;
    }
  }
  @media (max-width: 500px) {
    padding: 17px 0;
    input,
    textarea {
      font-size: 11px;
    }
  }
`;

export const OauthBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const OAuthBtn = styled.a`
  color: white !important;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #f5f5f5;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.05);

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${(props) => props.google && css``}
  ${(props) =>
    props.github &&
    css`
      background: #fff;
    `}
    @media (max-width: 500px) {
    width: 35px;
    height: 35px;
  }
`;

export const AuthInput = styled.div`
  position: relative;
  & p {
    position: absolute;
    bottom: 2px;
    font-size: 12px;
  }
  .ok {
    color: var(--brand-color);
  }
  .no {
    color: #d83f36;
  }
  @media (max-width: 500px) {
    & p {
      font-size: 11px;
    }
  }
`;

export const SendBtn = styled.button`
  position: absolute;
  right: 0;
  top: 19px;
  color: var(--brand-color);
  font-weight: bold;
  @media (max-width: 900px) {
    top: 16px;
  }
  @media (max-width: 500px) {
    font-size: 11px;
  }
`;

/**
 * @MyPage
 */

export const Navbar = styled.nav`
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  width: 1005px;
  position: absolute;
  left: 255px;
  padding-left: 60px;

  div {
    display: flex;
    align-items: center;
  }
  @media (max-width: 1300px) {
    width: 500px;
    top: 80px;
    left: 310px;
  }
  @media (max-width: 1200px) {
    left: 330px;
  }
  @media (max-width: 1100px) {
    left: 235px;
  }
  @media (max-width: 900px) {
    left: 230px;
  }
  @media (max-width: 800px) {
    position: static;
    margin-top: 60px;
    width: 600px;
    padding-left: 30px;
  }
  @media (max-width: 600px) {
    width: 340px;
    padding-left: 10px;
  }
`;

export const UserProfileWrapper = styled.div`
  position: fixed;
  z-index: 1;
  top: 64px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 255px;
  height: 100%;
  padding: 60px 30px 60px 0;
  box-sizing: border-box;

  background: white;
  background: #ffffff;
  border-right: 1px solid #ededed;

  &::after {
    content: '';
    width: 100vw;
    height: 100%;
    background: #ffffff;
    position: absolute;
    z-index: 0;
    top: 0px;
    right: 254px;
  }

  & .flexCenter,
  & .media {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .user-photo {
    width: 150px;
    border-radius: 100%;
  }

  h2 {
 margin: 25px 0px 15px;
  }
& .til-tier{
  margin-bottom: 35px;
}
  p {
    border-top: 1px solid #e3e3e3;
    padding-top: 40px;
    text-align: justify;
    line-height: 19px;
  }

  button {
    color: #888;
    padding-bottom: 60px;

    & > img {
      margin-right: 4px;
    }
  }
  @media (max-width: 1100px) {
    width: 250px;
    padding: 60px 40px;
    &::after {
      display: none;
    }
    & .user-photo {
      width: 130px;
    }
    h2 {
      margin: 20px 0px 15px;
      font-size: 15px;
    }
    & .til-tier{
      margin-bottom: 20px;
    }
    p {
      padding-top: 25px;
      font-size: 12px;
      line-height: 17px;
    }
    button {
      font-size: 12px;
      & > img {
        width: 11px;
        height: 11px;
      }
      }
    }
  }
  @media (max-width: 800px) {
    position: static;
    width: 100vw;
    height: 250px;
    padding: 40px 70px;
    box-sizing: border-box;
    border-right: none;
    display: flex;
    align-items: baseline;

    &::after {
      display: none;
    }
    & .flexCenter {
      flex-direction: row;
    }
    & .media {
      border-right: 1px solid #e3e3e3;
      padding-right: 35px;
    }
    h2 {
      margin: 15px 0px 12px;
      font-size: 13px;
    }
    & .til-tier{
      margin-bottom: 20px;
    }
    & .user-photo {
      width: 100px;
    }
    p {
      margin-left: 35px;
      border-top: none;
    }
    button {
      padding: 0px 0px 0px 15px;
    }
  }
    @media (max-width: 600px) {
        width: 100%;
        padding: 40px 30px;
    }
`;

export const PageWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 1005px;
  min-height: 500px;
  top: 155px;
  left: 255px;
  box-sizing: border-box;
  @media (max-width: 1200px) {
    width: 800px;
  }
  @media (max-width: 1100px) {
    left: 160px;
  }
  @media (max-width: 800px) {
    position: static;
    width: 600px;
  }
  @media (max-width: 600px) {
    position: static;
    width: 340px;
  }
`;

export const ContentsPosition = styled.div`
  width: 1005px;
  padding: 0px 0 0 60px;
  box-sizing: border-box;
  @media (max-width: 1000px) {
    padding: 0;
    width: 1000px;
  }
  @media (max-width: 800px) {
    padding: 0;
    width: 600px;
  }
`;

export const ProfileContents = styled.div`
  box-sizing: border-box;
`;

export const ImgBox = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 1100px) {
    width: 130px;
    height: 130px;
  }
  @media (max-width: 800px) {
    width: 100px;
    height: 100px;
  }
`;

export const NoPosts = styled.div`
  text-align: center;
  width: 100%;
  & img {
    width: 50%;
    height: 50%;
  }
  & h1 {
    margin: 24px 0 32px 0;
  }
  @media (max-width: 1100px) {
    & img {
      width: 45%;
      height: 45%;
    }
    & h1 {
      margin: 20px 0 32px 0;
      font-size: 21px;
    }
  }
  @media (max-width: 900px) {
    & img {
      margin-top: 15px;
      width: 40%;
      height: 40%;
    }
    & h1 {
      margin: 18px 0 30px 0;
      font-size: 18px;
    }
  }
  @media (max-width: 600px) {
    & img {
      width: 50%;
      height: 50%;
    }
    & h1 {
      margin: 20px 0 27px 0;
      font-size: 13px;
    }
  }
`;

export const MyPageMedia = styled.div`
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

/* Link 전용 */
export const LinkFilledBtns = styled(NavLink)`
  ${FilledBtnsStyle};
`;

/**
 * @EditProfile
 */

export const EditProfileBox = styled.div`
  margin-top: 20px;
  span {
    font-size: 11px;
    color: #222;
    position: relative;
    top: 6px;
    z-index: 1;
  }
  & .grayTxt {
    font-size: 11px;
    color: #888;
    margin-top: 32px;
    float: right;
  }
  & .right {
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: row;
    gap: 12px;
  }
  @media (max-width: 900px) {
    & .grayTxt {
      margin-top: 27px;
    }
    & .right {
      gap: 7px;
    }
  }
`;

export const FooterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  background: var(--color-white);
  box-sizing: border-box;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;
