import Teams from "./TeamsDropdown";
import TeamMembers from "./TeamMembers";

const Employees = ({
  employees,
  selectedTeam,
  handleEmployeeCardClick,
  handleTeamSelectionChange,
  username,
}) => {

  return (
    <main className="container">
      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-md-6 align-items-center">
          <Teams
            selectedTeam={selectedTeam}
            handleTeamSelectionChange={handleTeamSelectionChange}
            username={username}
            handleEmployeeCardClick={handleEmployeeCardClick}
          />
        </div>
      </div>

      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-9">
          <div className="card-collection">
            <TeamMembers
              key={employees.id}
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
