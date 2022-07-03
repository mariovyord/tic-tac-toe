const NewGameButton = ({ handleRestartGame }) => {
	return <button className="new-game-button" onClick={() => handleRestartGame()}>New Game</button>
}

export default NewGameButton;