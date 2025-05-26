
import React, { useState, useEffect } from 'react';
import { Bell, Settings, Check, Trash2, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Notification, NotificationSettings } from '@/types/notifications';
import { notificationService } from '@/services/notificationService';

interface NotificationCenterProps {
  userId: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ userId }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    loadNotifications();
    loadSettings();
  }, [userId]);

  const loadNotifications = () => {
    const allNotifications = notificationService.getNotifications(userId);
    const unread = notificationService.getNotifications(userId, true);
    setNotifications(allNotifications);
    setUnreadCount(unread.length);
  };

  const loadSettings = () => {
    const userSettings = notificationService.getUserSettings(userId);
    setSettings(userSettings);
  };

  const handleMarkAsRead = (notificationId: string) => {
    notificationService.markAsRead(notificationId);
    loadNotifications();
  };

  const handleMarkAllAsRead = () => {
    notificationService.markAllAsRead(userId);
    loadNotifications();
  };

  const handleDeleteNotification = (notificationId: string) => {
    notificationService.deleteNotification(notificationId);
    loadNotifications();
  };

  const handleSettingsChange = (key: keyof NotificationSettings, value: any) => {
    if (!settings) return;
    
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    notificationService.updateUserSettings(userId, updatedSettings);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appraisal_due': return '📋';
      case 'appraisal_assigned': return '📝';
      case 'feedback_requested': return '💬';
      case 'appraisal_completed': return '✅';
      case 'deadline_approaching': return '⏰';
      default: return '📢';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 px-2 py-1 text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">การแจ้งเตือน</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4" />
            </Button>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
              >
                <Check className="w-4 h-4" />
                อ่านทั้งหมด
              </Button>
            )}
          </div>
        </div>

        {showSettings && settings && (
          <div className="p-4 border-b bg-gray-50">
            <h4 className="font-medium mb-3">ตั้งค่าการแจ้งเตือน</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-enabled">อีเมล</Label>
                <Switch
                  id="email-enabled"
                  checked={settings.emailEnabled}
                  onCheckedChange={(checked) => handleSettingsChange('emailEnabled', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-enabled">การแจ้งเตือนแบบ Push</Label>
                <Switch
                  id="push-enabled"
                  checked={settings.pushEnabled}
                  onCheckedChange={(checked) => handleSettingsChange('pushEnabled', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="reminder-days">แจ้งเตือนล่วงหน้า (วัน)</Label>
                <Input
                  id="reminder-days"
                  type="number"
                  min="1"
                  max="30"
                  value={settings.reminderDaysBefore}
                  onChange={(e) => handleSettingsChange('reminderDaysBefore', parseInt(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        )}

        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>ไม่มีการแจ้งเตือน</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-lg">{getTypeIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm truncate">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge 
                              className={`${getPriorityColor(notification.priority)} text-white text-xs`}
                            >
                              {notification.priority}
                            </Badge>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {notification.createdAt.toLocaleString('th-TH')}
                            </span>
                          </div>
                          {notification.actionUrl && (
                            <Button
                              variant="link"
                              size="sm"
                              className="p-0 h-auto mt-2 text-blue-600"
                            >
                              {notification.actionLabel || 'ดูรายละเอียด'}
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
