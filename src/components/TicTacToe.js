import { useState } from 'react';
import History from './History';
import Winner from './Winner';
import Cell from './Cell';
import NewGameButton from './NewGameButton'

export default function TicTacToe(props) {

	const [turn, setTurn] = useState('x')
	const [winner, setWinner] = useState(undefined);
	const [history, setHistory] = useState([Array(9).fill(undefined)]);
	const [step, setStep] = useState(0);
	const [winningSquares, setWinningSquares] = useState(Array(9).fill(false));

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
				const win = [...winningSquares];
				win[combo[0]] = true;
				win[combo[1]] = true;
				win[combo[2]] = true;
				setWinningSquares(win);
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
		setWinningSquares(Array(9).fill(false));
		setWinner(undefined);
		setHistory([Array(9).fill(undefined)]);
		setStep(0);
	}

	return (
		<div className='game'>
			<h1>Tic Tac Toe</h1>
			<h2>Turn: {turn}</h2>
			<table>
				<tbody>
					<tr>
						<Cell isWinning={winningSquares} current={history[step]} handleClick={handleClick} num={0} />
						<Cell isWinning={winningSquares} current={history[step]} handleClick={handleClick} num={1} />
						<Cell isWinning={winningSquares} current={history[step]} handleClick={handleClick} num={2} />
					</tr>
					<tr>
						<Cell isWinning={winningSquares} current={history[step]} handleClick={handleClick} num={3} />
						<Cell isWinning={winningSquares} current={history[step]} handleClick={handleClick} num={4} />
						<Cell isWinning={winningSquares} current={history[step]} handleClick={handleClick} num={5} />
					</tr>
					<tr>
						<Cell isWinning={winningSquares} current={history[step]} handleClick={handleClick} num={6} />
						<Cell isWinning={winningSquares} current={history[step]} handleClick={handleClick} num={7} />
						<Cell isWinning={winningSquares} current={history[step]} handleClick={handleClick} num={8} />
					</tr>
				</tbody>
			</table>
			<div className='menu'>
				{winner && <Winner winner={winner} />}
				<NewGameButton handleRestartGame={handleRestartGame} />
				<h3>History:</h3>
				<History historyArray={history} handleHistoryJump={handleHistoryJump} />
			</div>
		</div>
	)
}