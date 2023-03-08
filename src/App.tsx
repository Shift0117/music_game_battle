import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

type Member = {
  name:string
}

type Team = {
  name: string,
  members:Array<Member>
}

function App() {
  const [teams, teamsState] = useState<Map<string,Team>>(new Map());
  const [newTeam, newTeamState] = useState<Team | null>(null);
  const [currentTeam, currentTeamState] = useState<{value:string,label:string} | null>(null);
  const [newMember,newMemberState] = useState<Member | null>(null);
  const onClickAddTeam = () => {
    let newTeams = teams;
    if (newTeam !== null) {
      newTeams.set(newTeam.name, {members: newTeam.members,name:newTeam.name });
    }
    teamsState(newTeams);
    newTeamState(null);
  }
  const onClickAddMember = () => {
    if (currentTeam !== null && newMember !== null && teams.get(currentTeam.value) !== null) {
      let newTeams = teams;
      let newCurrentTeamMembers = newTeams.get(currentTeam.value)!;
      newCurrentTeamMembers.members.push(newMember);
      newTeams.set(currentTeam.value, newCurrentTeamMembers);
      teamsState(newTeams);
    }
    console.log(teams.get(currentTeam?.value!));

  }
  const TeamSelectMenu = (teams: Map<string,Team>) => {
    const options = Array.from(teams).map(team => ({ value: team[0], label: team[0] }));
    return <Select options={options} value={currentTeam} onChange={(event) => { currentTeamState(event); console.log(event); }} />;
  }

  return (
    <div className="App">
      {TeamSelectMenu(teams)}
      <input value={newTeam?.name ?? ''} onChange={event => newTeamState({ name: event.target.value, members: [] })}></input>
      <button onClick={onClickAddTeam}>チーム追加</button>
      <input value={newMember?.name ?? ''} onChange={event => newMemberState({ name: event.target.value})}></input>
      <button onClick={onClickAddMember}>メンバー追加</button>
      
    </div>
  );
}

export default App;
