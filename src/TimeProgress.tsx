import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import './TimeProgress.css';
import { Card, Button, Space, Alert, Tag } from 'antd';
import { CoffeeOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';

interface Props {
  sessions: { title: string; time: number; color: string }[];
  courseDuration?: number; // minute
}

const App: React.FC<Props> = ({ sessions, courseDuration = 120 }) => {
  const maxTime = courseDuration * 60;

  const containerRef = useRef<HTMLDivElement>(null);
  const [ongoing, setOngoing] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [restTime, setRestTime] = useState(0); // 休息时间
  const ongoingTimerId = useRef<NodeJS.Timer>();
  const breakTimerId = useRef<NodeJS.Timer>();

  useEffect(() => {
    console.log('cc:', currentTime);
    if (ongoing) {
      if (currentTime >= maxTime) {
        setCurrentTime(maxTime);
        setOngoing(false);
        return;
      }

      ongoingTimerId.current = setInterval(() => {
        setCurrentTime((t) => t + 1);
      }, 1000);
    }

    return () => clearInterval(ongoingTimerId.current);
  }, [ongoing, currentTime]); // ✅ Now count is not a dependency

  const handleStart = () => {
    if (!containerRef.current) return;

    setOngoing(true);
    clearInterval(breakTimerId.current);
    // setCurrentTime((old) => old + 1);

    // ongoingTimerId.current = setInterval(() => {
    //   if (currentTime >= maxTime) {
    //     clearInterval(ongoingTimerId.current);
    //     setCurrentTime(maxTime);
    //     return;
    //   }

    //   setCurrentTime((t) => t + 1);
    // }, 1000);
  };

  const handleTakeABreak = () => {
    setOngoing(false);
    clearInterval(ongoingTimerId.current);

    breakTimerId.current = setInterval(() => {
      setRestTime((old) => old + 1);
    }, 1000);
  };

  const showRestTime = () => {
    if (restTime === 0) return null;

    const restP = (
      <p>
        You have rested for{' '}
        <Tag icon={<ClockCircleOutlined />} color="#f50">
          {_formatTimeFromSeconds(restTime)}
        </Tag>
      </p>
    );
    return (
      <Alert className="rest-time-content" message={restP} type="info" icon={<CoffeeOutlined />} />
    );
  };
  const timeProgressBar = () => {
    const barPercent = (currentTime / maxTime) * 100;
    const backgroundDiv = (
      <div className="time-progress-bar-bg" style={{ width: `${barPercent}%` }} />
    );
    return (
      <div className="progress-container" ref={containerRef}>
        {sessions.map((session, i) => {
          const style: React.CSSProperties = {
            width: `${(session.time / 120) * 100}%`,
            backgroundColor: session.color,
          };

          return (
            <div key={i} className="session-item" style={style}>
              <p className="title">{session.title}</p>
              <span className="time">{session.time}mins</span>
            </div>
          );
        })}
        {backgroundDiv}
      </div>
    );
  };

  const currentTimeAndTotalTimeContent = () => {
    const ongoingInfo = ongoing && (
      <span>
        The course is ongoing <SyncOutlined spin />
      </span>
    );
    return (
      <div className="prograss-bar-footer">
        <p>{ongoingInfo}</p>

        <div className="time-content">
          <Tag style={{ marginRight: 8 }}>{_formatTimeFromSeconds(currentTime)}</Tag>
          <span style={{ color: 'gray' }}>/</span>
          <Tag style={{ margin: '0 0 0 8px' }}>{_formatTimeFromSeconds(courseDuration)}</Tag>
        </div>
      </div>
    );
  };

  const buttonsContent = () => {
    if (currentTime >= maxTime)
      return <Alert style={{ marginTop: 12 }} message="Class is over." type="warning" icon="🎉" />;
    return (
      <div className="buttons-content">
        {ongoing ? (
          <Button type="primary" size="large" onClick={handleTakeABreak}>
            Take a Break
          </Button>
        ) : (
          <Button type="primary" size="large" onClick={handleStart}>
            {currentTime !== 0 ? 'Continue' : `Let's start the class.`}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="time-progress-container">
      {timeProgressBar()}
      {currentTimeAndTotalTimeContent()}
      {buttonsContent()}
      {showRestTime()}
    </div>
  );
};

export default App;

function _formatTimeFromSeconds(seconds: number): string {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  const formattedHours: string = String(hours).padStart(2, '0');
  const formattedMinutes: string = String(minutes).padStart(2, '0');
  const formattedSeconds: string = String(remainingSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Example usage:
// const totalSeconds = 3665; // For example, 3665 seconds
// const formattedTime = _formatTimeFromSeconds(totalSeconds);
// console.log(formattedTime); // Output: "01:01:05"
