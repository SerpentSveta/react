import { Component } from 'react';
import type { ErrorInfo } from 'react';
import type { ErrorProps, ErrorState } from '../../services/types';

export class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something broke</p>;
    }
    return this.props.children;
  }
}
