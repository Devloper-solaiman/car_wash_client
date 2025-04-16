import { useTheme } from 'next-themes';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface OverviewChartProps {
  data: { name: string; sales: number; revenue: number }[];
}

const OverviewChart = ({ data }: OverviewChartProps) => {
  const { theme } = useTheme();
  return (
    <div className="bg-default-50 p-5 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-default-800 mb-2">
        Sales Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          {/* Grid Customization */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={`${theme === 'light' ? '#e0e0e0' : '#121219'}`}
          />

          {/* Axes Customization */}
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis stroke="#F5A524" tickFormatter={(value) => `৳${value}`} />

          {/* Tooltip Customization */}
          <Tooltip
            contentStyle={{
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
            }}
            formatter={(value: number, name: string) => [
              `৳${value}`,
              name.charAt(0).toUpperCase() + name.slice(1),
            ]}
            labelStyle={{ color: '#8884d8', fontWeight: 'bold' }}
          />

          {/* Legend */}
          <Legend verticalAlign="top" height={36} iconType="circle" />

          {/* Line for Sales */}
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#F5A524"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#F5A524' }}
            activeDot={{ r: 6 }}
            name="Sales"
          />

          {/* Line for Revenue with Gradient */}
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="url(#revenueGradient)"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#82ca9d' }}
            activeDot={{ r: 6 }}
            name="Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;
