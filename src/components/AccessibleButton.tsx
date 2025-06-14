
import React, { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';

interface AccessibleButtonProps extends ButtonProps {
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-pressed'?: boolean;
  role?: string;
  tooltip?: string;
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ children, className = '', tooltip, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={`
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
          focus:outline-none transition-all duration-200
          min-h-[44px] min-w-[44px] // Touch target size for mobile
          ${className}
        `}
        title={tooltip}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;
