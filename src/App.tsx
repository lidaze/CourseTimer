import React, { useState } from 'react';
import './App.css';
import { Button, Tabs, Card } from 'antd';
import TimeProgress from './TimeProgress';
import { HeartOutlined } from '@ant-design/icons';
import CourseCard from './CourseCard';
import CourseList from './CourseList';

import type { TabsProps } from 'antd';

export type Session = { title: string; time: number; color: string };

const App: React.FC = () => {
  const [sessions1, setSessions1] = useState([
    { title: 'Warm-UP', time: 15, color: '#264653dd' },
    { title: 'Common Sentences', time: 20, color: '#2a9d8fdd' },
    { title: 'Listening', time: 30, color: '#e9c46add' },
    { title: 'Speaking', time: 20, color: '#f4a261dd' },
    { title: 'Discussion', time: 20, color: '#e76f51dd' },
    { title: 'Fixing Issues', time: 15, color: '#fcbf49dd' },
  ]);
  const [sessions2, setSessions2] = useState([
    { title: 'Warm-UP', time: 15, color: '#264653dd' },
    { title: 'Common Sentences', time: 20, color: '#2a9d8fdd' },
    { title: 'Listening', time: 30, color: '#e9c46add' },
    { title: 'Speaking', time: 20, color: '#f4a261dd' },
    { title: 'Discussion', time: 20, color: '#e76f51dd' },
    { title: 'Fixing Issues', time: 15, color: '#fcbf49dd' },
    { title: 'Pricatise', time: 15, color: '#fcbf49dd' },
  ]);

  const tabItems = [
    {
      key: '1',
      label: 'COURSE PART 1',
      children: <CourseCard title="Course Part 1" sessions={sessions1} courseDuration={120} />,
    },
    {
      key: '2',
      label: 'COURSE PART 2',
      children: <CourseCard title="Course Part 2" sessions={sessions2} courseDuration={120} />,
    },
  ];

  return (
    <div className="app">
      <h1>Class Timer</h1>
      <Tabs
        className="tabs"
        defaultActiveKey="1"
        type="card"
        size="large"
        items={tabItems}
        onChange={console.log}
      />
      {/* <div className="course-list-content">
        <Card>
          <CourseList title="Course Part 1" sessions={sessions1} />
        </Card>
        <Card style={{ marginLeft: 12 }}>
          <CourseList title="Course Part 2" sessions={sessions2} />
        </Card>
      </div> */}
    </div>
  );
};

export default App;
