import styled from 'styled-components'

export const Container = styled.main`
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
`
export const Header = styled.header`
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const GitHub = styled.a`
  display: inline-block;
  color: #d8ecf6;
  font-size: 16px;
  border-radius: 4rem;
  background: #5878f3;
  width: 140px;
  height: 24px;
  padding: 10px 0;
  text-align: center;
  text-decoration: none;
  -webkit-box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);

  &:hover {
    background: #6684f4;
    color: #e4f2f9;
  }
`
export const Table = styled.table`
  width: 100%;
  height: 100px;

  th {
    text-align: left;
    padding: 0 10px;
  }

  tbody {
    background-color: #fff;
    &:nth-child(2n) {
      background-color: #eeeeee;
    }
  }
`
export const TableBody = styled.tbody`
  height: ${props => props.totalSize}px;
  width: 100%;
  position: relative;
`
export const TableRow = styled.tr`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.size}px;
  transform: translateY(${props => props.start}px);
`
