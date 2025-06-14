
import React, { useState, useEffect } from 'react';
import { Activity, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const newMetrics: PerformanceMetric[] = [
        {
          name: 'Load Time',
          value: Math.round(navigation.loadEventEnd - navigation.fetchStart),
          unit: 'ms',
          icon: Clock,
          color: 'text-blue-600'
        },
        {
          name: 'FCP',
          value: Math.round(paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0),
          unit: 'ms',
          icon: Zap,
          color: 'text-green-600'
        },
        {
          name: 'Memory',
          value: Math.round((performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0),
          unit: 'MB',
          icon: Activity,
          color: 'text-orange-600'
        }
      ];
      
      setMetrics(newMetrics);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Only show in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development');
  }, []);

  if (!isVisible || metrics.length === 0) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-64 bg-white shadow-lg border z-50 opacity-80 hover:opacity-100 transition-opacity">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {metrics.map((metric) => (
          <div key={metric.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              <span className="text-sm text-gray-700">{metric.name}</span>
            </div>
            <span className="text-sm font-medium">
              {metric.value}{metric.unit}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
