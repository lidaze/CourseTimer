import type { Session } from './App';
import React, { useState } from 'react';

import { List, Tabs, Card } from 'antd';
import CourseList from './CourseList';
import TimeProgress from './TimeProgress';

interface Props {
  title: string;
  sessions: Session[];
  courseDuration?: number; // minute
}

const CourseCard: React.FC<Props> = ({ title, sessions, courseDuration }) => {
  return (
    <div>
      <TimeProgress sessions={sessions} courseDuration={courseDuration} />
      <Card title={title} style={{ width: 400, marginTop: 12 }}>
        <CourseList sessions={sessions} />
      </Card>
    </div>
  );
};

export default CourseCard;
