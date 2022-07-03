const Cell = ({ num, current, handleClick }) => {
	return <td onClick={() => handleClick(num)}><span>{current[num]}</span></td>
}

export default Cell;