import React from 'react';
import styled,{createGlobalStyle} from 'styled-components';

const Wrapper = styled.div`
    color: red;
`;
const GlobalStyle = createGlobalStyle`
    body {
        background: blue;
        color: red;
    }
`;
const App:React.FC = () => {
    return (
        <React.Fragment>
            <GlobalStyle/>
            <Wrapper>hello world!</Wrapper>
        </React.Fragment>
    );
}

export default App;