import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlassCard } from './GlassCard';

describe('GlassCard', () => {
  it('renders children', () => {
    render(<GlassCard>Test Content</GlassCard>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <GlassCard className="custom-class">Content</GlassCard>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has glass effect styles', () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    expect(container.firstChild).toHaveClass('backdrop-blur-xl');
  });
});
