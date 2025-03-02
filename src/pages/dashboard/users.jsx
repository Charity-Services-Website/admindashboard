import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Button,
} from "@material-tailwind/react";

export function Tables() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users/exclude-admin")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users data!", error);
      });
  }, []);

  const handleStatusChange = (userId, status) => {
    setEditingUser(userId);
    setNewStatus(status);
  };

  const updateStatus = (userId) => {
    if (!newStatus) {
      alert("Please select a valid status.");
      return;
    }

    axios
      .put("http://localhost:4000/api/users/update-status", {
        userId: userId,
        status: newStatus,
      })
      .then((response) => {
        alert(response.data.message);
        // Update user status in state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          )
        );
        setEditingUser(null); // Close the edit modal
        setNewStatus(""); // Reset the status
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
        alert("Failed to update user status.");
      });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            جدول المستخدمين
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "المستخدمين",
                  "الوظيفة",
                  "الحالة",
                  "تاريخ التسجيل",
                  "رقم الهاتف",
                  "العنوان",
                  "",
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
              {users.map(
                (
                  {
                    id,
                    firstName,
                    lastName,
                    email,
                    role,
                    status,
                    createdAt,
                    phoneNumber,
                    address,
                  },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === users.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={email}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {firstName} {lastName}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {role}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status === "approved" ? "green" : "blue-gray"}
                          value={status}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {new Date(createdAt).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phoneNumber}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {address}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Button
                          onClick={() => handleStatusChange(id, status)}
                          variant="outlined"
                          color="blue"
                          size="sm"
                        >
                          تعديل
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

      {/* Status Update Modal */}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-700">
              تغيير حالة المستخدم
            </h3>
            <div className="mb-6">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                اختر الحالة
              </label>
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">اختر الحالة</option>
                <option value="pending">قيد الانتظار</option>
                <option value="approved">موافق</option>
              </select>
            </div>
            <div className="flex justify-between gap-4">
              <Button
                onClick={() => updateStatus(editingUser)}
                variant="gradient"
                color="green"
                className="w-full"
              >
                تحديث الحالة
              </Button>
              <Button
                onClick={() => setEditingUser(null)}
                variant="outlined"
                color="red"
                className="w-full"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tables;
