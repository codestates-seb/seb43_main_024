import { Navbar, NavStyle } from '../../../default/styled';

export function ProfileNav() {
  return (
    <Navbar>
      <div>
        <NavStyle to="/profile/mytil">TIL</NavStyle>
        <NavStyle to="/profile/bookmark">북마크</NavStyle>
      </div>
    </Navbar>
  );
}
