import React, { useState } from 'react';
import { Home, Users, Bookmark, Clock, Calendar, Store, Video, MessageCircle, Flag, ChevronDown, UsersRound, Settings, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import AccessibleButton from './AccessibleButton';
import { toast } from 'sonner';

const Sidebar = () => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Friends', path: '/friends', count: 3 },
    { icon: MessageCircle, label: 'Messenger', path: '/messages', count: 2 },
    { icon: Video, label: 'Watch', path: '/watch' },
    { icon: Store, label: 'Marketplace', path: '/marketplace' },
    { icon: UsersRound, label: 'Groups', path: '/groups' },
    { icon: Bookmark, label: 'Saved', path: '/saved' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Clock, label: 'Memories', path: '/memories' },
    { icon: Flag, label: 'Pages', path: '/pages' },
    { icon: TrendingUp, label: 'Most Recent', path: '/recent' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const shortcuts = [
    { 
      name: 'React Developers', 
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop', 
      path: '/groups/react-developers',
      members: '12.5k'
    },
    { 
      name: 'Web Design Community', 
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop', 
      path: '/groups/web-design',
      members: '8.2k'
    },
    { 
      name: 'JavaScript Enthusiasts', 
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop', 
      path: '/groups/javascript',
      members: '15.7k'
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    console.log(`Sidebar navigation: ${path}`);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    console.log('Profile clicked from sidebar');
  };

  const handleShortcutEdit = () => {
    toast.info('Shortcut editing coming soon!');
    console.log('Edit shortcuts clicked');
  };

  const visibleItems = showMore ? menuItems : menuItems.slice(0, 8);

  return (
    <aside className="sidebar-responsive">
      <div className="sidebar-content">
        {/* User Profile */}
        <div 
          className="sidebar-profile-item"
          onClick={handleProfileClick}
        >
          <Avatar className="sidebar-avatar">
            <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="sidebar-text">John Doe</span>
        </div>

        {/* Main Menu */}
        <nav className="sidebar-nav">
          {visibleItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <AccessibleButton
                key={item.label}
                variant="ghost"
                className={`sidebar-nav-item ${
                  isActive 
                    ? 'sidebar-nav-item-active' 
                    : 'sidebar-nav-item-inactive'
                }`}
                onClick={() => handleNavigation(item.path)}
                aria-label={item.label}
              >
                <div className="sidebar-nav-content">
                  <item.icon className="sidebar-icon" />
                  <span className="sidebar-text">{item.label}</span>
                </div>
                {item.count && (
                  <span className="sidebar-badge">
                    {item.count}
                  </span>
                )}
              </AccessibleButton>
            );
          })}
        </nav>

        {/* See More Button */}
        <AccessibleButton
          variant="ghost"
          className="sidebar-nav-item sidebar-nav-item-inactive"
          onClick={() => {
            setShowMore(!showMore);
            toast.info(showMore ? 'Showing fewer options' : 'Showing more options');
          }}
          aria-expanded={showMore}
        >
          <div className="sidebar-nav-content">
            <div className="sidebar-see-more-icon">
              <ChevronDown className={`sidebar-chevron ${showMore ? 'sidebar-chevron-rotated' : ''}`} />
            </div>
            <span className="sidebar-text">{showMore ? 'See less' : 'See more'}</span>
          </div>
        </AccessibleButton>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Shortcuts */}
        <div className="sidebar-section">
          <div className="sidebar-section-header">
            <h3 className="sidebar-section-title">Your shortcuts</h3>
            <AccessibleButton
              variant="ghost"
              size="sm"
              className="sidebar-edit-button"
              onClick={handleShortcutEdit}
            >
              Edit
            </AccessibleButton>
          </div>
          
          {shortcuts.map((shortcut) => (
            <AccessibleButton
              key={shortcut.name}
              variant="ghost"
              className="sidebar-shortcut-item"
              onClick={() => handleNavigation(shortcut.path)}
            >
              <img
                src={shortcut.image}
                alt={shortcut.name}
                className="sidebar-shortcut-image"
              />
              <div className="sidebar-shortcut-content">
                <p className="sidebar-shortcut-name">{shortcut.name}</p>
                <p className="sidebar-shortcut-members">{shortcut.members} members</p>
              </div>
            </AccessibleButton>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">Quick Actions</h3>
          <div className="sidebar-quick-actions">
            <AccessibleButton
              variant="outline"
              size="sm"
              className="sidebar-quick-action"
              onClick={() => {
                navigate('/');
                console.log('Quick action: Create post');
              }}
            >
              <MessageCircle className="sidebar-quick-action-icon" />
              <span className="sidebar-quick-action-text">Post</span>
            </AccessibleButton>
            <AccessibleButton
              variant="outline"
              size="sm"
              className="sidebar-quick-action"
              onClick={() => {
                navigate('/events');
                console.log('Quick action: Create event');
              }}
            >
              <Calendar className="sidebar-quick-action-icon" />
              <span className="sidebar-quick-action-text">Event</span>
            </AccessibleButton>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;