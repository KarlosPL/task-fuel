import React from 'react'
import TodayTasks from '../Tabs/TodayTasks';
import Calendar from '../Tabs/Calendar';
import CompletedTasks from '../Tabs/CompletedTasks';
import DeletedTasks from '../Tabs/DeletedTasks';
import ImportantTasks from '../Tabs/ImportantTasks';
import '../../assets/styles/pages/Home.scss';

interface Props {
  activeTab: string;
}

const HelloPage: React.FC<Props> = ({ activeTab }) => {

  return (
    <div className='HelloPage flex justify-center items-center bg-zinc-200'>
      {activeTab === 'Today' && <TodayTasks />}
      {activeTab === 'Calendar' && <Calendar />}
      {activeTab === 'Important' && <ImportantTasks />}
      {activeTab === 'Completed' && <CompletedTasks />}
      {activeTab === 'Deleted' && <DeletedTasks />}
    </div>
  )
}

export default HelloPage;