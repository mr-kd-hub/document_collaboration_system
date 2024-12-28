import React from "react";
import CreateComponet from "@/app/components/Create/Create";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Edit(props: any) {
  const { params } = props;
  return <CreateComponet {...props} id={params?.id} />;
}
