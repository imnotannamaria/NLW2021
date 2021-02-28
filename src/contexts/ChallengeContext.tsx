import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json'
import Cookie from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContexData {
    level: number;
    currentXp: number;
    challegCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge:  () => void;
    closeLevelUpModal:  () => void;
}

interface ChallengeProviderProps{
    children: ReactNode;
    level : number;
    currentXp : number;
    challegCompleted : number;
}

  
export const ChallengeContext = createContext({} as ChallengesContexData);

export function ChallengeProvider({ 
    children,
    ...rest
} : ChallengeProviderProps){

    const [level, setLevel] = useState(rest.level ?? 1);
    const[currentXp, setCurrentXp] = useState(rest.currentXp ?? 0);
    const[challegCompleted, setChallegCompleted] = useState(rest.challegCompleted ?? 0);

    const[activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(()=> {
        Cookie.set('level', String(level));
        Cookie.set('currentXp', String(currentXp));
        Cookie.set('challegCompleted', String(challegCompleted));
    },[level, currentXp, challegCompleted]);
    
    useEffect(()=> {
        Notification.requestPermission();
    },[])

    function levelUp(){
        setLevel(level +  1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
       const ramdomChallenge = Math.floor(Math.random() * challenges.length)
       const challenge = challenges[ramdomChallenge];

       setActiveChallenge(challenge);

       new Audio('/notification.mp3').play();

       if(Notification.permission === 'granted'){
           new Notification('Novo Desafio 🚀', {
               body:`Valendo ${challenge.amount} xp!`
           })
       }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalXp = currentXp + amount;

        if(finalXp >= experienceToNextLevel){
            finalXp = finalXp - experienceToNextLevel;

            levelUp();
        }

        setCurrentXp(finalXp);
        setActiveChallenge(null);
        setChallegCompleted(challegCompleted + 1);
    }



    return(
        <ChallengeContext.Provider value={{
                level, 
                levelUp, 
                currentXp, 
                experienceToNextLevel,
                challegCompleted,
                startNewChallenge,
                completeChallenge,
                activeChallenge,
                resetChallenge,
                closeLevelUpModal,
            }}>
            {children }

            { isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengeContext.Provider>
    );
}