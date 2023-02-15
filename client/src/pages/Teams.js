const Teams = ({ selectedTeam, handleTeamSelectionChange }) => {
  const teamNames = ["A", "B", "C", "D"];

  return (
    <select className="form-select form-select-lg" value={selectedTeam} onChange={handleTeamSelectionChange}>
      {teamNames.map((teamName) => (
        <option key={teamName} value={teamName}>{teamName}</option>
      ))}
    </select>
  );
};

  export default Teams;