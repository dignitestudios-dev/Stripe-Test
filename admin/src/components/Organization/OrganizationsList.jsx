import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, IMAGE_URL } from "../../api/api";
import ListSkeleton from "../Global/ListSkeleton";
import toast from "react-hot-toast";

const OrganizationsList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/organizations`);
      console.log(res.data);
      setOrganizations(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Organizations";
    fetchOrganizations();
  }, [deleting]);

  const handleDeleteOrganization = async (_id) => {
    setDeleting(true);
    try {
      const res = await axios.delete(
        `${BASE_URL}/admin/delete-organization/${_id}`
      );
      console.log(res);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log("error deleting org >>", error);
      toast.error("An error occurred while deleting organization");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl min-h-screen">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold">My Organizations</h2>
        <Link
          to={"/organizations/add-organization"}
          className="red-bg text-white text-xs font-medium py-3 rounded-lg px-4"
        >
          Add Organization
        </Link>
      </div>
      {loading ? (
        <ListSkeleton />
      ) : (
        <>
          {organizations.length > 0 ? (
            <>
              <table className="employee-table w-full mt-6">
                <thead>
                  <tr className="bg-red-100">
                    <th className="text-start text-xs red-text py-4 pl-10 uppercase">
                      Logo
                    </th>
                    <th className="text-start text-xs red-text py-4 pl-10 uppercase">
                      Organization Name
                    </th>
                    <th className="text-start text-xs red-text py-4 uppercase">
                      Organization Suffix
                    </th>
                    <th className="text-start text-xs red-text py-4 uppercase">
                      Organization Domain
                    </th>
                    <th className="text-start text-xs red-text py-4 uppercase">
                      Privacy
                    </th>
                    <th className="text-start text-xs red-text py-4 uppercase">
                      Terms
                    </th>
                    <th className="text-xs red-text py-4 uppercase text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {organizations?.map((organization, index) => (
                    <tr
                      key={organization._id}
                      className={`border-b ${index % 2 == 1 && "bg-gray-100"}`}
                    >
                      <td className="text-[12px] font-medium py-3 pl-10">
                        <img
                          src={`${IMAGE_URL}${organization?.organizationLogo}`}
                          alt="organization logo"
                          className="w-12 h-auto"
                        />
                      </td>
                      <td className="text-[12px] font-medium py-3 pl-10">
                        {organization?.organizationName}
                      </td>
                      <td className="text-[12px] font-medium py-3">
                        {organization?.organizationSuffix}
                      </td>
                      <td className="text-[12px] font-medium py-3">
                        {organization?.organizationDomain}
                      </td>
                      <td className="text-[12px] font-medium py-3">
                        <a
                          href={organization?.organizationPrivacyPolicy}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Privacy
                        </a>
                      </td>
                      <td className="text-[12px] font-medium py-3">
                        <a
                          href={organization?.organizationTermsOfService}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Terms
                        </a>
                      </td>
                      <td className="text-[12px] font-medium py-3 flex pt-6 items-center justify-center gap-2 pb-6">
                        <Link
                          to={`/organizations/update-organization/${organization?._id}`}
                          className="text-xs font-semibold text-green-700 underline block"
                        >
                          Update
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteOrganization(organization._id)
                          }
                          className="text-xs font-semibold text-red-700 underline block"
                        >
                          {deleting ? "Deleting" : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <div className="w-full flex justify-center pt-36">
                <h2 className="text-base">
                  You have not added any organization yet.
                </h2>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OrganizationsList;
