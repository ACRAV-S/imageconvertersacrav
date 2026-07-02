"use client";

import { Component, type ReactNode } from "react";

interface ToolErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ToolErrorBoundaryState {
  hasError: boolean;
}

export default class ToolErrorBoundary extends Component<ToolErrorBoundaryProps, ToolErrorBoundaryState> {
  constructor(props: ToolErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ToolErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center px-4 py-20">
            <svg className="h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Something went wrong</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              This tool encountered an error. Please try refreshing the page.
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
