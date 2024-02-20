import { Divider } from "@mui/material";
import "./header.css";

const Header = ({ title, subtitle }) => {
  return (
    <>
      <div className="title">{title}</div>
      <div className="subTitle" variant="h5" component="h2">
        {subtitle}
      </div>
      <Divider sx={{ my: 2 }} />
    </>
  );
};

export default Header;
