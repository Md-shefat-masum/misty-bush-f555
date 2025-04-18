// app/routes/submit-user.tsx
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");

    const cloudflareRes = await fetch(
        "https://api.cloudflare.com/client/v4/accounts/bf686ffe3bbc0a2760a5cb213dd479eb/d1/database/0a5a520a-6fb9-43e3-8815-512aefac385b/raw",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Email": "mshefat924@gmail.com",
                "X-Auth-Key": "57b66477d808046b97d3520eff16830e71207", // 🔐 Keep in .env ideally
            },
            body: JSON.stringify({
                sql: "INSERT INTO users (name, email) VALUES (?, ?);",
                params: [name, email],
            }),
        }
    );

    const result = await cloudflareRes.json();

    return json({
        success: result.success,
        message: result.success ? "User created!" : "Failed to create user",
    });
}

export default function Contact() {
    const actionData = useActionData<typeof action>();

    return (
        <div className="p-4 max-w-md mx-auto">
          <div>
            <Link to="/">home</Link>&nbsp; &nbsp;
            <Link to="/about">about</Link>&nbsp; &nbsp;
            <Link to="/contact">contact</Link>&nbsp; &nbsp;
          </div>
          
            <h1 className="text-xl font-bold mb-2">Create User</h1>

            <Form method="post" className="space-y-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border p-2 w-full"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </Form>

            {actionData && (
                <p
                    className={`mt-4 font-semibold ${actionData.success ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {actionData.message}
                </p>
            )}

            <div>
                <Link to="/" className="text-blue-600 underline">
                    All users
                </Link>
            </div>
        </div>
    );
}

