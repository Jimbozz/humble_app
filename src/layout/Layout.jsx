import {
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Button,
} from "react-bootstrap";
import MainNav from "./MainNav";
import ProfileCard from "./ProfileCard";

function Layout(props) {
  return (
    <div className="wrapper">
      <MainNav />
      <main className="main-content">{props.children}</main>
      <ProfileCard />
    </div>
  );
}

export default Layout;
