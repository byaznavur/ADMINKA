import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFaundPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={() => navigate("/login")} type="primary">
            Back Login
          </Button>
        }
      />
    </div>
  );
};

export default NotFaundPage;
