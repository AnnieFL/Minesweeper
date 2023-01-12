import { Board, BoardRow, BoardTile, Content, Navbar, NavbarBars, NavbarIcon, NavbarIconImage, Page, SideMenu, Tile } from "./styled";
import React, { useEffect, useState } from "react";
import { IMinePosition, IBoardTiles } from "./interfaces";

export default function App() {
  const verticalTiles = 10;
  const horizontalTiles = 10;
  const mineAmount = 10;
  const tileColors = [
    { tile: "", color: "#FFFFFF", background: "#DDDDDD" },
    { tile: 1, color: "#0000FF", background: "#FFFFFF" },
    { tile: 2, color: "#2200DD", background: "#FFFFFF" },
    { tile: 3, color: "#4400BB", background: "#FFFFFF" },
    { tile: 4, color: "#660099", background: "#FFFFFF" },
    { tile: 5, color: "#880077", background: "#FFFFFF" },
    { tile: 6, color: "#AA0055", background: "#FFFFFF" },
    { tile: 7, color: "#CC0033", background: "#FFFFFF" },
    { tile: 8, color: "#EE0011", background: "#FFFFFF" },
    { tile: "!", color: "#FF9900", background: "#FFFFFF" },
    { tile: "*", color: "#FF0000", background: "#FFFFFF" },
  ]
  
  const [boardTiles, setBoardTiles] = useState<IBoardTiles[][]>([]);
  const [minePos, setMinePos] = useState<IMinePosition[]>([]);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [state, setState] = useState<"playing" | "win" | "lose" | "reset">("playing");

  useEffect(() => {
    if (state === "reset") {
      setState("playing");
    }
    
    if (state === "playing") {
      setMinePos([]);
      loadTiles();
    }
  }, [state])

  useEffect(() => {
    checkFirstTile();
  }, [minePos])

  const loadTiles = () => {
    setBoardTiles([...Array(verticalTiles)].map((element, index) => [...Array(horizontalTiles)].map((el, i) => ({ x: i, y: index, hidden: true, flagged: false }))));
  }

  const loadMines = (firstTile: IBoardTiles) => {
    const mines: IMinePosition[] = [];
    let tooManyMines = mineAmount > horizontalTiles * verticalTiles - 1;

    [...Array(mineAmount)].map(() => {
      if (tooManyMines) {
        return ({});
      }

      let posX = Math.floor(Math.random() * horizontalTiles);
      let posY = Math.floor(Math.random() * verticalTiles);

      let notAllowed: IMinePosition | undefined = mines.find((position) => position.x === posX && position.y === posY);

      for (; ((notAllowed) || (boardTiles[posY][posX].hidden === false));) {
        posX = Math.floor(Math.random() * horizontalTiles);
        posY = Math.floor(Math.random() * verticalTiles);

        notAllowed = mines.find((position) => position.x === posX && position.y === posY);
      }

      if (tooManyMines) {
        return alert("Too many mines!!");
      }
      mines.push({ x: posX, y: posY });
    })

    if (tooManyMines) {
      return setMinePos([{ x: -1, y: -1 }]);
    }
    setMinePos(mines);
  }

  const countMines = (posX: number, posY: number) => {
    let counter = 0;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (minePos.find((position) => position.x === posX + x && position.y === posY + y)) {
          counter++;
        }
      }
    }

    return counter ? counter : "";
  }

  const revealTile = (posX: number, posY: number) => {
    let tiles = boardTiles;

    if (!tiles[posY][posX] || tiles[posY][posX].hidden === false) {
      return;
    }

    tiles[posY][posX].hidden = false;

    setBoardTiles(tiles);
    setMoveCount(moveCount + 1);

    if (!minePos[0]) {
      loadMines(tiles[posY][posX]);
    } else if (!countMines(posX, posY)) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (posX + x !== horizontalTiles && posY + y !== verticalTiles && posX + x >= 0 && posY + y >= 0) {
            revealTile(posX + x, posY + y,);
          }
        }
      }
    }

    if (minePos.find((position) => position.x === posX && position.y === posY)) {
      lose();
      alert("Boom!")
      return;
    }

    checkVictory();
  }

  const flagTile = (posX: number, posY: number, event: any) => {
    event.preventDefault();
    let tiles = boardTiles;

    if (!tiles[posY][posX]) {
      return;
    }

    tiles[posY][posX].flagged = !tiles[posY][posX].flagged;

    setBoardTiles(tiles);
    setMoveCount(moveCount + 1);
  }

  const checkFirstTile = () => {
    const tile = boardTiles.find((row) => row.find((tile) => tile.hidden === false));

    if (tile) {

      const posX = tile.find((el) => el.hidden === false)?.x;
      const posY = tile.find((el) => el.hidden === false)?.y;

      if (posX !== undefined && posY !== undefined) {
        if (!countMines(posX, posY)) {
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              if (posX + x !== horizontalTiles && posY + y !== verticalTiles && posX + x >= 0 && posY + y >= 0) {
                revealTile(posX + x, posY + y);
              }
            }
          }
        }
      }
    }
  }

  const lose = () => {
    const tiles = boardTiles;

    minePos.map((mine) => {
      tiles[mine.y][mine.x].hidden = false;
    })

    setBoardTiles(tiles);
    setState("lose");
  }

  const checkVictory = () => {
    let counter = 0;

    boardTiles.map((row) => row.map((tile) => {
      if (tile.hidden === true) {
        counter++;
      }
    }));

    if (counter === mineAmount) {
      setState("win");
      return alert("Victory!");
    }
  }
  return (
    <Page>
      <Navbar>
        <NavbarBars>☰</NavbarBars>
        <NavbarIcon onClick={() => setState("reset")}>
          <NavbarIconImage src={'/smily_classic.png'} />
        </NavbarIcon>
      </Navbar>      

      <SideMenu>

      </SideMenu>

      <Content>
        <Board>
          {boardTiles.map((row, rowIndex) => (
            <BoardRow key={rowIndex}>
              {row.map((tile, tileIndex) => (
                <BoardTile
                  hide={tile.hidden}
                  onClick={() => state === "playing" && tile.flagged === false && tile.hidden === true ? revealTile(tileIndex, rowIndex) : {}}
                  onContextMenu={(event) => state === "playing" && tile.hidden === true ? flagTile(tileIndex, rowIndex, event) : {}}
                >
                  {!tile.hidden &&
                    <React.Fragment key={rowIndex}>
                      {minePos.find((position: IMinePosition) => (position.x === tileIndex && position.y === rowIndex)) &&
                        <Tile
                          color={tileColors.find((til) => til.tile === "*")?.color}
                          background={tileColors.find((til) => til.tile === "*")?.background}
                        >
                          {tile.flagged ? "O" : tileColors.find((til) => til.tile === "*")?.tile}
                        </Tile>
                      }
                      {!minePos.find((position: IMinePosition) => (position.x === tileIndex && position.y === rowIndex)) &&
                        <Tile
                          color={tileColors.find((til) => til.tile === countMines(tileIndex, rowIndex))?.color}
                          background={tileColors.find((til) => til.tile === countMines(tileIndex, rowIndex))?.background}
                        >
                          {tileColors.find((til) => til.tile === countMines(tileIndex, rowIndex))?.tile}
                        </Tile>
                      }
                    </React.Fragment>
                  }
                  {tile.hidden && tile.flagged &&
                    <Tile
                      color={tileColors.find((til) => til.tile === "!")?.color}
                      background={tileColors.find((til) => til.tile === "!")?.background}
                    >
                      {state === "lose" ? "X" : tileColors.find((til) => til.tile === "!")?.tile}
                    </Tile>
                  }
                </BoardTile>
              ))}
            </BoardRow>
          ))}
        </Board>
      </Content>
    </Page>
  );
}
