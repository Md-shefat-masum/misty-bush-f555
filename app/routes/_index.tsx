import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function Contact() {
    const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
  	const [error, setError] = useState(null);
	
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("https://bold-bar-377d.mshefat924.workers.dev/");
                if (!res.ok) throw new Error("Failed to fetch users");
                const data = await res.json();
                setUsers(data.users || []);
            } catch (err) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    return (
        <div>
            <div>
                <Link to="/">home</Link>&nbsp; &nbsp;
                <Link to="/about">about</Link>&nbsp; &nbsp;
                <Link to="/contact">contact</Link>&nbsp; &nbsp;
            </div>
            Home page
        </div>
    );
}
