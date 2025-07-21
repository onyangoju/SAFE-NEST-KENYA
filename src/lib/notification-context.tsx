"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from './/supabase';
import { useAuth } from "./auth-context";

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  message: string;
  case_id: string | null;
  is_read: boolean;
  created_at: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => Promise<void>;
  refresh: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAllRead: async () => {},
  refresh: () => {},
});

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setNotifications(data || []);
    setUnreadCount((data || []).filter((n: Notification) => !n.is_read).length);
  };

  useEffect(() => {
    fetchNotifications();
    // Optionally, poll for new notifications every 30s
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const markAllRead = async () => {
    if (!user) return;
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);
    fetchNotifications();
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllRead, refresh: fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
} 