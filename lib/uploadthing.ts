import { UTApi } from "uploadthing/server"

const utapi = new UTApi();

export const uploadFile = async (file: File) => {
  const res = await utapi.uploadFiles([file]);
  return res?.[0]?.data?.url || "";
}
