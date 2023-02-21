import TeamMemberCard from "./TeamMemberCard";

const TeamMembers = ({ employees, handleEmployeeCardClick }) => {

   //const { selectedEmployee } = this.state;


  return employees.map((employee) =>
  (

    <TeamMemberCard
      key={employee.id}
      employee={employee}
      handleEmployeeCardClick={ () => handleEmployeeCardClick(employee)}
    />
  )
  );
};

export default TeamMembers;
