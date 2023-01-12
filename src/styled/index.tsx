import styled from 'styled-components';
import { IStyled } from './IStyled';

export const Page = styled.div<IStyled>`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const Navbar = styled.div<IStyled>`
    height: 130px;
    width: 100%;    
    background-color: #acacac;
    filter: drop-shadow(5px 5px 10px black);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const NavbarIcon = styled.div<IStyled>`
    width: 105px;
    height: 105px;
    border: 10px solid #cccccc;
    border-top: 10px solid white;
    border-left: 10px solid white;
    background-color: #dddddd;
    cursor: pointer;
    &:hover {
        border: 10px solid #999999;
        border-top: 10px solid #cccccc;
        border-left: 10px solid #cccccc;
        background-color: grey;
    }
`;

export const NavbarIconImage = styled.img<IStyled>`
    width: 105px;
    height: 105px;
`;

export const NavbarBars = styled.div<IStyled>`
    color: grey;
    font-weight: bolder;
    font-size: 3em;
    position: absolute;
    top: 30px;
    left: 25px;
    cursor: pointer;
    &:hover {
        color: white;
    }
`;

export const SideMenu = styled.div<IStyled>`
    height: 100%;
    width: 30%;
    min-width: 300px;
    position: absolute;
    top: 130px;
    left: -3000px;
    background-color: #dddddd;
`;

export const Content = styled.div<IStyled>`
    margin-top: 10px;
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const Footer = styled.div<IStyled>`
    height: 30px;
    background-color: #121212;
    color: white;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

//Board
export const Board = styled.table<IStyled>`
    background-color: black;
`

export const BoardRow = styled.tr<IStyled>`
`

export const BoardTile = styled.td<IStyled>`
    width: 50px;
    height: 50px;
    cursor: pointer;
    text-align: center;
    ${props => props.hide ? `
        border: 5px solid #cccccc;
        border-top: 5px solid white;
        border-left: 5px solid white;
        background-color: #dddddd;
        &:hover {
            border: 5px solid #999999;
            border-top: 5px solid #cccccc;
            border-left: 5px solid #cccccc;
            background-color: grey;
        }
    ` : `
        background-color: #bbbbbb;
        border: 5px solid #bbbbbb;
    `}
`;

export const Tile = styled.span<IStyled>`
    width: 100%;
    height: 100%;
    color: ${props => props.color ? props.color : "black"};
    font-size: 1.5em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;