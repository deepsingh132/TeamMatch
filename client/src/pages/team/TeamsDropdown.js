import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Teams = ({ selectedTeam, handleTeamSelectionChange, username }) => {

  const teamNames = ["A", "B", "C", "D"];
  const navigate = useNavigate();
  console.log(username);

  const handleBtn = () => {
    navigate('/createteam', {state: {username}} );
  }



  return (
    <div class="d-flex align-items-center">
      <select
        className="form-select form-select-lg mb-3 text-center align-items-center"
        value={selectedTeam}
        onChange={handleTeamSelectionChange}
      >
        {teamNames.map((teamName) => (
          <option key={teamName} value={teamName}>
            {teamName}
          </option>
        ))}
      </select>

      <Button
        variant="primary"
        className="btn btn-primary ms-5 mb-3"
        style={{ whiteSpace: "nowrap" }}
        onClick={handleBtn}
      >
        Add Employee
      </Button>
    </div>
  );
};

  export default Teams;