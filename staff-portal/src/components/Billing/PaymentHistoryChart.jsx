import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const PaymentHistoryChart = ({ data = [] }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">
            Amount: <span className="font-semibold">{formatCurrency(payload[0].value)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="payment-chart-container">
      <div className="charts-grid">
        {/* Monthly Spending Trend */}
        <div className="chart-card">
          <h4 className="chart-title">Monthly Spending Trend</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending by Category */}
        <div className="chart-card">
          <h4 className="chart-title">Spending by Category</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="category" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="amount" 
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Distribution */}
        <div className="chart-card">
          <h4 className="chart-title">Payment Distribution</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="chart-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Total Spent</span>
            <span className="stat-value">
              {formatCurrency(data.reduce((sum, item) => sum + item.amount, 0))}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Monthly</span>
            <span className="stat-value">
              {formatCurrency(data.reduce((sum, item) => sum + item.amount, 0) / data.length || 0)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Highest Month</span>
            <span className="stat-value">
              {formatCurrency(Math.max(...data.map(item => item.amount)))}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Lowest Month</span>
            <span className="stat-value">
              {formatCurrency(Math.min(...data.map(item => item.amount)))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryChart;
