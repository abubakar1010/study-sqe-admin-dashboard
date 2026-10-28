import { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";

export default function SingleNote() {
  const axiosSecure = useAxiosSecure();
  const [note, setNote] = useState({}) as any;
  const { noteId } = useParams();
  useEffect(() => {
    axiosSecure.get(`/notes/${noteId}`).then((res) => {
      setNote(res?.data?.data);
    });
  }, []);
  return (
    <>
      <Header title="Note"></Header>
      <div className="space-y-5 text-2xl">
        <h2>{note?.title}</h2>
        <iframe
          src={note?.url}
          className="w-full h-[800px] border rounded-lg"
        ></iframe>
      </div>
    </>
  );
}
