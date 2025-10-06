import React from 'react';
import { Card, CardBody, CardHeader, Button } from '@nextui-org/react';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { tasks, quotes, setCurrentView } = useApp();

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'สวัสดีตอนเช้า';
    if (hour < 18) return 'สวัสดีตอนบ่าย';
    return 'สวัสดีตอนเย็น';
  };

  const getMotivationalMessage = () => {
    if (completionRate === 100 && tasks.length > 0) {
      return '🎉 ยอดเยี่ยม! คุณทำทุกงานเสร็จแล้ว!';
    } else if (completionRate >= 80) {
      return '🔥 เกือบเสร็จแล้ว! ไปต่อกันเลย!';
    } else if (completionRate >= 50) {
      return '💪 กำลังไปได้ดี! อย่าหยุด!';
    } else if (tasks.length > 0) {
      return '🚀 เริ่มต้นดีแล้ว! ไปต่อกัน!';
    } else {
      return '✨ เริ่มต้นวันใหม่ด้วยการเพิ่มงานแรกกันเลย!';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <CardBody className="p-6">
          <h2 className="text-2xl font-bold mb-2">
            {getGreeting()}, ผู้ใช้! 👋
          </h2>
          <p className="text-primary-100 text-lg">
            {getMotivationalMessage()}
          </p>
        </CardBody>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm">
          <CardBody className="p-4 text-center">
            <p className="text-3xl font-bold text-primary-600">{tasks.length}</p>
            <p className="text-sm text-gray-600">งานทั้งหมด</p>
          </CardBody>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardBody className="p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{completedTasks.length}</p>
            <p className="text-sm text-gray-600">เสร็จแล้ว</p>
          </CardBody>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardBody className="p-4 text-center">
            <p className="text-3xl font-bold text-orange-600">{pendingTasks.length}</p>
            <p className="text-sm text-gray-600">รอดำเนินการ</p>
          </CardBody>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardBody className="p-4 text-center">
            <p className="text-3xl font-bold text-purple-600">{completionRate}%</p>
            <p className="text-sm text-gray-600">อัตราเสร็จสิ้น</p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-800">การจัดการงาน</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <Button
                color="primary"
                className="w-full bg-primary-500 text-white"
                onPress={() => setCurrentView('tasks')}
              >
                📋 ดูงานทั้งหมด
              </Button>
              <Button
                variant="bordered"
                color="primary"
                className="w-full"
                onPress={() => setCurrentView('tasks')}
              >
                ➕ เพิ่มงานใหม่
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-800">แรงบันดาลใจ</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <Button
                color="secondary"
                className="w-full bg-purple-500 text-white"
                onPress={() => setCurrentView('quotes')}
              >
                💭 ดูคำคม
              </Button>
              <Button
                variant="bordered"
                color="secondary"
                className="w-full"
                onPress={() => setCurrentView('quotes')}
              >
                🎲 คำคมสุ่ม
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Tasks Preview */}
      {tasks.length > 0 && (
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold text-gray-800">งานล่าสุด</h3>
              <Button
                size="sm"
                variant="light"
                color="primary"
                onPress={() => setCurrentView('tasks')}
              >
                ดูทั้งหมด
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    task.completed ? 'bg-green-50' : 'bg-gray-50'
                  }`}
                >
                  <span className={`text-lg ${task.completed ? '✅' : '⏳'}`}>
                    {task.completed ? '✅' : '⏳'}
                  </span>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className={`text-sm ${
                        task.completed ? 'line-through text-gray-400' : 'text-gray-600'
                      }`}>
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Motivational Quote */}
      {quotes.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardBody className="p-6 text-center">
            <blockquote className="text-lg italic mb-2">
              "{quotes[0]?.content}"
            </blockquote>
            <p className="text-purple-100">— {quotes[0]?.author}</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
