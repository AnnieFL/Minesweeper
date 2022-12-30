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
    background: grey;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const NavbarIcon = styled.div<IStyled>`
    width: 120px;
    height: 120px;
    border: 1px solid black;
`;

export const Content = styled.div<IStyled>`
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
    border: 1px solid black;
    border-collapse: collapse;
`

export const BoardRow = styled.tr<IStyled>`
    border: 1px solid black;
    border-collapse: collapse;
`

export const BoardTile = styled.td<IStyled>`
    border: 1px solid black;
    border-collapse: collapse;
    width: 50px;
    height: 50px;
    cursor: pointer;
    text-align: center;
    &:hover {
        background-color: grey;
    }
`;

export const Tile = styled.span<IStyled>`
    width: 100%;
    height: 100%;
    background-color: ${props => props.background ? props.background : "white"};
    color: ${props => props.color ? props.color : "black"};
    font-size: 1.5em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;