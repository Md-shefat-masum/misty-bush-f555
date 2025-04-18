import { Link } from "@remix-run/react";
export default function About() {
  return (
    <div>
      <div>
        <Link to="/">home</Link>
        <Link to="/about">about</Link>
        <Link to="/contact">contact</Link>
      </div>
       About me
    </div>
  );
}
