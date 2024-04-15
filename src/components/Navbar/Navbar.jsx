import { MoneyCollectTwoTone } from "@ant-design/icons";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar" data-testid="navbar">
      <MoneyCollectTwoTone twoToneColor="#fff" className="navbar-icon" />
      <p className="navbar-brand">WealthWoo</p>
    </div>
  );
};

export default Navbar;
