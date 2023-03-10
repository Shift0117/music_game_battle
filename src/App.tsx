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

type Teams = [Team, Team];
type Members = [Member, Member];

function TeamTable(teams: Teams, setTeams: (teams: [Team, Team]) => void
) {
  // Array.fill を使うとシャローコピーなので teams[0] と teams[1] が同じものを参照してまずい
  const [newMembers, setNewMembers] = useState<[Member | null, Member | null]>([null, null]);

  const onClickAddMember = (type: TeamType) => {
    const newMember = newMembers[type];
    if (newMember !== null) {
      let nextTeamsArray = teams.slice();

      // ここの書き方絶対もっといいのあるけど分からない
      let nextTeams: [Team, Team] = [nextTeamsArray[0], nextTeamsArray[1]];
      let nextNewMembersArray = newMembers.slice();
      let nextNewMembers: [Member | null, Member | null] = [nextNewMembersArray[0], nextNewMembersArray[1]];
      nextTeams[type].members.push(newMember!);
      setTeams(nextTeams);
      nextNewMembers[type] = null;
      setNewMembers(nextNewMembers);
    }
  };
  const memberNameTextBox = (type: TeamType) => {
    const newMember = newMembers[type];
    return <input type="text" value={newMember?.name ?? ''} onChange={event => {
      let nextNewMembersArray = newMembers.slice();
      let nextNewMembers: [Member | null, Member | null] = [nextNewMembersArray[0], nextNewMembersArray[1]];
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
    <div>
      <div className="TeamTable">
        {memberNameTextBox(0)}
        {addMemberButton(0)}
        {showMembers(0)}
      </div>
      <div className="TeamTable">
        {memberNameTextBox(1)}
        {addMemberButton(1)}
        {showMembers(1)}
      </div>
    </div>
  );
}

// function Versus()


export default function App() {
  const [teams, setTeams] = useState<Teams>([{ name: '', members: [] }, { name: '', members: [] }]);
  return <div className='App'>
    {TeamTable(teams, setTeams)}
  </div>;
}