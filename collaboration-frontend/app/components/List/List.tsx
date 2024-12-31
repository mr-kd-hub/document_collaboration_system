/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { deleteDocumentAction, fetchAllDocumentsAction } from "@/app/redux/actions/document.action";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Suspense } from 'react'
import Loader from "@/app/loading";
import FallbackUI from "@/app/error";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Confirmation from "../Confirmation/Confirmation";
import { Typography } from "@mui/material";

function List() {
  const dispatch = useDispatch();
  const [confirmation, setConfirmation] = useState({
    id: undefined,
    status: false
  })
  const documents = useSelector((state: RootState) => state.document.documents);
  const loading = useSelector((state: RootState) => state?.auth.loading);
  
  useEffect(() => {
    dispatch(fetchAllDocumentsAction());
  }, [dispatch]);

  const handleAction = async (action: string, id: string) => {
    if (action === "delete") {
      setConfirmation((prev:any)=>({...prev, id, status: true}))
      // dispatch(await deleteDocumentAction(id));
    }
   
  };

  const handleDelete = async () => {
    if(!confirmation?.id) return;
    await dispatch(deleteDocumentAction(confirmation?.id));
    setConfirmation((prev:any)=>({...prev,id:undefined, status: false}))
  }

  return (
    loading ? <div className="loading"><Loader /></div> : <div className="p-10">
      <Suspense fallback={<FallbackUI />}>
        {documents && documents?.length ? (
          <>
            <Table className="w-full table-auto bg-white rounded-lg shadow-lg">
              <TableHead className="uppercase bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <TableRow>
                  <TableCell scope="col" className="px-6 py-3 text-left">Title</TableCell>
                  <TableCell scope="col" className="px-6 py-3 text-left">Last Modified</TableCell>
                  <TableCell scope="col" className="px-6 py-3 text-left">Actions</TableCell>
                </TableRow>
              </TableHead>
              {!loading ? (
                <TableBody>
                  {documents?.length
                    ? documents.map((task, index) => {
                        return (
                          <TableRow
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                          >
                            <TableCell  className="px-6 py-4">
                              <Link href={`/create/${task?._id}`} className="text-blue-600 hover:underline">
                                {task?.title}
                              </Link>
                            </TableCell>
                            <TableCell  className="px-6 py-4 text-gray-500">
                              {task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : "-"}
                            </TableCell>
                            <TableCell  className="px-6 py-4">
                              <div className="inline-flex space-x-2">
                                <Button
                                  // type="button"
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleAction("delete", task?._id)}
                                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700 rounded-lg transition-all"
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : <Typography>No documents found</Typography>}
                </TableBody>
              ) : (
                <div className="w-full flex justify-center items-center h-40 text-lg font-semibold text-gray-500"><Loader /></div>
              )}
            </Table>
          </>
        ) : (
          <Typography className="w-full text-center text-xl font-semibold text-gray-500">No documents found</Typography>
        )}
      </Suspense>
        <Confirmation open={confirmation?.status} onClose={() => setConfirmation({ status:false, id: undefined})} onSave={handleDelete}/>
    </div>
  );
}

export default List;
