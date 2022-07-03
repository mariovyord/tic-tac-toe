import './TicTacToe.css';
import { useState } from 'react';

export default function TicTacToe(props) {

	const [turn, setTurn] = useState('x')
	const [winner, setWinner] = useState(undefined);
	const [history, setHistory] = useState([Array(9).fill(undefined)]);
	const [step, setStep] = useState(0);

	const checkForWinner = (squares) => {
		const combos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let combo of combos) {
			if (squares[combo[0]] === undefined || squares[combo[1]] === undefined || squares[combo[2]] === undefined) {
			} else if (squares[combo[0]] === squares[combo[1]] && squares[combo[1]] === squares[combo[2]]) {
				return setWinner(squares[combo[0]])
			}
		}
	}

	const handleHistoryJump = (step) => {
		setStep(step);
	}

	const handleClick = (num) => {
		const current = history[step];

		if (step !== (history.length - 1)) return;

		if (current[num] !== undefined || winner !== undefined) return;

		let squares = [...current];
		if (turn === 'x') {
			squares[num] = 'x';
			setTurn('o');
		} else {
			squares[num] = 'o';
			setTurn('x');
		}

		const newHistory = history.slice(0)
		newHistory.push(squares);
		setHistory(newHistory);
		setStep(() => (step + 1))
		checkForWinner(squares);
	}

	const handleRestartGame = () => {
		setWinner(undefined);
		setHistory([Array(9).fill(undefined)]);
		setStep(0);
	}

	const Cell = ({ num }) => {
		const current = history[step];
		return <td onClick={() => handleClick(num)}>{current[num]}</td>
	}

	const Winner = ({ winner }) => {
		return (
			<>
				<h2>The Winner is: {winner}</h2>
			</>
		)
	}

	const NewGameButton = () => {
		return <button onClick={() => handleRestartGame()}>New Game</button>
	}

	const History = ({ historyArray }) => {
		return (
			<div>
				{historyArray.slice(1).map((x, i) => <button onClick={() => handleHistoryJump(i)} key={i}>Turn {i + 1}</button>)}
			</div>
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
			<NewGameButton />
			<History historyArray={history} />
		</div>
	)
}