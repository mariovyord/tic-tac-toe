const Cell = ({ num, current, handleClick, isWinning }) => {
	return <td className={isWinning[num] ? 'winning-cell' : ''} onClick={() => handleClick(num)}><span>{current[num]}</span></td>
}

export default Cell;