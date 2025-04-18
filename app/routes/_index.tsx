// import { Link } from "@remix-run/react";
// export default function Index() {
//   return (
//     <div>
//       <div>
//         <Link to="/">home</Link>&nbsp; &nbsp;
//         <Link to="/about">about</Link>&nbsp; &nbsp;
//         <Link to="/contact">contact</Link>&nbsp; &nbsp;
//       </div>
//        Home page
//     </div>
//   );
// }

// app/routes/users.tsx
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const res = await fetch(
    "https://api.cloudflare.com/client/v4/accounts/bf686ffe3bbc0a2760a5cb213dd479eb/d1/database/0a5a520a-6fb9-43e3-8815-512aefac385b/query",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Email": "mshefat924@gmail.com",
        "X-Auth-Key": "57b66477d808046b97d3520eff16830e71207",
      },
      body: JSON.stringify({
        sql: "SELECT * FROM users ORDER BY id DESC LIMIT 10;",
        params: [],
      }),
    }
  );

  const result = await res.json();
  return json({ users: result.result });
}

export default function Index() {
  const { users } = useLoaderData<typeof loader>();

  if (!users.length) {
    return (
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">loading..</h1>
      </div>
    )
  }

  const user_array = users[0].results;

  return (
    <div className="max-w-xl mx-auto p-4">
      <div>
        <Link to="/">home</Link>&nbsp; &nbsp;
        <Link to="/about">about</Link>&nbsp; &nbsp;
        <Link to="/contact">contact</Link>&nbsp; &nbsp;
      </div>
      <h1 className="text-2xl font-bold mb-4">Latest Users</h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tbody>
          {user_array.map((user: { id: string; name: string; email: string }) => (
            <tr key={user.id} className="border p-3 rounded shadow">
              <td className="font-semibold">{user.name}</td>
              <td className="text-sm text-gray-600">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <Link to="/contact" className="text-blue-600 underline">
          ← Create User
        </Link>
      </div>
    </div>
  );
}
