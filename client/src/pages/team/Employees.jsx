import Teams from "./TeamsDropdown";
import TeamMembers from "./TeamMembers";
import { Button } from "react-bootstrap";

const Employees = ({
  employees,
  selectedTeam,
  handleEmployeeCardClick,
  handleTeamSelectionChange,
  teams,
}) => {
  return (
    <main className="container">
      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-md-6 align-items-center">
          <Teams
            selectedTeam={selectedTeam}
            handleTeamSelectionChange={handleTeamSelectionChange}
            teams={teams}
          />
        </div>
      </div>

      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-8">
          <div className="card-collection">
            <TeamMembers
              employees={employees.filter(
                (employee) => employee.teamName === selectedTeam
              )}
              handleEmployeeCardClick={handleEmployeeCardClick}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Employees;
