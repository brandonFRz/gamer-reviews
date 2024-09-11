import NavLink from "./NavLink";
import { getUserFromSession } from "@/lib/auth/auth";
import SignOutButton from "../sign/SignOutButton";
import AuthButton from "../modal/AuthButton";

// Bar de Navegación
export default async function NavBar() {
  const user = await getUserFromSession();

  return (
    <nav>
      <ul className="flex gap-4">
        <li className="font-orbitron font-bold">
          <NavLink href="/">Gamer Reviews</NavLink>
        </li>
        <li className="ml-auto">
          <NavLink href="/reviews">Reseñas</NavLink>
        </li>
        <li>
          <NavLink href="/about" prefetch={false}>
            Acerca de nosotros
          </NavLink>
        </li>

        {user ? (
          <>
            <p className="text-orange-800">Bienvenido {user.name as string}</p>
            <SignOutButton />
          </>
        ) : (
          <>
            <AuthButton mode="signIn" />
            <AuthButton mode="signUp" />
          </>
        )}
      </ul>
    </nav>
  );
}
