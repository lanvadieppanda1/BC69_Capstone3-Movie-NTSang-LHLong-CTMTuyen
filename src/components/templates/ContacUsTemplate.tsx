import React from "react";
import ReactDOM from "react-dom";
import { Button, Form, Input } from "antd";
import { useQuanLyNguoiDungSelector } from "../../store/quanLyNguoiDung/selector";
import {
  FacebookFilled,
  SkypeFilled,
  WechatWorkFilled,
} from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: " Vui lòng nhập ${label} !",
  types: {
    email: "Vui lòng nhập ${label} hợp lệ",
    number: "${label} không phải là số hợp lệ!",
  },
};

export const ContacUsTemplate = () => {
  const onFinish = (values) => {
    console.log("Submitted values:", values);
  };
  return (
    <div className="container mx-auto py-10 px-6 lg:px-0 bg-black h-100">
      <div className="lg:mt-[150px] md:text-[16px] text-[14px] md:pt-0 lg:mb-[150px] ">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 pr-6">
            <h2 className="text-[35px] mb-9 text-4xl font-bold text-white">
              Thông tin liên hệ
            </h2>

            <p className="text-white">
              Chúng tôi luôn sẵn lòng giúp đỡ và cung cấp thêm thông tin về các
              dịch vụ của chúng tôi. Bạn có thể liên hệ với chúng tôi qua email,
              điện thoại hoặc bằng cách điền vào biểu mẫu trên trang web của
              chúng tôi. Cảm ơn bạn đã cân nhắc đến chúng tôi!
            </p>
            <div className="mt-5">
              <a
                href="tel:0777-777-777"
                className="text-white text-[18px] font-500 hover:text-orange-400"
              >
                1900 8675 (24/7)
              </a>
            </div>
            <div className="mt-5">
              <a
                href="mailto:info@moviesite.com"
                className="text-blue-600 hover:underline"
              >
                info@moviesite.com
              </a>
            </div>
            <ul className="flex gap-10 mt-5">
              <li>
                <FacebookFilled className="text-white text-[30px] cursor-pointer hover:text-orange-400" />
              </li>
              <li>
                <WechatWorkFilled className="text-white text-[30px] cursor-pointer hover:text-orange-400" />
              </li>
              <li>
                <SkypeFilled className="text-white text-[30px] cursor-pointer hover:text-orange-400" />
              </li>
            </ul>
          </div>

          <div className="lg:w-1/2 w-full">
            <Form
              {...layout}
              name="contact"
              onFinish={onFinish}
              style={{ maxWidth: 800 }}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["user", "name"]}
                label={<span style={{ color: "white" }}>Họ và tên</span>}
                rules={[{ required: true }]}
              >
                <Input className="w-full py-2 px-3 rounded-md border-none bg-gray-600" />
              </Form.Item>

              <Form.Item
                className=""
                name={["user", "email"]}
                label={<span style={{ color: "white" }}>Email</span>}
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Vui lòng nhập email hợp lệ!",
                  },
                ]}
              >
                <Input className="w-full py-2 px-3 rounded-md border-none bg-gray-600" />
              </Form.Item>

              <Form.Item
                name={["introduction", "introduction"]}
                label={<span style={{ color: "white" }}>Tiêu đề</span>}
              >
                <Input.TextArea className="w-full py-2 px-3 rounded-md border-none bg-gray-600" />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
