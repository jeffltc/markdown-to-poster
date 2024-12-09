import React from 'react'

export class PosterErrorBoundary extends React.Component {
  // 添加错误边界处理
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
} 