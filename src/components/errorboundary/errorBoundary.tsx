import { Component, ReactNode } from 'react';
import classes from './error-boundary.module.css';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={classes.error}>
          <h2>Error: {this.state.errorMessage}</h2>
          <button onClick={this.handleReset}>Reset</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
