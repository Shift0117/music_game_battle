import React, { useState } from 'react';
import './App.css';

type TeamType = 0 | 1;

type Member = {
  name: string
}

type Team = {
  name: string,
  members: Array<Member>
}

function App() {
  // Array.fill を使うとシャローコピーなので teams[0] と teams[1] が同じものを参照してまずい
  const [teams, setTeams] = useState<Array<Team>>([{ name: '', members: [] }, { name: '', members: [] }]);

  const [newMembers, setNewMembers] = useState<Array<Member | null>>([null,null]);
  const onClickAddMember = (type: TeamType) => {
    const newMember = newMembers[type];
    if (newMember !== null) {
      let nextTeams = teams.slice();
      let nextNewMembers = newMembers.slice();
      nextTeams[type].members.push(newMember!);
      setTeams(nextTeams);
      nextNewMembers[type] = null;
      setNewMembers(nextNewMembers);
    }
    console.log(teams);
  };
  const memberNameTextBox = (type: TeamType) => {
    const newMember = newMembers[type];
    return <input type="text" value={newMember?.name ?? ''} onChange={event => {
      let nextNewMembers = newMembers.slice();
      nextNewMembers[type] = { name: event.target.value };
      setNewMembers(nextNewMembers);
    }}></input>;
  }
  const addMemberButton = (type: TeamType) => {
    return <button onClick={() => onClickAddMember(type)}>メンバー追加</button>;
  }
  const showMembers = (type: TeamType) => {
    return teams[type].members.map(member => <li>{member.name}</li>);
  }

  return (
    <div className="App">
      {memberNameTextBox(0)}
      {addMemberButton(0)}
      {showMembers(0)}
      {memberNameTextBox(1)}
      {addMemberButton(1)}
      {showMembers(1)}
    </div>
  );
}

export default App;
