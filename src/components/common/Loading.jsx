import Spinner from "react-bootstrap/Spinner";

export default function Loading() {
  return (
    <div className="loader-spinner">
      <Spinner animation="border" role="status" />
    </div>
  );
}
