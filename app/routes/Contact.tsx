import { Link } from "@remix-run/react";
export default function Contact() {
  return (
    <div>
      <div>
        <Link to="/">home</Link>&nbsp; &nbsp;
        <Link to="/about">about</Link>&nbsp; &nbsp;
        <Link to="/contact">contact</Link>&nbsp; &nbsp;
      </div>
       Contact page
    </div>
  );
}
