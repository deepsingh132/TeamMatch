const Header = ({selectedTeam, teamMemberCount}) => {

    return (
      <header className="container">
        <div className="row justify-content-center mt-3 mb-4">
          <div className="col-8">
            <b>
              <h1>TeamMatch</h1>
            </b>
            <h3>
              Team {selectedTeam} has {teamMemberCount}{" "}
              {teamMemberCount === 1 ? "member" : "members"}
            </h3>
          </div>
        </div>
      </header>
    );
}

export default Header;