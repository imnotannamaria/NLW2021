import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";
let countTimeout: NodeJS.Timeout;


interface CountContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCount: () => void;
    resetCount: () => void;
}

interface CountContexProviderProps{
    children: ReactNode;
}


export const CountContext = createContext({} as CountContextData);

export function CountContextProvider( {children}:  CountContexProviderProps){

    const{ startNewChallenge } = useContext(ChallengeContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setisActive] = useState(false);
    const [hasFinished, sethasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCount(){
        setisActive(true);
    }

    function resetCount(){
        clearTimeout(countTimeout);
        setisActive(false);
        setTime(25 * 60);
        sethasFinished(false);
    }

    useEffect(() => {
        if(isActive && time > 0){
            countTimeout = setTimeout(() => {
                setTime(time - 1);
            },1000) 
        } else if(isActive && time === 0){//quando o timer chega em 0
            //console.log("CABO");
            sethasFinished(true);
            setisActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return(
        <CountContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCount,
            resetCount,
        }}>
            {children}
        </CountContext.Provider>
    )
}