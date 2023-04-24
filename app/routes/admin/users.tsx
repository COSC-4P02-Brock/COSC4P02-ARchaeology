import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { UserService } from "../../services.server";
import { PageHeading, Warning } from "~/components";

export const loader = async ({ context, request }: LoaderArgs) => {
  const adminContext = {
    SUPABASE_KEY: context.SERVICE_ROLE_KEY as string,
    SUPABASE_URL: context.SUPABASE_URL as string,
  };

  const service = new UserService(adminContext);
  const { users } = await service.getUsers();
  return json(users);
}

export default function Users() {
  const users = useLoaderData<typeof loader>();

  return (
    <>
      <div className="sm:flex sm:items-center border-b border-slate-200 pb-4 mb-4">
        <div className="sm:flex-auto">
          <PageHeading title="Users" />
        </div>
      </div>
      <Warning>
        These users have access to the admin panel and can create, update, and delete artifacts as well as upload
        images and 3D images to artifacts. Please <a href="https://supabase.io" className="underline" target="_blank">log in</a> to Supabase to add or remove
        users.
      </Warning>
      <div className="mt-8 flow-root">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-slate-300">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                  Email
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                  Phone
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                  Confirmed
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                  Last Sign In At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{user.email}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{user.phone}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{user.confirmed ? "Yes" : "No"}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{user.lastSignInAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}