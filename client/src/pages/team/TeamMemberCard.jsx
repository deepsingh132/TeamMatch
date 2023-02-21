import { Buffer } from "buffer";
import femaleProfile from "../../images/femaleProfile.png";
import maleProfile from "../../images/maleProfile.png";

const TeamMemberCard = ({ employee, handleEmployeeCardClick }) => {
  return (
    <div
      key={employee.id}
      id={employee.id}
      className="card border-0 shadow m-2"
      style={{ cursor: "pointer" }}
      onClick={handleEmployeeCardClick}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {employee.img ? (
          <img
            className="card-img-top"
            alt="img"
            src={`data:${employee.img.contentType};base64,${Buffer.from(
              employee.img.data
            ).toString("base64")}`}
            style={{ objectFit: "cover", height: "17rem" }}
          />
        ) : (
          <img
            className="card-img-top"
            alt="img"
            src={employee.gender === "female" ? femaleProfile : maleProfile}
          />
        )}
        <div
          className="card-body"
          style={{ height: "100%" , alignSelf:"center", marginTop: "1rem"}}
        >
          <h5 className="card-title">
            <span style={{ fontWeight: "600" }}>Full Name:</span>{" "}
            {employee.fullName}
          </h5>
          <p className="card-text">
            <b>Designation:</b> {employee.designation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
