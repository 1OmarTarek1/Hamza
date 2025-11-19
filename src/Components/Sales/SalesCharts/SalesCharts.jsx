import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Area,
  AreaChart
} from 'recharts';
import './SalesCharts.css';

// Helper function to get start of month
const getStartOfMonth = (date) => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Helper function to format month as M/YYYY
const formatMonth = (date) => {
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getFullYear()}`;
};

// Helper function: generate fake months
const generateFakeMonths = (monthsBack = 6) => {
  const now = new Date();
  const result = [];

  for (let i = monthsBack; i >= 1; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({
      name: formatMonth(d),
      value: Math.floor(Math.random() * 80) + 20, // قيم عشوائية بين 20 و 100
    });
  }

  return result;
};

const SalesCharts = ({ sales = [] }) => {
  // Process data for charts
  const processSalesData = () => {
    if (!sales || !sales.length) {
      // لو مفيش مبيعات، رجع بس الداتا المزيفة
      return {
        barData: [],
        pieData: [],
        lineData: generateFakeMonths(6),
      };
    }

    // Data for Bar Chart (Sales by Product Type)
    const typeSales = {};
    
    // Data for Pie Chart (Sales by Color)
    const colorSales = {};
    
    // Data for Line Chart (Monthly Sales)
    const monthlySales = {};

    sales.forEach(sale => {
      // Process by product type
      const typeName = sale.product?.typeName || 'غير معروف';
      typeSales[typeName] = (typeSales[typeName] || 0) + (sale.quantity || 0);
      
      // Process by color (with colorCode)
      const colorName = sale.product?.colorName || 'غير معروف';
      const colorCode = sale.product?.colorCode || '#ccc';
      if (!colorSales[colorName]) {
        colorSales[colorName] = { value: 0, colorCode };
      }
      colorSales[colorName].value += (sale.quantity || 0);
      
      // Process monthly sales
      if (sale.createdAt) {
        const saleDate = new Date(sale.createdAt);
        const monthStart = getStartOfMonth(saleDate);
        const monthKey = monthStart.toISOString().split('T')[0];
        
        if (!monthlySales[monthKey]) {
          monthlySales[monthKey] = {
            date: monthStart,
            value: 0
          };
        }
        monthlySales[monthKey].value += (sale.quantity || 0);
      }
    });

    // Convert monthly sales to array and sort by date
    let sortedMonthlySales = Object.values(monthlySales)
      .sort((a, b) => a.date - b.date)
      .map(month => ({
        name: formatMonth(month.date),
        value: month.value
      }));

    // دمج الداتا المزيفة مع الحقيقية
    const fakeMonths = generateFakeMonths(6);
    const merged = [...fakeMonths, ...sortedMonthlySales];

    // إزالة التكرار (لو الشهر موجود مرتين)
    const uniqueMonths = Array.from(
      new Map(merged.map(item => [item.name, item])).values()
    );

    return {
      barData: Object.entries(typeSales).map(([name, value]) => ({ name, value })),
      pieData: Object.entries(colorSales).map(([name, data]) => ({
        name,
        value: data.value,
        colorCode: data.colorCode
      })),
      lineData: uniqueMonths
    };
  };

  const { barData = [], pieData = [], lineData = [] } = processSalesData();

  if (!sales || sales.length === 0) {
    return <div className="no-data">لا توجد بيانات مبيعات لعرضها</div>;
  }

return (
    <div className="sales-charts-container">
        <h2 className="charts-title">لوحة تحليل المبيعات</h2>
        
        {/* Line Chart - Monthly Sales */}
        <div className="chart-container">
        <h3>المبيعات الشهرية</h3>
        <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
            <AreaChart 
            data={lineData}
            margin={{ top: 10, right: 25, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis 
                tick={{ fontSize: 11 }}
                tickMargin={25}
                width={35}
                />
                <Tooltip />
                <Legend />
                <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                name="المبيعات الشهرية"
                strokeWidth={2}
                fillOpacity={0.3}
                activeDot={{ r: 6 }}
                />
            </AreaChart>
            </ResponsiveContainer>
        </div>
        </div>


        <div className="charts-grid">

            {/* Bar Chart - Sales by Product Type */}
            <div className="chart-container">
            <h3>المبيعات حسب نوع المنتج</h3>
            <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={barData}
                margin={{ top: 10, right: 25, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis 
                tick={{ fontSize: 11 }} 
                tickMargin={25}
                width={35}
                />
                <Tooltip cursor={{ fill: "rgba(200, 200, 200, 0.41)" }} />
                <Legend />
                <Bar
                dataKey="value"
                fill="#8884d8"
                name="المباع"
                barSize={40}
                activeBar={{ stroke: "var(--bg-component)", strokeWidth: 1 }}
                />
            </BarChart>
            </ResponsiveContainer>

            </div>
            </div>

            {/* Pie Chart - Sales by Color */}
            <div className="chart-container">
            <h3>توزيع المبيعات حسب اللون</h3>
            <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent, x, y }) => (
                    <text
                    x={x}
                    y={y}
                    fill="#000"
                    stroke="gray"
                    strokeWidth={0.5}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={12}
                    >
                    {`${name}: ${(percent * 100).toFixed(0)}%`}
                    </text>
                )}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                >
                {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.colorCode} />
                ))}
                </Pie>
                <Tooltip />
            </PieChart>
            </ResponsiveContainer>

            </div>
            </div>
        </div>
    </div>
);
};

export default SalesCharts;
