
import NavLink from "./NavLink";
import { getUserFromSession } from "@/lib/auth/auth";
import SignOutButton from "../sign/SignOutButton";
import AuthButton from "../modal/AuthButton";

// Bar de Navegación
export default async function NavBar() {
  const user = await getUserFromSession();

  return (
    <nav >
<div className="max-w-screen-lg mx-auto flex items-center">
        {/* Logo */}
        <NavLink href="/">
          Gamer Reviews
        </NavLink>

        {/* Menú alineado a la derecha */}
        <ul className="flex gap-3 sm:gap-6 text-sm sm:text-base ml-auto">
          <li>
            <NavLink href="/reviews">Reseñas</NavLink>
          </li>
          <li className="hidden sm:block">
            <NavLink href="/about" prefetch={false}>
              Acerca de nosotros
            </NavLink>
          </li>

          {user ? (
            <li className="flex gap-3 sm:gap-4 items-center text-orange-500">
              <p>Bienvenido {user.name as string}</p>
              <SignOutButton />
            </li>
          ) : (
            <li className="flex gap-3 sm:gap-4">
              <AuthButton mode="signIn" />
              <AuthButton mode="signUp" />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
