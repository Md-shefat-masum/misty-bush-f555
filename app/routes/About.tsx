import { Link } from "@remix-run/react";
export default function About() {
  return (
    <div>
      <div>
        <Link to="/">home</Link>&nbsp; &nbsp;
        <Link to="/about">about</Link>&nbsp; &nbsp;
        <Link to="/contact">contact</Link>&nbsp; &nbsp;
      </div>
       About me
      <div>
        <img src="/logo-dark.png" />
      </div>
    </div>
  );
}
