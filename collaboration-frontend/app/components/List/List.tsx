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
        <table className="w-full h-full table-auto">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Last modified
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            {!loading ? <tbody>
              {documents?.length
                ? documents.map((task, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 p-4"
                      >
                        <td align="center">
                          <Link href={`/create/${task?._id}`}>{task?.title}</Link></td>
                        
                        <td align="center">{task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : "-"}</td>
                        <td align="center">
                          <div
                            className="inline-flex rounded-md shadow-sm"
                            role="group"
                          >
                            
                            <button
                              type="button"
                              onClick={() => handleAction("delete", task?._id)}
                              className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center flex"                            >
                              Delete
                            </button>
                            
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : "No Task found"}
            </tbody> : <div className="w-full justify-center items-center flex-1 flex fixed">Loading...</div>}
          </table>
        </>
      ) : (
        "No documents found"
      )}
    </div>
  );
}

export default List;
