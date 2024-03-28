import React from "react";

type Props = { children: React.ReactNode; fallback?: React.ReactNode };
type State = {
  error: null | Error;
  errorInfo: null | React.ErrorInfo;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state: Readonly<State> = {
    error: null,
    errorInfo: null,
  };
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render(): React.ReactNode {
    if (this.state.errorInfo) {
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <>
          <p>Erreur</p>
          <p>{this.state.error && this.state.error.toString()}</p>
          <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
