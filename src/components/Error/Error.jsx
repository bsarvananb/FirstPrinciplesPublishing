import { ExclamationCircleTwoTone } from "@ant-design/icons";
import "./error.css";

const Error = () => (
  <div className="error" data-testid="error">
    <div>
      <ExclamationCircleTwoTone twoToneColor="red" className="danger-icon" />
      <p className="error-label">Something went wrong!</p>
    </div>
  </div>
);

export default Error;
