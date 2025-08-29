"use client";
import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';

interface MetricData {
  name: string;
  value: number;
  id: string;
  rating: string;
}

function sendToAnalytics(metric: MetricData) {
  // In a real app, you'd send this to your analytics service
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
  
  // Example: Send to Google Analytics
  // gtag('event', metric.name, {
  //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //   event_category: 'Web Vitals',
  //   event_label: metric.id,
  //   non_interaction: true,
  // });
}

export default function WebVitals() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }

  return null;
}