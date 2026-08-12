import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

/** 全域錯誤隔離層：即使初始化或子元件渲染失敗，也保留可操作的恢復畫面。 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, errorMessage: "" };

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      errorMessage: error instanceof Error ? error.message : "頁面載入時發生未預期錯誤。",
    };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("晨樂加油站渲染錯誤", error, info);
  }

  private reload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main
        role="alert"
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          background: "#eef8ff",
          color: "#123b68",
          fontFamily: "Nunito, system-ui, sans-serif",
        }}
      >
        <section
          style={{
            width: "min(100%, 460px)",
            padding: "32px 24px",
            borderRadius: "24px",
            background: "#fff",
            border: "3px solid #ffd43b",
            boxShadow: "0 12px 0 #c9e8ff",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "12px" }} aria-hidden="true">☀️</div>
          <h1 style={{ margin: "0 0 12px", fontSize: "26px" }}>頁面需要重新整理</h1>
          <p style={{ margin: "0 0 20px", lineHeight: 1.7 }}>
            晨樂加油站剛才遇到小問題，請按下面按鈕重新載入。你的本機資料不會因為重新整理而消失。
          </p>
          <button
            type="button"
            onClick={this.reload}
            style={{
              border: 0,
              borderRadius: "14px",
              padding: "14px 22px",
              background: "#1769c2",
              color: "#fff",
              fontWeight: 800,
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            重新載入頁面
          </button>
          {this.state.errorMessage && (
            <details style={{ marginTop: "20px", textAlign: "left", color: "#57708c" }}>
              <summary>技術詳情</summary>
              <small>{this.state.errorMessage}</small>
            </details>
          )}
        </section>
      </main>
    );
  }
}

export default ErrorBoundary;
