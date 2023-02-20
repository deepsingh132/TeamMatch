/* eslint-disable jsx-a11y/alt-text */
import { Buffer } from "buffer";
import femaleProfile from "../../images/femaleProfile.png";
import maleProfile from "../../images/maleProfile.png";

const TeamMemberCard = ({
  employee,
  handleEmployeeCardClick,
}) => {

  return (
    <div
      key={employee.id}
      id={employee.id}
      className="card border-0 shadow m-2"
      style={{ cursor: "pointer" }}
      onClick={handleEmployeeCardClick}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {employee.img ? (
          <img
            class="card-img-top"
            src={`data:${employee.img.contentType};base64,${Buffer.from(
              employee.img.data
            ).toString("base64")}`}
          />
        ) : (
          <img
            class="card-img-top"
            src={employee.gender === "female" ? femaleProfile : maleProfile}
          />
        )}
        <div className="card-body" style={{ alignSelf: "center" }}>
          <h5 className="card-title">Full Name: {employee.fullName}</h5>
          <p className="card-text">
            <b>Designation:</b> {employee.designation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
