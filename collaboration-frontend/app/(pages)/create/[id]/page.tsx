import React from "react";
import CreateComponet from "@/app/components/Create/Create";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

interface EditProps {
  params: { id: string };
  searchParams: URLSearchParams;
}
export default function Edit({ params }: EditProps) {
  const { id } = params;
  
  return <CreateComponet id={id} />;
}
