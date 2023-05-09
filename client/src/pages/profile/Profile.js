import { NavLink, Outlet } from 'react-router-dom';
import { UserProfile } from './components/UserProfile';

function Profile() {
  return (
    <div>
      <UserProfile />
      <nav>
        <ul>
          <li>
            <NavLink to="/profile/mytil">My TIL</NavLink>
          </li>
          <li>
            <NavLink to="/profile/bookmark">Bookmark</NavLink>
          </li>
          <li>
            <NavLink to="/profile/followlist">Follow List</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export { Profile };
