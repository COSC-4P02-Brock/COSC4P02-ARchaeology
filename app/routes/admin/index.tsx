import { BuildingLibraryIcon, UserGroupIcon } from "@heroicons/react/24/outline";

import { Button, Warning } from "../../components";

export default function Admin() {
  return (
    <>
      <div className="text-center pt-12 w-8/12 mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome to ARchaeology
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-500">
          Use the admin panel to manage your virtual artifacts, including your
          3D images for augmented reality exhibits.
        </p>
      </div>
      <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-2">
        <li className="block group text-slate-400 text-center px-6">
          <div className="w-40 h-40 mx-auto inline-flex items-center justify-center p-8 bg-slate-100 rounded-full">
            <BuildingLibraryIcon className="h-full w-full" />
          </div>
          <h3 className="mt-2 font-bold text-slate-800 uppercase text-lg">Artifacts</h3>
          <p className="text-light text-slate-500 mb-6">
            Manage your virtual collection of artifacts
          </p>
          <Button primary href="/admin/artifacts">
            Manage artifacts
          </Button>
        </li>
        <li className="block group text-slate-400 text-center px-6">
          <div className="w-40 h-40 mx-auto inline-flex items-center justify-center p-8 bg-slate-100 rounded-full">
            <UserGroupIcon className="h-full w-full" />
          </div>
          <h3 className="mt-2 font-bold text-slate-800 uppercase text-lg">Users</h3>
          <p className="text-light text-slate-500 mb-6">
            Manage users with access to this admin panel
          </p>
          <Button primary href="/admin/users">
            Manage users
          </Button>
        </li>
      </ul>
    </>
  )
}
