import Image from "next/image";
import { FC, useState } from "react";
import CloseIcon from "../../../../public/images/close-icon.svg";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const {data:session} = useSession();
  const [PIN, setPIN] = useState("");
  const router = useRouter();
  const handleRoomJoining = async () => {
    if(PIN.length === 6) {
      try {
        const response = await fetch(`/api/room/join/${PIN}`, {
          method: "PATCH",
          body: JSON.stringify({
            userId: session?.user.id,
          })
        });

        if(response.ok) {
          router.push(`/lobby/${PIN}`);
        }
        else {
          throw new Error("Failed to join the room");
        }
      } catch(error) {
        console.log(error);
      }
    }
  }
  return (
    <div
      className={`fixed inset-0 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose} // คลิกที่พื้นหลังปิด Modal
    >
      <div
        className={`bg-[#303030] fixed bottom-0 w-full h-3/4 rounded-t-[40px] px-5 transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-100 translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()} // หยุดการปิดเมื่อคลิกใน Modal
      >
        <div className=" mt-7 h-10 flex items-center justify-between w-full">
          <div className="text-3xl font-bold absolute left-0 right-0 text-center">
            Join Game
          </div>
          <button
            onClick={onClose}
            className="bg-[#434343] h-10 w-10 rounded-full absolute right-6"
          >
            <Image src={CloseIcon} alt="close" />
          </button>
        </div>

        <input
          type="text"
          maxLength={6}
          value={PIN}
          onChange={(e) => setPIN(e.target.value)}
          placeholder="PIN"
          inputMode="numeric"
          autoFocus
          className=" placeholder-[#9D9D9D] caret-[#9D9D9D] text-white text-6xl mt-10 font-bold bg-transparent text-center w-full outline-none ring-0"
        ></input>

        <button
          onClick={handleRoomJoining} 
          className="bg-[#C63C51] text-white text-3xl font-bold w-full h-14 rounded-lg mt-8"
        >
          JOIN
        </button>
      </div>
    </div>
  );
};

export default JoinModal;
