import { HiBars3, HiUserCircle } from "react-icons/hi2";
import { Logo } from "~/components/Logo";

interface NavbarProps {
  onClickMenu: () => void;
}

export function Navbar({ onClickMenu }: NavbarProps) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none lg:hidden">
        <button className="btn-ghost btn-square btn" onClick={onClickMenu}>
          <HiBars3 size={24} />
        </button>
      </div>
      <div className="flex-1">
        <div className="lg:hidden">
          <Logo />
        </div>
      </div>
      <div className="flex-none">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <HiUserCircle size={24} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <form action="/logout" method="post">
                <button type="submit">Cerrar sesión</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
