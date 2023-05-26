import { NavLink } from 'react-router-dom';
import { TapMenu, Navbar } from '../../../default/styled';

export function ProfileNav() {
  return (
    <Navbar>
      <div>
        <NavLink to="/profile/mytil">
          <TapMenu>TIL</TapMenu>
        </NavLink>
        <NavLink to="/profile/bookmark">
          <TapMenu>북마크</TapMenu>
        </NavLink>
      </div>
    </Navbar>
  );
}
