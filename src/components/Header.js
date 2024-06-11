import Link from "next/link";

const Header = () => {
  return (
    <header className="m-4 flex justify-between">
      <span>
        <Link href="/" className="text-xl font-bold">
          TabTrack
        </Link>
      </span>
      <nav>
        <ul className="flex gap-4">
          <li className="hover:cursor-pointer">
            <Link href="/tab">Dashboard</Link>
          </li>
          <li className="hover:cursor-pointer">
            <Link href="/sign-in">Sign In</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
