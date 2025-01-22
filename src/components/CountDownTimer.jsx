import React from 'react'
import { useState,useEffect,useRef } from 'react'
const CountDownTimer = () => {

    // initial Timer Values
    let [timeLeft,setTimeLeft]=useState(60) //initial value of timer
    let timerRef=useRef(null) // used for holding the Interval Ids
    //functino to stat the Timer
    const startTimer=()=> {
        if(timerRef.current)return; //these avoids causing the multiple re-renders
        timerRef.current=setInterval(()=>{
            setTimeLeft(prevtime=>{
                if(prevtime<=1){ // checking whether timer is Reached 1 and below to remove it from ui
                    clearInterval(timerRef.current)
                    timerRef.current=null;
                    return 0
                }
    
                return prevtime-1
            })
        },1000) // timer updates every sec
    }

    //function to stop the Timer
    const stopTimer=()=>{
        clearInterval(timerRef.current)
        timerRef.current=null;
    }

    //function to Reset the Timer
    const resetTimer=()=>{
        stopTimer()
        setTimeLeft(60)
    }

    // useEffect to clear the Timer from the Component - unmounting
    useEffect(()=>{
        return ()=>clearInterval(timerRef.current)
    },[])


  return (
    <div className='container bg-black min-vh-100 min-vw-100 d-flex justify-content-center align-items-center'>
         <div className=" card text-center shadow">
            <div className='time my-5 d-flex justify-content-center gap-3'>
                <div><h1 className='d-inline rounded-circle bg-white text-success p-3'>{timeLeft}</h1></div>
                <div><h2 className=' d-inline rounded-pill bg-white text-success px-3 '>seconds</h2></div>
            </div>
            <div className="buttons d-flex justify-content-center gap-2 my-3">
                <button className='btn btn-success' onClick={()=>startTimer()}>Start</button>
                <button className='btn btn-warning mx-1' onClick={()=>stopTimer()}>Stop</button>
                <button className='btn btn-danger' onClick={()=>resetTimer()}>Reset</button>

            </div>
         </div>
    </div>
  )
}

export default CountDownTimer