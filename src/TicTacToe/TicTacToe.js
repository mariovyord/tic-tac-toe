import './TicTacToe.css';
import { useState } from 'react';

export default function TicTacToe(props) {

	const [turn, setTurn] = useState('x')
	const [cells, setCells] = useState(Array(9).fill(undefined));
	const [winner, setWinner] = useState(undefined);

	const checkForWinner = (squares) => {
		const combos = {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8]
			],
			down: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8]
			],
			diagonal: [
				[0, 4, 8],
				[2, 4, 6],
			]
		};

		for (let i in combos) {
			combos[i].forEach(pattern => {
				if (squares[pattern[0]] === undefined || squares[pattern[1]] === undefined || squares[pattern[2]] === undefined) {
					return undefined;
				} else if (squares[pattern[0]] === squares[pattern[1]] && squares[pattern[1]] === squares[pattern[2]]) {
					return setWinner(squares[pattern[0]])
				}
			});
		}
	}

	const handleClick = (num) => {
		if (cells[num] !== undefined || winner !== undefined) return;

		let squares = [...cells];
		if (turn === 'x') {
			squares[num] = 'x';
			setTurn('o');
		} else {
			squares[num] = 'o';
			setTurn('x');
		}

		checkForWinner(squares);
		setCells(() => squares);
	}

	const handleRestartGame = () => {
		setWinner(undefined);
		setCells(Array(9).fill(undefined));
	}

	const Cell = ({ num }) => {
		return <td onClick={() => handleClick(num)}>{cells[num]}</td>
	}

	const Winner = ({ winner }) => {
		return (
			<>
				<h2>The Winner is: {winner}</h2>
				<button onClick={() => handleRestartGame()}>New Game</button>
			</>
		)
	}

	return (
		<div className='container'>
			<div>Turn: {turn}</div>
			<div>
				<table>
					<tbody>
						<tr>
							<Cell num={0} />
							<Cell num={1} />
							<Cell num={2} />
						</tr>
						<tr>
							<Cell num={3} />
							<Cell num={4} />
							<Cell num={5} />
						</tr>
						<tr>
							<Cell num={6} />
							<Cell num={7} />
							<Cell num={8} />
						</tr>
					</tbody>
				</table>
			</div>
			{winner && <Winner winner={winner} />}
		</div>
	)
}