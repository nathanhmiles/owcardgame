import BoardRow from './BoardRow';
import data from 'data';

export default function PlayerBoard(props) {
  
  // id 1f == player 1 front row. m == middle b == back
  let rows = data.rows;

  // TODO: This implementation is awful, abstract and consolidate
  if (props.playerNum === 2) {
    return (
      <div id="player2board" className="board">
        <BoardRow setCardFocus={props.setCardFocus} playerNum={props.playerNum} label={rows['2b'].label} id={rows['2b'].id} key={rows['2b'].id} />
        <BoardRow setCardFocus={props.setCardFocus} playerNum={props.playerNum} label={rows['2m'].label} id={rows['2m'].id} key={rows['2m'].id} />
        <BoardRow setCardFocus={props.setCardFocus} playerNum={props.playerNum} label={rows['2f'].label} id={rows['2f'].id} key={rows['2f'].id} />
      </div>
    );
  } else if (props.playerNum === 1) {
    return (
      <div id="player1board" className="board">
        <BoardRow setCardFocus={props.setCardFocus} playerNum={props.playerNum} label={rows['1f'].label} id={rows['1f'].id} key={rows['1f'].id} />
        <BoardRow setCardFocus={props.setCardFocus} playerNum={props.playerNum} label={rows['1m'].label} id={rows['1m'].id} key={rows['1m'].id} />
        <BoardRow setCardFocus={props.setCardFocus} playerNum={props.playerNum} label={rows['1b'].label} id={rows['1b'].id} key={rows['1b'].id} />
      </div>
    );
  }
}