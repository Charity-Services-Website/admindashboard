import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";

export function Tables() {
  const [messages, setMessages] = useState([]);
  const [replyMessages, setReplyMessages] = useState({});

  useEffect(() => {
    // جلب الرسائل من API
    axios
      .get("http://localhost:4000/api/contact-messages")
      .then((response) => {
        setMessages(response.data); // تخزين الرسائل المستلمة
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء جلب الرسائل!", error);
      });
  }, []);

  const handleReply = (email) => {
    const replyMessage = replyMessages[email];

    if (!replyMessage) {
      alert("الرجاء إدخال رسالة رد!");
      return;
    }

    axios
      .post("http://localhost:4000/api/contact-messages/reply", {
        email: email,
        replyMessage: replyMessage,
      })
      .then((response) => {
        alert("تم إرسال الرد بنجاح!");
        // مسح الحقل بعد الإرسال
        setReplyMessages((prev) => ({
          ...prev,
          [email]: "", // إعادة تعيين الرد لهذا البريد الإلكتروني
        }));
      })
      .catch((error) => {
        console.error("خطأ في إرسال الرد:", error);
        alert("حدث خطأ أثناء إرسال الرد.");
      });
  };

  const handleInputChange = (email, value) => {
    setReplyMessages((prev) => ({ ...prev, [email]: value }));
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            جدول الرسائل
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto text-right">
            <thead>
              <tr>
                {[
                  "الاسم",
                  "البريد الإلكتروني",
                  "الرسالة",
                  "التاريخ",
                  "الرد",
                  "",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-right"
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
              {messages.map(({ name, email, description, createdAt }, key) => {
                const className = `py-3 px-5 ${key === messages.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                return (
                  <tr key={email}>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {name}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {email}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {description}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {new Date(createdAt).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Button
                        color="light-blue"
                        size="sm"
                        onClick={() => handleReply(email)}
                      >
                        إرسال الرد
                      </Button>
                    </td>
                    <td className={className}>
                      <Input
                        type="text"
                        value={replyMessages[email] || ""}
                        onChange={(e) =>
                          handleInputChange(email, e.target.value)
                        }
                        placeholder="أدخل ردك هنا"
                        className="w-full text-right"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
