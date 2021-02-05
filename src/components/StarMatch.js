import React, {useState, useEffect} from 'react';
// STAR MATCH - V3

const StarsDisplay = props => (
  <>
    {utils.range(1, props.count).map(starId => (
      <div key={starId} className="star" />
    ))}
  </>
);

const PlayNumber = props => (
	<button 
  	className="number"
    style={{ backgroundColor: colors[props.status] }}
    onClick={() => props.onClick(props.number, props.status)}
  >
    {props.number}
  </button>
);

const PlayAgain = props => (
  <div className="game-done">
    <div className="message" style={{ color: props.gameStatus === 'lost' ? 'red' : 'green'}}>
      {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
    </div>
    <button onClick={props.onClick}>Play Again</button>
  </div>
)


const Game = (props) => {
	const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCanditateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  
  useEffect(() => {
    if(secondsLeft > 0 && availableNums.length > 0){
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      //every time the component rerender itself, we will remove the previous timer & introduce a new timer. 
      //This way we will be sure that there will be no timer conflicts. 
      return () => clearTimeout(timerId);
    }
    // This will run every time when component is done rendering.
    // console.log('done');
    // Component is changing & component is going to rerender. 
    // return () => {
    //   console.log('This compnfjkvnk')
    // }
  });
  
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  // const gameIsWon = availableNums.length ===0;
  // const gameIsLost = secondsLeft === 0;
  const gameStatus = availableNums.length ===0 
  ? 'won'
  :  secondsLeft === 0? 'lost' : 'active';

  //To play again u just need to do restet state to initial 
  const resetGame = () =>{
    setStars(utils.random(1, 9));
    setAvailableNums(utils.range(1, 9));
    setCanditateNums([]);
    setSecondsLeft(10);
  }

  
  const numberStatus = (number) => {
    //A number is used if it's not avaibleNumbers
  	if (!availableNums.includes(number)) {
    	return 'used';
    }
    //If number is in availableNumber array , check if it's a candidate
      //That means number could be either a correct candidate or wrong candidate
      //candidate means we'r still playing & wrong means we picked candidate, but they are wrong.
    if (candidateNums.includes(number)) {
    	return candidatesAreWrong ? 'wrong': 'candidate';
    }
    //If the number is used & it's not candidate, it is an availbleNumber
    return 'available';
  };

  const onNumberClick = (number, currentStatus) =>{
    //based on the current status number 
    //if current stats of number is used, we can't do anything here.
    if(gameStatus !== 'active'|| currentStatus == 'used'){
      return;
    }
    //If current number is not used, then we need to make it into a candidate number
    const newCandidateNums = 
    currentStatus === 'available' 
    ? candidateNums.concat(number)
    : candidateNums.filter(cn => cn !== number);
    //Logic is do we have an exact pick or not?
    if(utils.sum(newCandidateNums) != stars){
      setCanditateNums(newCandidateNums);
    }
    //else the sum of newCandidateNums equals the count of stars. We have correct pick All candidateNums should be marked as used
    //They should e remoed from the availble numbers array. 
    //JS filter will give us access to each availble numbers 
    else{
      const newAvailbleNums = availableNums.filter(
        //Is the availble nuber included new candidate number 
        n => !newCandidateNums.includes(n)
      );
      //Redraw stars (fro what's available). we can only redraw number that are playable.We can't pick any number of stars
      setStars(utils.randomSumIn(newAvailbleNums, 9));
      setAvailableNums(newAvailbleNums);
      setCanditateNums([]);
    };
  }
  
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
					{gameStatus !== 'active' ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/>
          ) : (
            <StarsDisplay count={stars}/>
          )}
        </div>
        <div className="right">
        	{utils.range(1, 9).map(number =>
          	<PlayNumber 
            	key={number} 
              status={numberStatus(number)}
              number={number} onClick={onNumberClick}
            />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

const StarMatch = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>
}

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export default StarMatch;