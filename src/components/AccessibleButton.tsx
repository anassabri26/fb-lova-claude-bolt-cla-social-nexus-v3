import React, { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';

interface AccessibleButtonProps extends ButtonProps {
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-pressed'?: boolean;
  role?: string;
  tooltip?: string;
  loading?: boolean;
  loadingText?: string;
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    children, 
    className = '', 
    tooltip, 
    loading = false, 
    loadingText = 'Loading...',
    disabled,
    onClick,
    ...props 
  }, ref) => {
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) {
        e.preventDefault();
        return;
      }
      
      // Add visual feedback
      const button = e.currentTarget;
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 100);
      
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <Button
        ref={ref}
        className={`
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
          focus:outline-none transition-all duration-200
          min-h-[44px] min-w-[44px] touch-manipulation
          ${loading ? 'cursor-not-allowed opacity-70' : ''}
          ${className}
        `}
        title={tooltip}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs sm:text-sm">{loadingText}</span>
          </div>
        ) : (
          children
        )}
      </Button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;