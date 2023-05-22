import {FC, useState, useRef, useEffect} from 'react'
import { Player } from '../models/Player'
import { Colors } from '../models/Colors';
import Button from './ui/Button';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {

  const [whiteTime, setWhiteTime] = useState(300)
  const [blackTime, setBlackTime] = useState(300)

  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()

  }, [currentPlayer])

  function handleStart() {
    startTimer()
  }

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
    timer.current = setInterval(callback, 1000)
  }

  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1)
  }

  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1)
  }

  function handleRestart() {
    setWhiteTime(300)
    setBlackTime(300)
    restart()
  }

  return (
    <div
      className='timer-container'
    >
      {/* <h5>
        {`${currentPlayer.color} player turn`}
      </h5> */}
      <div
        className=''
      >
        {/* <button
          onClick={handleStart}
        >
          start game
        </button> */}
        <h2>
          {`White - ${whiteTime}`}
        </h2>
        <h2>
          {`Black - ${blackTime}`}
        </h2>
      </div>
      <Button
        onClick={handleRestart}
        title=''
        icon='refresh'
      />
    </div>
  )
}

export default Timer