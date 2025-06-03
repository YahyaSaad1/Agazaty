// src/components/ErrorBoundary.js
import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error Boundary Caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
        return <h1>حدث خطأ غير متوقع! برجاء إعادة تحميل الصفحة.</h1>;
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
