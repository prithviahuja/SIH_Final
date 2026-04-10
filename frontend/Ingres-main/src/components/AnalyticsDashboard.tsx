"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Droplets,
  MapPin,
  BarChart3,
  Calendar,
} from "lucide-react";

const AnalyticsDashboard = () => {
  const [animateBars, setAnimateBars] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2024-2025");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimateBars(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);
			
			
			
			


  const rechargedata = {
    "2024-2025":{
      rainfall_monsoon: 127.76,
      other_monsoon: 50.43,
      rainfall_nonmonsoon: 17.77,
      other_nonmonsoon: 39.25,
    },
    "2022-2023":{
      rainfall_monsoon: 245.66,
      other_monsoon: 85.86,
      rainfall_nonmonsoon: 25.12,
      other_nonmonsoon: 92.43,
    },
    "2021-2022":{
        rainfall_monsoon: 241.34,
      other_monsoon: 82.3,
      rainfall_nonmonsoon: 24.87,
      other_nonmonsoon: 89.09,
    },
    "2019-2020":{
      rainfall_monsoon: 204.18,
      other_monsoon: 91.47,
      rainfall_nonmonsoon: 19.61,
      other_nonmonsoon: 100.9,
    }
  }
  // Example data for multiple financial years
  const yearlyData = {
    "2024-2025": [
      { state: "ARUNACHAL PRADESH", state_extraction: 0.4 },
      { state: "ASSAM", state_extraction: 14.2 },
      { state: "BIHAR", state_extraction: 46.19 },
      { state: "CHANDIGARH", state_extraction: 68.32 },
      { state: "CHHATTISGARH", state_extraction: 48.18 },
      { state: "DADRA AND NAGAR HAVELI", state_extraction: 46.78 },
      { state: "DAMAN AND DIU", state_extraction: 33.14 },
      { state: "DELHI", state_extraction: 92.1 },
      { state: "GOA", state_extraction: 23.3 },
      { state: "GUJARAT", state_extraction: 56.15 },
      { state: "HARYANA", state_extraction: 136.75 },
      { state: "JAMMU AND KASHMIR", state_extraction: 24.73 },
      { state: "JHARKHAND", state_extraction: 32.84 },
      { state: "KERALA", state_extraction: 50 },
      { state: "LADAKH", state_extraction: 30.93 },
      { state: "LAKSHDWEEP", state_extraction: 57.79 },
      { state: "MANIPUR", state_extraction: 9.09 },
      { state: "MEGHALAYA", state_extraction: 5.24 },
      { state: "MIZORAM", state_extraction: 4.03 },
      { state: "NAGALAND", state_extraction: 4.72 },
      { state: "PUDUCHERRY", state_extraction: 75.98 },
      { state: "PUNJAB", state_extraction: 156.36 },
      { state: "RAJASTHAN", state_extraction: 147.62 },
      { state: "SIKKIM", state_extraction: 5.87 },
      { state: "TAMILNADU", state_extraction: 71.09 },
      { state: "TELANGANA", state_extraction: 46.86 },
      { state: "TRIPURA", state_extraction: 10.06 },
      { state: "UTTARAKHAND", state_extraction: 53.92 },
      { state: "WEST BENGAL", state_extraction: 45.13 },
    ],
  "2022-2023": [
    { state: "ANDAMAN AND NICOBAR ISLANDS", state_extraction: 1.37 },
    { state: "ANDHRA PRADESH", state_extraction: 28.3 },
    { state: "ARUNACHAL PRADESH", state_extraction: 0.42 },
    { state: "ASSAM", state_extraction: 12.58 },
    { state: "BIHAR", state_extraction: 44.76 },
    { state: "CHANDIGARH", state_extraction: 75.41 },
    { state: "CHHATTISGARH", state_extraction: 47.17 },
    { state: "DADRA AND NAGAR HAVELI", state_extraction: 131.53 },
    { state: "DAMAN AND DIU", state_extraction: 170.7 },
    { state: "DELHI", state_extraction: 99.13 },
    { state: "GOA", state_extraction: 21.37 },
    { state: "GUJARAT", state_extraction: 51.68 },
    { state: "HARYANA", state_extraction: 135.74 },
    { state: "HIMACHAL PRADESH", state_extraction: 34.95 },
    { state: "JAMMU AND KASHMIR", state_extraction: 24.2 },
    { state: "JHARKHAND", state_extraction: 31.38 },
    { state: "KARNATAKA", state_extraction: 66.26 },
    { state: "KERALA", state_extraction: 54.55 },
    { state: "LADAKH", state_extraction: 37.05 },
    { state: "LAKSHDWEEP", state_extraction: 61.72 },
    { state: "MADHYA PRADESH", state_extraction: 58.75 },
    { state: "MAHARASHTRA", state_extraction: 53.83 },
    { state: "MANIPUR", state_extraction: 7.99 },
    { state: "MEGHALAYA", state_extraction: 4.58 },
    { state: "MIZORAM", state_extraction: 3.7 },
    { state: "NAGALAND", state_extraction: 3.76 },
    { state: "ODISHA", state_extraction: 46.33 },
    { state: "PUDUCHERRY", state_extraction: 70.27 },
    { state: "PUNJAB", state_extraction: 163.76 },
    { state: "RAJASTHAN", state_extraction: 148.77 },
    { state: "SIKKIM", state_extraction: 5.54 },
    { state: "TAMILNADU", state_extraction: 73.77 },
    { state: "TELANGANA", state_extraction: 38.65 },
    { state: "TRIPURA", state_extraction: 9.92 },
    { state: "UTTAR PRADESH", state_extraction: 70.76 },
    { state: "UTTARAKHAND", state_extraction: 51.69 },
    { state: "WEST BENGAL", state_extraction: 44.81 }
  ],

  "2021-2022": [
    { state: "ANDAMAN AND NICOBAR ISLANDS", state_extraction: 1.36 },
    { state: "ANDHRA PRADESH", state_extraction: 28.81 },
    { state: "ARUNACHAL PRADESH", state_extraction: 0.79 },
    { state: "ASSAM", state_extraction: 12.38 },
    { state: "BIHAR", state_extraction: 44.94 },
    { state: "CHANDIGARH", state_extraction: 80.99 },
    { state: "CHHATTISGARH", state_extraction: 49.58 },
    { state: "DADRA AND NAGAR HAVELI", state_extraction: 133.2 },
    { state: "DAMAN AND DIU", state_extraction: 157.93 },
    { state: "DELHI", state_extraction: 98.16 },
    { state: "GOA", state_extraction: 23.63 },
    { state: "GUJARAT", state_extraction: 53.23 },
    { state: "HARYANA", state_extraction: 134.14 },
    { state: "HIMACHAL PRADESH", state_extraction: 37.56 },
    { state: "JAMMU AND KASHMIR", state_extraction: 24.18 },
    { state: "JHARKHAND", state_extraction: 31.35 },
    { state: "KARNATAKA", state_extraction: 69.93 },
    { state: "KERALA", state_extraction: 52.56 },
    { state: "LADAKH", state_extraction: 41.36 },
    { state: "LAKSHDWEEP", state_extraction: 61.6 },
    { state: "MADHYA PRADESH", state_extraction: 59.1 },
    { state: "MAHARASHTRA", state_extraction: 54.68 },
    { state: "MANIPUR", state_extraction: 7.95 },
    { state: "MEGHALAYA", state_extraction: 3.55 },
    { state: "MIZORAM", state_extraction: 3.96 },
    { state: "NAGALAND", state_extraction: 2.89 },
    { state: "ODISHA", state_extraction: 44.25 },
    { state: "PUDUCHERRY", state_extraction: 69.17 },
    { state: "PUNJAB", state_extraction: 164.11 },
    { state: "RAJASTHAN", state_extraction: 151.07 },
    { state: "SIKKIM", state_extraction: 6.04 },
    { state: "TAMILNADU", state_extraction: 75.57 },
    { state: "TELANGANA", state_extraction: 41.6 },
    { state: "TRIPURA", state_extraction: 9.7 },
    { state: "UTTAR PRADESH", state_extraction: 70.66 },
    { state: "UTTARAKHAND", state_extraction: 48.04 },
    { state: "WEST BENGAL", state_extraction: 47.01 }
  ],
    "2019-2020": [
    { state: "ANDAMAN AND NICOBAR ISLANDS", state_extraction: 2.6 },
    { state: "ANDHRA PRADESH", state_extraction: 33.26 },
    { state: "ARUNACHAL PRADESH", state_extraction: 0.36 },
    { state: "ASSAM", state_extraction: 0 },
    { state: "BIHAR", state_extraction: 56.53 },
    { state: "CHANDIGARH", state_extraction: 80.6 },
    { state: "CHHATTISGARH", state_extraction: 0.75 },
    { state: "DADRA AND NAGAR HAVELI", state_extraction: 46 },
    { state: "DAMAN AND DIU", state_extraction: 113.38 },
    { state: "DELHI", state_extraction: 1.01 },
    { state: "GOA", state_extraction: 23.48 },
    { state: "GUJARAT", state_extraction: 53.39 },
    { state: "HARYANA", state_extraction: 134.56 },
    { state: "HIMACHAL PRADESH", state_extraction: 36.77 },
    { state: "JAMMU AND KASHMIR", state_extraction: 0.21 },
    { state: "JHARKHAND", state_extraction: 29.13 },
    { state: "KARNATAKA", state_extraction: 64.85 },
    { state: "KERALA", state_extraction: 0.01 },
    { state: "LADAKH", state_extraction: 0.18 },
    { state: "LAKSHDWEEP", state_extraction: 58.47 },
    { state: "MADHYA PRADESH", state_extraction: 56.82 },
    { state: "MAHARASHTRA", state_extraction: 54.9 },
    { state: "MANIPUR", state_extraction: 5.12 },
    { state: "MEGHALAYA", state_extraction: 4.22 },
    { state: "MIZORAM", state_extraction: 3.81 },
    { state: "NAGALAND", state_extraction: 1.04 },
    { state: "ODISHA", state_extraction: 0.54 },
    { state: "PUDUCHERRY", state_extraction: 76.02 },
    { state: "PUNJAB", state_extraction: 164.42 },
    { state: "RAJASTHAN", state_extraction: 150.22 },
    { state: "SIKKIM", state_extraction: 0.86 },
    { state: "TAMILNADU", state_extraction: 82.93 },
    { state: "TELANGANA", state_extraction: 53.32 },
    { state: "TRIPURA", state_extraction: 0.08 },
    { state: "UTTAR PRADESH", state_extraction: 68.83 },
    { state: "WEST BENGAL", state_extraction: 44.6 }
  ],
 
  };

  const data = yearlyData[selectedYear];

  // Filter numeric values for chart
  const chartData = data
    .filter((d) => d.state_extraction !== "-")
    .map((d) => ({
      state: d.state,
      value: Number(d.state_extraction),
    }));

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <section className="py-16 bg-muted/20 w-full">
      <div className="container mx-auto px-4 w-full">
        <div className="flex-row text-center mb-6">
          <h2 className="ml-2 text-3xl md:text-4xl font-bold mb-2 flex justify-between">
            Analytics Dashboard
            <div className="text-sm ">
              <div className="mt-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border px-3 py-2 rounded-md"
            >
              {Object.keys(yearlyData).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            </div>
            </div>
          </h2>
          
          <p className="-ml-20 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive insights and trends in India's groundwater data
          </p>

          {/* Year Selector */}
          
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">National Average</p>
                <p className="text-2xl font-bold">62.4%</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                  <span className="text-xs text-destructive">
                    -1.2% from last year
                  </span>
                </div>
              </div>
              <Droplets className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">States Monitored</p>
                <p className="text-2xl font-bold">{chartData.length}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-accent mr-1" />
                  <span className="text-xs text-accent">+2 new states</span>
                </div>
              </div>
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical States</p>
                <p className="text-2xl font-bold">5</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-destructive mr-1" />
                  <span className="text-xs text-destructive">
                    Requires attention
                  </span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-2xl font-bold">Today</p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-3 w-3 text-accent mr-1" />
                  <span className="text-xs text-accent">Real-time data</span>
                </div>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </Card>
        </div>

        {/* Chart */}
        <Card className="p-6 w-full">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-primary" />
            National Groundwater Levels ({selectedYear})
          </h3>

          <div className="w-full overflow-x-auto">
            <div
              className="h-64 grid items-end gap-1 min-w-full"
              style={{
                gridTemplateColumns: `repeat(${chartData.length}, 1fr)`,
              }}
            >
              {chartData.map((d, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-ocean rounded-t-md transition-all duration-700 ease-out"
                    style={{
                      height: animateBars
                        ? `${(d.value / maxValue) * 200}px`
                        : "0px",
                      transitionDelay: `${index * 80}ms`,
                    }}
                  ></div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium">{d.value}%</p>
                    <p className="text-xs text-muted-foreground">
                      {d.state.slice(0, 3).toUpperCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            * Average groundwater levels across monitored states
          </div>
        </Card>
          {/* Recharge Performance */}
        <div className="mt-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">
              Recharge Performance ({selectedYear})
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Rainfall during Monsoon",
                  value: rechargedata[selectedYear].rainfall_monsoon,
                  color: "bg-destructive",
                  note: "Critical levels in Punjab, Haryana",
                },
                {
                  label: "Other Sources during Monsoon",
                  value: rechargedata[selectedYear].other_monsoon,
                  color: "bg-accent",
                  note: "Good monsoon support",
                },
                {
                  label: "Rainfall during Non-Monsoon",
                  value: rechargedata[selectedYear].rainfall_nonmonsoon,
                  color: "bg-primary",
                  note: "River system benefits",
                },
                {
                  label: "Other Sources during Non-Monsoon",
                  value: rechargedata[selectedYear].other_nonmonsoon,
                  color: "bg-secondary",
                  note: "Arid climate challenges",
                },
              ].map((item, i) => {
                const maxAllowed = 100;
                const scaledWidth = Math.min(
                  (item.value / 200) * 100,
                  maxAllowed
                );

                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.value.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${scaledWidth}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.note}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;













