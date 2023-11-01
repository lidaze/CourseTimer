import type { Session } from './App';

import React, { useState } from 'react';

import { List, Tag } from 'antd';

interface Props {
  sessions: Session[];
}

const CourseList: React.FC<Props> = ({ sessions }) => {
  return (
    <List
      // bordered
      size="small"
      dataSource={sessions}
      renderItem={(item, i) => (
        <List.Item
          style={{ backgroundColor: item.color, color: 'white' }}
          actions={[
            <Tag color="#108ee9" style={{ width: 54 }}>
              {item.time}mins
            </Tag>,
          ]}
        >
          {i + 1}. {item.title}
        </List.Item>
      )}
    />
  );
};

export default CourseList;
