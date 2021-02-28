import styles from '../style/pages/home.module.css';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChalleges } from '../components/CompletedChalleges';
import { Count } from '../components/Count';
import { ChallengeBox } from '../components/ChallengeBox';

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import React from 'react';
import { CountContextProvider } from '../contexts/CountContext';
import { ChallengeProvider } from '../contexts/ChallengeContext';

interface HomeProps{
  level : number;
  currentXp : number;
  challegCompleted : number;
}


export default function Home(props) {
  return (
    <ChallengeProvider 
      level={props.level}
      currentXp={props.currentXp}
      challegCompleted={props.challegCompleted}
      >
      <div className={styles.container}>
        <Head>
          <title>Inicio | MoveIt</title>
        </Head>
        
        <ExperienceBar />
        
      <CountContextProvider>
        <section>
          <div> 
            <Profile />
            <CompletedChalleges />
            <Count />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountContextProvider>  
      </div>
    </ChallengeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {

  const {level, currentXp, challegCompleted} = ctx.req.cookies;

  return{
    props: {
      level: Number(level),
      currentXp: Number(currentXp),
      challegCompleted: Number(challegCompleted)
    }
  }
}
