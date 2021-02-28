import { useState, useEffect, useContext } from 'react';
import { CountContext } from '../contexts/CountContext';
import styles from '../style/components/Count.module.css'

let countTimeout: NodeJS.Timeout;

export function Count() {

    const { 
        minutes,
        seconds, 
        hasFinished, 
        isActive, 
        startCount, 
        resetCount  
    } = useContext(CountContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    return (
        <div>
            <div className={styles.CountContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>
        </div>

        { hasFinished ? (
            <button disabled className={styles.countButton}>
            Ciclo encerrado
            </button>
        ) : (
            <>
                { isActive ?(
                    <button type="button" className={`${styles.countButton} ${styles.countButtonActive}`} onClick={resetCount}>
                    Abandonar ciclo
                    </button>
                ) : (
                    <button type="button" className={styles.countButton} onClick={startCount}>
                    Iniciar um ciclo
                    </button>
        
                )}
            </>
        )}

        
        </div>
    );
}