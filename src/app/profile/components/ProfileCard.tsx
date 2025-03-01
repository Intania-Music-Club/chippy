import Image from "next/image";
import AnimatedNumber from "@/components/AnimatedNumber";
import { Check, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { RoomReference } from "next-auth";

interface ProfileCardProps {
    userId: string;
    image: string;
    name: string;
    isOwnProfile: boolean;
    bankroll: number;
    roomJoined: RoomReference[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    userId,
    image,
    name,
    isOwnProfile,
    roomJoined,
    bankroll,
}) => {
    const handleCanceled = () => {
        setDisPlayName(name);
    }
    const handleChangingName = async () => {
            try {
                const response = await fetch("/api/users/update-name", {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: userId,
                        newName: displayName,
                    })
                });
    
                if(!response.ok) throw new Error("Failed to fetch update-name");
                reloadPage();
            } catch(error) {
                console.log(error);
            }
    }
    
    const [displayName, setDisPlayName] = useState(name);
    const [isNameChanging, setIsNameChaging] = useState(false);

    const totalMatch = roomJoined.length;

    const reloadPage = () => {
        window.location.reload();
    }

    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const [isNameVisible, setIsNameVisible] = useState(false);
    const [isStatTextsVisible, setIsStatTextsVisible] = useState(false);
    const [isImageVisible, setIsImageVisible] = useState(false);
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsBoxVisible(true);
        }, 100)
        return () => {
            if(timer) clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        if(isBoxVisible) {
            const timer = setTimeout(() => {
                setIsStatTextsVisible(true);
            }, 100)
            return () => {
                if(timer) clearTimeout(timer)
            }
        }
    }, [isBoxVisible])

    useEffect(() => {
        if(isBoxVisible) {
            const timer = setTimeout(() => {
                setIsNameVisible(true);
            }, 100)
            return () => {
                if(timer) clearTimeout(timer)
            }
        }
    }, [isBoxVisible])

    useEffect(() => {
        if(isNameVisible) {
            const timer = setTimeout(() => {
                setIsImageVisible(true);
            }, 300)
            return () => {
                if(timer) clearTimeout(timer)
            }
        }
    }, [isNameVisible])


    return (
        <section className={`relative w-full min-h-[220px] bg-white flex flex-col justify-center items-center text-black rounded-2xl transition-all duration-700 ${
            isBoxVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}>
            <div  className="absolute top-[-65px] flex flex-col items-center">
                <Image 
                    src={image}
                    alt="userImg"
                    width={120}
                    height={120}
                    className={`rounded-full border-4 border-white transition-all duration-500 ${
                        isImageVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
                    }`}
                />
                <div className="relative flex justify-center items-center">
                    <div className={`mt-3 text-2xl font-bold transition-all duration-500 
                        ${isNameVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}
                        ${name.length >= 18 ? 
                            'text-lg' : 
                            name.length >= 15 ?
                                'text-xl':
                                'text-2xl'
                        }
                    `}>
                        {!isOwnProfile ? (
                            <div>{name}</div>
                        ) : ( 
                            <div className="relative flex justify-center items-center w-full">
                                <form 
                                    onSubmit={(e) => e.preventDefault()} 
                                    className={`flex justify-center items-center gap-1 transition-all duration-300 
                                        ${isNameChanging ? "opacity-0 -translate-x-full" : "opacity-100 -translate-x-0"}
                                        
                                    `}>
                                    <input
                                        type="text"
                                        placeholder="Display name ..."
                                        spellCheck="false"
                                        value={displayName}
                                        onChange={(e) => setDisPlayName(e.target.value)} 
                                        className={`text-center w-full max-w-[200px] rounded-md focus:outline-none focus:ring-4 focus:ring-primary-red ${
                                            isNameChanging && "bg-transparent"
                                        }`}
                                        />
                                    {displayName !== name && ( 
                                        <div className="ml-3 flex items-center gap-2">
                                            <div onClick={() => {setIsNameChaging(true); handleChangingName();}} className={`transition-all hover:scale-125`}>
                                                <Check />
                                            </div>
                                            <div onClick={handleCanceled} className={`transition-all hover:scale-125`}>
                                                <X />
                                            </div>
                                        </div>
                                    )}
                                </form>
                                <div className={`text-2xl absolute top-[2px] transition-all duration-300 ${
                                    isNameChanging ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                                }`}>
                                    Changing Name ...
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {(
                    <div className="mt-3 w-full flex justify-evenly gap-2">
                        <div className="w-20 flex flex-col justify-center items-center">
                            <div className="text-4xl font-bold">
                                <AnimatedNumber 
                                    from={0}
                                    to={totalMatch}
                                    duration={3000} 
                                />
                            </div>
                            <div className={`mt-2 flex flex-col justify-center items-center leading-[1.1] font-light transition-all duration-700 ${
                                isStatTextsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                            }`}>
                                <div>Match</div>
                                <div>Played</div>
                            </div>
                        </div>
                        <div className="w-20 flex flex-col justify-center items-center">
                            <div className="text-4xl font-bold">
                                <AnimatedNumber 
                                    from={0}
                                    to={(-1000 < bankroll && bankroll < 1000) ? bankroll : (bankroll/1000)}
                                    duration={3000} 
                                />
                            </div>
                            <div className={`mt-2 flex flex-col justify-center items-center leading-[1.1] font-light transition-all duration-700 ${
                                isStatTextsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                            }`}>
                                <div>All-time</div>
                                <div>Earned</div>
                            </div>
                        </div>
                        <div className="w-20 flex flex-col justify-center items-center">
                            <div className="text-4xl font-bold">
                                <AnimatedNumber 
                                    from={0}
                                    to={totalMatch !== 0 ? (bankroll / totalMatch) : 0}
                                    duration={3000} 
                                />
                            </div>
                            <div className={`mt-2 flex flex-col justify-center items-center leading-[1.1] font-light transition-all duration-700 ${
                                isStatTextsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                            }`}>
                                <div>Profit/</div>
                                <div>Game</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProfileCard