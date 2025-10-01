import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AnalyticsChartProps {
  type: 'line' | 'bar' | 'pie';
  data: any[];
  title: string;
  description?: string;
  className?: string;
}

const COLORS = ['hsl(262, 83%, 58%)', 'hsl(171, 77%, 48%)', 'hsl(38, 92%, 50%)', 'hsl(0, 72%, 51%)'];

export function AnalyticsChart({ type, data, title, description, className = '' }: AnalyticsChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-md shadow-dropdown p-3">
          <p className="text-text font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-textMuted">
              <span style={{ color: entry.color }}>{entry.name}: </span>
              {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 16%)" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(240, 5%, 64%)" 
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="hsl(240, 5%, 64%)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="hsl(262, 83%, 58%)" 
                strokeWidth={2}
                dot={{ fill: 'hsl(262, 83%, 58%)', strokeWidth: 2, r: 4 }}
                name="Feedback Items"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 16%)" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(240, 5%, 64%)" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="hsl(240, 5%, 64%)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="requests" 
                fill="hsl(262, 83%, 58%)"
                name="Requests"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text mb-1">{title}</h3>
        {description && (
          <p className="text-textMuted text-sm">{description}</p>
        )}
      </div>
      {renderChart()}
    </div>
  );
}