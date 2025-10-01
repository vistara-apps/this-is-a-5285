import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'impact' | 'status' | 'category';
  impact?: 'low' | 'medium' | 'high' | 'critical';
  status?: 'active' | 'paused' | 'error';
  category?: 'feature_request' | 'bug' | 'ux_issue' | 'question' | 'praise';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', impact, status, category, children, className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium';
  
  let variantStyles = 'bg-surface text-textMuted border border-border';
  
  if (variant === 'impact' && impact) {
    const impactStyles = {
      low: 'bg-impactLow/10 text-impactLow border-impactLow/20',
      medium: 'bg-impactMedium/10 text-impactMedium border-impactMedium/20',
      high: 'bg-impactHigh/10 text-impactHigh border-impactHigh/20',
      critical: 'bg-impactCritical/10 text-impactCritical border-impactCritical/20 animate-pulse-glow'
    };
    variantStyles = impactStyles[impact];
  }
  
  if (variant === 'status' && status) {
    const statusStyles = {
      active: 'bg-success/10 text-success border-success/20',
      paused: 'bg-warning/10 text-warning border-warning/20',
      error: 'bg-error/10 text-error border-error/20'
    };
    variantStyles = statusStyles[status];
  }
  
  if (variant === 'category' && category) {
    const categoryStyles = {
      feature_request: 'bg-accent/10 text-accent border-accent/20',
      bug: 'bg-error/10 text-error border-error/20',
      ux_issue: 'bg-warning/10 text-warning border-warning/20',
      question: 'bg-primary/10 text-primary border-primary/20',
      praise: 'bg-success/10 text-success border-success/20'
    };
    variantStyles = categoryStyles[category];
  }

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </span>
  );
}