"use client";
import { deleteDocumentAction, fetchAllDocumentsAction } from "@/app/redux/actions/document.action";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function List() {
  const dispatch = useDispatch();
  
  const documents = useSelector((state: RootState) => state.document.documents);
  const loading = useSelector((state: RootState) => state.auth.loading);
  
  useEffect(() => {
    dispatch(fetchAllDocumentsAction());
  }, [dispatch]);
  const handleAction = async (action: string, id: string) => {
    if (action === "delete") {
      dispatch(await deleteDocumentAction(id));
    }
   
  };
  return (
    <div className="p-10">
      {documents && documents?.length ? (
        <>
          <table className="w-full table-auto bg-white rounded-lg shadow-lg">
            <thead className="text-gray-700 uppercase bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">Title</th>
                <th scope="col" className="px-6 py-3 text-left">Last Modified</th>
                <th scope="col" className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            {!loading ? (
              <tbody>
                {documents?.length
                  ? documents.map((task, index) => {
                      return (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        >
                          <td className="px-6 py-4">
                            <Link href={`/create/${task?._id}`} className="text-blue-600 hover:underline">
                              {task?.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : "-"}
                          </td>
                          <td className="px-6 py-4">
                            <div className="inline-flex space-x-2">
                              <button
                                type="button"
                                onClick={() => handleAction("delete", task?._id)}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700 rounded-lg transition-all"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : "No documents found"}
              </tbody>
            ) : (
              <div className="w-full flex justify-center items-center h-40 text-lg font-semibold text-gray-500">Loading...</div>
            )}
          </table>
        </>
      ) : (
        <div className="w-full text-center text-xl font-semibold text-gray-500">No documents found</div>
      )}
    </div>
  );
}

export default List;
