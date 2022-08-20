import styled from "styled-components";

export const SButton = styled.button`
  background-color: ${({ background }) => background};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  border: 0;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  margin-top: 16px;
  transition: 0.3s;
  letter-spacing: 0.05em;
  font-family: inherit;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }

  :disabled {
    background-color: #dcdcdc;
  }
`;

// export default Button;
