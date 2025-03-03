import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Button,
} from "@material-tailwind/react";

export function Tables() {
  const [projects, setProjects] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/projects");
        if (!response.ok) {
          throw new Error("فشل في جلب المشاريع");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("حدث خطأ أثناء جلب المشاريع:", error);
      }
    };

    fetchProjects();
  }, []);

  // Function to update project status
  const updateProjectStatus = async (projectId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/projects/${projectId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("فشل في تحديث حالة المشروع");
      }

      const updatedProject = await response.json();

      // Update the projects state with the updated project
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? updatedProject.project : project
        )
      );

      console.log("تم تحديث حالة المشروع بنجاح:", updatedProject);
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث حالة المشروع:", error);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            جدول المشاريع
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "المعرف",
                  "الاسم",
                  "الوصف",
                  "المبلغ المطلوب",
                  "المبلغ المجموع",
                  "الحالة",
                  "تاريخ الإنشاء",
                  "الإجراءات",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map(
                (
                  {
                    id,
                    name,
                    description,
                    goal_amount,
                    collected_amount,
                    status,
                    createdAt,
                  },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === projects.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {id}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {description}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {goal_amount}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {collected_amount}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status === "pending" ? "blue-gray" : "green"}
                          value={
                            status === "pending" ? "قيد الانتظار" : "مكتمل"
                          }
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {new Date(createdAt).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Button
                          color={status === "pending" ? "green" : "blue-gray"}
                          size="sm"
                          onClick={() =>
                            updateProjectStatus(
                              id,
                              status === "pending" ? "completed" : "pending"
                            )
                          }
                        >
                          {status === "pending"
                            ? "تمكين كـ مكتمل"
                            : "تمكين كـ قيد الانتظار"}
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
