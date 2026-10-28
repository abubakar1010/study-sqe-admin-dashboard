import React from "react";
import Header from "../../components/layout/Header";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import { RxCross2 } from "react-icons/rx";

export const TopicFlashcards: React.FC = () => {
  const { topic } = useParams();
  function handleVideoUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      alert(`Video selected: ${file.name}`);
      // You can preview or upload it here
    }
  }
  return (
    <>
      <Header title={topic}></Header>

      <div className="flex justify-between">
        <h2 className="text-2xl">Tutorial</h2>
        <div>
          <button
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_1"
              ) as HTMLDialogElement | null;
              if (modal) {
                modal.showModal();
              }
            }}
            className="flex gap-2 items-center justify-center bg-white p-3 hover:bg-accent rounded-xl"
          >
            <FaPlus></FaPlus> Add
          </button>
        </div>
      </div>

      <div className="space-y-3 ">
        <div className="bg-white hover:bg-[#f3f3f3] p-3 flex justify-between items-center rounded-xl">
          <p className="text-xl">Business law and practice</p>
          <button
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_2"
              ) as HTMLDialogElement | null;
              if (modal) {
                modal.showModal();
              }
            }}
            className="flex gap-2 items-center justify-center bg-accent p-3 hover:bg-white hover:shadow-md rounded-xl"
          >
            <FaPlus></FaPlus> Add
          </button>
        </div>
        <div className="bg-white hover:bg-[#f3f3f3] p-3 flex justify-between items-center rounded-xl">
          <p className="text-xl">Business law and practice</p>
          <button className="flex gap-2 items-center justify-center bg-accent p-3 hover:bg-white hover:shadow-md rounded-xl">
            <FaPlus></FaPlus> Add
          </button>
        </div>
        <div className="bg-white hover:bg-[#f3f3f3] p-3 flex justify-between items-center rounded-xl">
          <p className="text-xl">Business law and practice</p>
          <button className="flex gap-2 items-center justify-center bg-accent p-3 hover:bg-white hover:shadow-md rounded-xl">
            <FaPlus></FaPlus> Add
          </button>
        </div>
        <div className="bg-white hover:bg-[#f3f3f3] p-3 flex justify-between items-center rounded-xl">
          <p className="text-xl">Business law and practice</p>
          <button className="flex gap-2 items-center justify-center bg-accent p-3 hover:bg-white hover:shadow-md rounded-xl">
            <FaPlus></FaPlus> Add
          </button>
        </div>
        <div className="bg-white hover:bg-[#f3f3f3] p-3 flex justify-between items-center rounded-xl">
          <p className="text-xl">Business law and practice</p>
          <button className="flex gap-2 items-center justify-center bg-accent p-3 hover:bg-white hover:shadow-md rounded-xl">
            <FaPlus></FaPlus> Add
          </button>
        </div>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box bg-white ">
          <form action="" encType="multipart/form-data">
            <h3 className="font-bold text-lg">Add Tutorial</h3>
            <p className="py-4">
              <input
                type="text"
                className="input w-full border-1 border-slate-300 rounded-lg p-5 text-xl "
                placeholder="Write tutorial title"
                list="browsers"
              />
            </p>
            <button className="btn bg-accent border-0">Save</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}

              <button className="btn border-0">
                <RxCross2 />
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_2" className="modal ">
        <div className="modal-box bg-white ">
          <h3 className="font-bold text-lg">Add tutorial content</h3>
          <p className="py-4">
            <input
              type="text"
              className="input w-full border-1 border-slate-300 rounded-lg p-5 text-lg "
              placeholder="Write tutorial title"
              list="browsers"
            />
          </p>
          <div
            className="w-full h-48 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 bg-base-200 cursor-pointer hover:bg-base-300 transition"
            onClick={() => {
              const videoInput = document.getElementById(
                "videoInput"
              ) as HTMLInputElement | null;
              if (videoInput) {
                videoInput.click();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-base-content/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="mt-2 text-sm text-base-content/70">
              Click to upload video
            </p>

            <input
              id="videoInput"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />
          </div>

          <textarea
            className="textarea w-full h-24 mt-5 border-1 border-slate-300 rounded-lg p-5 text-lg "
            placeholder="Write video description"
          ></textarea>

          <div className="modal-action">
            <button className="btn bg-accent border-0">Save</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}

              <button className="btn border-0">
                <RxCross2 />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
