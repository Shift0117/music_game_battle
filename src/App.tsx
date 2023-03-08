import React, { useState } from 'react';
import './App.css';

type TeamType = 'A' | 'B';

type Member = {
  name: string
}

type Team = {
  name: string,
  members: Array<Member>
}

function App() {
  const [teamA, setTeamA] = useState<Team>({ name: '', members: [] });
  const [teamB, setTeamB] = useState<Team>({ name: '', members: [] });

  const [newMemberA, setNewMemberA] = useState<Member | null>(null);
  const [newMemberB, setNewMemberB] = useState<Member | null>(null);

  const onClickAddMember = (type: TeamType) => {
    let team;
    let newMember;
    let setTeam;
    let setNewMember;
    if (type === 'A') {
      team = teamA;
      newMember = newMemberA;
      setTeam = setTeamA;
      setNewMember = setNewMemberA;
    }
    else {
      team = teamB;
      newMember = newMemberB;
      setTeam = setTeamB;
      setNewMember = setNewMemberB;
    }
    if (newMember !== null) {
      let nextTeam = team;
      let nextNewMember : Member | null = newMember;
      nextTeam.members.push(newMember!);
      setTeam(nextTeam);
      nextNewMember = null;
      setNewMember(nextNewMember);
    }
    console.log(team);
  };
  const memberNameTextBox = (type: TeamType) => {
    let newMember: Member | null;
    let setNewMember: (member: Member) => void;
    if (type === 'A') {
      newMember = newMemberA;
      setNewMember = setNewMemberA;
    }
    else {
      newMember = newMemberB;
      setNewMember = setNewMemberB;
    }
    return <input type="text" value={newMember?.name ?? ''} onChange={event => {
      let nextNewMember = newMember;
      nextNewMember = { name: event.target.value };
      setNewMember(nextNewMember);
    }}></input>;
  }
  const addMemberButton = (type: TeamType) => {
    return <button onClick={() => onClickAddMember(type)}>メンバー追加</button>;
  }
  const showMembers = (type: TeamType) => {
    let team;
    if (type === 'A') {
      team = teamA;
    } else {
      team = teamB;
    }
    return team.members.map(member => <li>{member.name}</li>);
  }
  
  return (
    <div className="App">
      {memberNameTextBox('A')}
      {addMemberButton('A')}
      {showMembers('A')}
      {memberNameTextBox('B')}
      {addMemberButton('B')}
      {showMembers('B')}
    </div>
  );
}

export default App;
