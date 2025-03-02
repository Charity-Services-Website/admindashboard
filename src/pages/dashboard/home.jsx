import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsChartsData } from "@/data";
import { ClockIcon } from "@heroicons/react/24/solid";
import { FaDollarSign, FaUsers } from "react-icons/fa";

export function Home() {
  const [totalDonations, setTotalDonations] = useState(null);
  const [userCount, setUserCount] = useState(null);

  // Fetch the total donations and user count data
  useEffect(() => {
    // Fetch total donations
    const fetchTotalDonations = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/donors/total-donations"
        );
        const data = await response.json();
        setTotalDonations(data.totalDonations);
      } catch (error) {
        console.error("Error fetching total donations:", error);
      }
    };

    // Fetch user count
    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/users/count");
        const data = await response.json();
        setUserCount(data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchTotalDonations();
    fetchUserCount();
  }, []);

  return (
    <div className="mt-12 rtl">
      {" "}
      {/* Add rtl class to support Arabic */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        {/* إجمالي التبرعات */}
        <StatisticsCard
          title="إجمالي التبرعات"
          icon={<FaDollarSign className="w-6 h-6 text-white" />}
          value={
            totalDonations !== null
              ? `د.أ ${totalDonations}`
              : "جارٍ التحميل..."
          }
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">إجمالي</strong> التبرعات
            </Typography>
          }
        />
        {/* عدد المستخدمين */}
        <StatisticsCard
          title="عدد المستخدمين"
          icon={<FaUsers className="w-6 h-6 text-white" />}
          value={userCount !== null ? userCount : "جارٍ التحميل..."}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-blue-500">إجمالي</strong> المستخدمين
            </Typography>
          }
        />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon
                  strokeWidth={2}
                  className="h-4 w-4 text-blue-gray-400"
                />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
