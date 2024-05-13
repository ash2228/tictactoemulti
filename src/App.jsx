import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function App() {
  let [player,setPlayer] = useState(undefined);
  let [sign,setSign] = useState();
  let [turn,setTurn] = useState(false);
  useEffect(()=>{
    player = io("http://13.232.124.81:3002/")
    setPlayer(player)
    console.log(player)
    player.on("sign",(sig)=>{
      sign = sig
      setSign(sig);
      if(sig=="X"){
        turn = true
      }
    })
    player.on("TURN",(e)=>{
      if(e==sign){
        turn = true
        console.log(e)
      }
    })
    player.on("CHANGE",(pos,sig)=>{
      let change = document.getElementById(pos);
      change.innerHTML = sig
    })
    document.addEventListener("click",(e)=>{
      if(e.target.id && !e.target.innerHTML && turn){
        e.target.innerHTML = sign;
        checkWin()
        turn = false;
        player.emit("changeTurn",sign=="X"?"O":"X",e.target.id,sign);
      }
    })
  },[])
  useEffect(()=>{
    console.log(sign)
  },[sign])
  const checkWin = () => {
    const lines = [
      ["one", "two", "three"],
      ["four", "five", "siz"],
      ["seven", "eight", "nine"],
      ["one", "four", "seven"],
      ["two", "five", "eight"],
      ["three", "siz", "nine"],
      ["one", "five", "nine"],
      ["three", "five", "seven"],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        document.getElementById(a).innerHTML &&
        document.getElementById(a).innerHTML ===
          document.getElementById(b).innerHTML &&
        document.getElementById(a).innerHTML ===
          document.getElementById(c).innerHTML
      ) {
        alert(`Player ${document.getElementById(a).innerHTML} wins!`);
        return;
      }
    }
  
    // Check for draw
    const squares = ["one", "two", "three", "four", "five", "siz", "seven", "eight", "nine"];
    let draw = true;
    for (let i = 0; i < squares.length; i++) {
      if (!document.getElementById(squares[i]).innerHTML) {
        draw = false;
        break;
      }
    }
    if (draw) alert("It's a draw!");
  };
  
  return (
    <>
    <div className="grid h-[500px] w-[500px] m-auto mt-20 grid-flow-row grid-cols-3">
      <div className=""><div className="border-t-0 border-l-0 absolute h-[167px] w-[167px] text-8xl ml-[50px] mt-[50px] border-2" id="one"></div></div>
      <div className=""><div className="border-t-0 absolute h-[167px] w-[167px] text-8xl ml-[50px] mt-[50px] border-2" id="two"></div></div>
      <div className=""><div className="border-t-0 border-r-0 absolute h-[167px] w-[167px] text-8xl ml-[50px] mt-[50px] border-2" id="three"></div></div>
      <div className=""><div className="border-l-0 absolute h-[167px] w-[167px] text-8xl ml-[50px] mt-[50px] border-2" id="four"></div></div>
      <div className=""><div className="absolute h-[167px] w-[167px] text-8xl ml-[50px] mt-[50px]" id="five"></div></div>
      <div className=""><div className="border-r-0 absolute h-[167px] w-[167px] text-8xl ml-[50px] mt-[50px] border-2" id="siz"></div></div>
      <div className=""><div className="border-b-0 border-l-0 absolute h-[167px] w-[167px] text-8xl ml-[50px] border-2 mt-[50px]" id="seven"></div></div>
      <div className=""><div className="border-b-0 absolute h-[167px] w-[167px] text-8xl ml-[50px] mt-[50px] border-2" id="eight"></div></div>
      <div className=""><div className="border-b-0 border-r-0 border-l-0 absolute h-[167px] w-[167px] text-8xl ml-[50px] border-2 mt-[50px]" id="nine"></div></div>
    </div>
    </>
  );
}
