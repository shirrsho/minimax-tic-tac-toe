import React, { useState } from 'react';
import './board.css';
import { comMove } from '../ComMove';

const Board = () => {

	const row_count = 3;
	const col_count = 3;
	// const win_count = 3;
	
	const [turn, setTurn] = useState('r');
	const [cells, setCells] = useState(Array(row_count*col_count).fill(''));
	const [winner, setWinner] = useState('');
	const [str, setStr] = useState(true);

	

	const checkForWinner = (squares) => {

		if(squares[0]!==''&&squares[0]===squares[1]&&squares[1]===squares[2]) setWinner(squares[0])
		else if(squares[3]!==''&&squares[3]===squares[4]&&squares[4]===squares[5]) setWinner(squares[3])
		else if(squares[6]!==''&&squares[6]===squares[7]&&squares[7]===squares[8]) setWinner(squares[6])
		
		else if(squares[0]!==''&&squares[0]===squares[3]&&squares[3]===squares[6]) setWinner(squares[0])
		else if(squares[1]!==''&&squares[1]===squares[4]&&squares[4]===squares[7]) setWinner(squares[1])
		else if(squares[2]!==''&&squares[2]===squares[5]&&squares[5]===squares[8]) setWinner(squares[2])
		
		else if(squares[0]!==''&&squares[0]===squares[4]&&squares[4]===squares[8]) setWinner(squares[0])
		else if(squares[2]!==''&&squares[2]===squares[4]&&squares[4]===squares[6]) setWinner(squares[2])
	};

	const startGame = () => {
		let squares = [...cells];
		if(turn==='r'){
			comMove(squares);
			setTurn('b');
		}
		setCells(squares);
		setStr(false);
	}

	const handleClick = (num) => {
		if (cells[num] !== '') {
			alert('already clicked');
			return;
		}

		let squares = [...cells];

		if (turn === 'b') {
			squares[num] = 'b';
			setTurn('r');
			comMove(squares);
			setTurn('b');
		} else {
			squares[num] = 'r';
			setTurn('b');
		}

		checkForWinner(squares);
		setCells(squares);
	};

	const handleRestart = () => {
		setWinner('');
		setCells(Array(row_count*col_count).fill(''));
		setTurn('b');
		setStr(true);
	};

	const Cell = ({ num }) => {
		return <td onClick={() => handleClick(num)}><span className={cells[num]} /></td>;
	};

    var t = 0;

	return (
		<div className='container'>
		{str && <button onClick={() => startGame()}>Start</button>}
		{!str && <button onClick={() => handleRestart()}>Restart Game</button>}
		{!str && (turn==='r'?<p>Computer's Move</p>:<p>Your Move</p>)}
			<table>
				<tbody>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
					</tr>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
						
					</tr>
					<tr>
						<Cell num={t++} />
						<Cell num={t++} />
						<Cell num={t++} />
					</tr>
				</tbody>
			</table>
			{winner && (
				<>
					<p>{winner} is the winner!</p>
					<button onClick={() => handleRestart()}>Play Again</button>
				</>
			)}
		</div>
	);
};

export default Board;