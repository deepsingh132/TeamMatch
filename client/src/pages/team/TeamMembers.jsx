import TeamMemberCard from "./TeamMemberCard";

const TeamMembers = ({ employees, handleEmployeeCardClick }) => {
  return employees.map((employee) => (
    <TeamMemberCard
      employee={employee}
      handleEmployeeCardClick={handleEmployeeCardClick}
    />
  ));
};

export default TeamMembers;
