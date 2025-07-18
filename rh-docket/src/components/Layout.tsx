import React, { useState } from 'react';
import { 
  ChevronsLeft, 
  Home, 
  Folder, 
  List, 
  Archive, 
  FileText, 
  CheckSquare, 
  BookOpen, 
  Eye, 
  RefreshCw, 
  BarChart3, 
  Wrench, 
  Star, 
  PenTool,
  Settings,
  Bell,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './SearchBar';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: NavItem[];
  isActive?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [docketingExpanded, setDocketingExpanded] = useState(true);

  const navigationItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { 
      id: 'docketing', 
      label: 'Docketing', 
      icon: Folder, 
      children: [
        { id: 'inbox', label: 'Inbox', icon: List, href: '/docketing/inbox', isActive: true },
        { id: 'archived', label: 'Archived', icon: Archive, href: '/docketing/archived' },
      ]
    },
    { id: 'records', label: 'Records', icon: FileText, href: '/records' },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, href: '/tasks' },
    { id: 'documents', label: 'Documents', icon: FileText, href: '/documents' },
    { id: 'sales-navigator', label: 'Sales Navigator', icon: BookOpen, href: '/sales-navigator' },
    { id: 'views', label: 'Views', icon: Eye, href: '/views' },
    { id: 'renewals', label: 'Renewals', icon: RefreshCw, href: '/renewals' },
    { id: 'quote-hub', label: 'Quote Hub', icon: BarChart3, href: '/quote-hub' },
    { id: 'service-hub', label: 'Service Hub', icon: Wrench, href: '/service-hub' },
    { id: 'ai', label: 'AI', icon: Star, href: '/ai' },
    { id: 'patent-specs', label: 'Patent specifications', icon: PenTool, href: '/patent-specs' },
  ];



  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AnimatePresence>
        <motion.div
          initial={{ width: 280 }}
          animate={{ width: sidebarCollapsed ? 64 : 280 }}
          className="bg-white border-r border-gray-200 flex flex-col"
        >
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold text-gray-900"
              >
                RightHub
              </motion.div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <ChevronsLeft className={`h-5 w-5 text-gray-500 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Client Selector */}
          <div className="p-4 border-b border-gray-200">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium text-gray-700"
              >
                All clients
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            {navigationItems.map((item) => (
              <div key={item.id}>
                <div
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                    item.isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1"
                    >
                      {item.label}
                    </motion.div>
                  )}
                  {item.children && !sidebarCollapsed && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setDocketingExpanded(!docketingExpanded)}
                      className="ml-auto"
                    >
                      <ChevronsLeft className={`h-4 w-4 transition-transform ${docketingExpanded ? 'rotate-90' : ''}`} />
                    </motion.button>
                  )}
                </div>
                
                {/* Sub-items */}
                {item.children && docketingExpanded && !sidebarCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-6 mt-1"
                  >
                    {item.children.map((child) => (
                      <div
                        key={child.id}
                        className={`flex items-center px-3 py-2 text-sm rounded-md cursor-pointer transition-colors ${
                          child.isActive 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <child.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                        {child.label}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Global Search */}
            <div className="flex-1 max-w-2xl">
              <SearchBar placeholder="Search all of RightHub" />
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4 ml-6">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <HelpCircle className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MessageCircle className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  RS
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full ml-1"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};