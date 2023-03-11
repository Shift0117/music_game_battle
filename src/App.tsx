import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import { Form } from 'react-bootstrap';

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
    // return <button onClick={() => onClickAddMember(type)}>メンバー追加</button>;
    return <Button variant='outline-secondary' onClick={() => onClickAddMember(type)}>メンバー追加</Button>
  }
  const showMembers = (type: TeamType) => {
    return (
      <ListGroup>
        {teams[type].members.map(member => <ListGroup.Item>{member.name}</ListGroup.Item>)}
      </ListGroup>
    )
    // return teams[type].members.map(member => <li>{member.name}</li>);
  }

  return (
    <div className='teamTable'>
      <Container>
        <Row>
          <Col><div>
            {memberNameTextBox(0)}
            {addMemberButton(0)}
          </div></Col>
          <Col><div>
            {memberNameTextBox(1)}
            {addMemberButton(1)}
          </div></Col>
        </Row>
        <Row>
          <Col>{showMembers(0)}</Col>
          <Col>{showMembers(1)}</Col>
        </Row>
      </Container>
    </div>
  );
}

function Versus(teams: Teams) {
  const scoreForm = (i:number) =>  (<Row>
    <Col className='border-right border-secondary'>
      <Form>
        <Form.Group>
          <Form.Control placeholder='スコア'></Form.Control>
        </Form.Group>
      </Form>
    </Col>
    <Col className='border-right border-secondary'>
      <Form>
        <Form.Group>
          <Form.Control placeholder='曲名'></Form.Control>
        </Form.Group>
      </Form>
    </Col>
    <Col>
      <Form>
        <Form.Group>
          <Form.Control placeholder='スコア'></Form.Control>
        </Form.Group>
      </Form>
    </Col>
  </Row>);
  function renderVersus(members: Members) {
    return <div className='versus-table'>
      <Container className='border border-solid border-2'>
        <Row>
          <Col className='border-right border-secondary'>{members[0].name}</Col>
          <Col className='border-right border-secondary'>VS</Col>
          <Col>{members[1].name}</Col>
        </Row>
        {scoreForm(0)}
        {scoreForm(1)}
        {scoreForm(2)}
      </Container>
    </div>
    // return <div>
    //   <div className='versus-row'>
    //     <label>{members[0].name}</label>
    //     <label>VS</label>
    //     <label>{members[1].name}</label>
    //   </div>
    // </div>
  }
  const minLength = Math.min(teams[0].members.length, teams[1].members.length);
  const zippedArray = Array.from({ length: minLength }, (_, i) => [teams[0].members[i], teams[1].members[i]]);
  return Array.from({ length: minLength }, (_, i) => i).map(i => renderVersus([teams[0].members[i], teams[1].members[i]]));
  // return <div className='versusTable'>
  //   <Table bordered>
  //     <thead>
  //       <tr>
  //         <th>
  //           チームA
  //         </th>
  //         <th>
  //           チームB
  //         </th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {zippedArray.map(([a, b]) => (
  //         <tr>
  //           <td>{a.name}</td>
  //           <td>{b.name}</td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </Table>
  // </div>;
}


export default function App() {
  const [teams, setTeams] = useState<Teams>([{ name: '', members: [] }, { name: '', members: [] }]);
  return <div className='App'>
    <Container>
      <Row>
        <Col>{TeamTable(teams, setTeams)}
        </Col>
      </Row>
    </Container>
    {Versus(teams)} 
  </div>;
}