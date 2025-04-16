import { useTheme } from 'next-themes';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface GrowthChartProps {
  salesData: { name: string; sales: number; revenue: number }[];
  revenueData: { name: string; revenue: number }[];
}

const GrowthChart = ({ salesData }: GrowthChartProps) => {
  const { theme } = useTheme();
  return (
    <div className="bg-default-50 p-5 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-default-800 mb-2">
        Sales & Revenue Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={salesData}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          {/* Grid Customization */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={`${theme === 'light' ? '#e0e0e0' : '#121219'}`}
          />

          {/* Axes Customization */}
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#F5A524"
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#82ca9d"
            tickFormatter={(value) => `$${value}`}
          />

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

          {/* Bars with Gradient */}
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F5A524" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F5A524" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          {/* Bar for Sales */}
          <Bar
            yAxisId="left"
            dataKey="sales"
            fill="url(#salesGradient)"
            radius={[5, 5, 0, 0]}
            barSize={15}
          />

          {/* Bar for Revenue */}
          <Bar
            yAxisId="right"
            dataKey="revenue"
            fill="url(#revenueGradient)"
            radius={[5, 5, 0, 0]}
            barSize={15}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default GrowthChart;
