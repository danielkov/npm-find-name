import React, { useState, useCallback } from "react";
import logo from "./Npm-logo.svg";
import styled, { css } from "styled-components";
import { StickyContainer, Sticky } from "react-sticky";

import useFetch from "./useFetch";
import conditional from "./conditional";
import Result from "./Result";

const AppContainer = styled(StickyContainer)`
  text-align: center;
  position: relative;
  display: initial;
`;

const AppLogo = styled.img`
  height: 18vmin;
`;

const AppText = styled.p`
  color: var(--text-color);
`;

const InfoLink = styled.a`
  text-decoration: none;
`;

const AppInput = styled.input`
  font-size: calc(10px + 2vmin);
  background: rgba(255, 255, 255, 0.1);
  border: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 8px 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out;
  color: var(--input-color);
  :focus {
    outline: none;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  }
  ::placeholder {
    color: var(--placeholder-color);
  }
`;

const HeaderContent = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
`;

const AppHeader = styled.header`
  display: flex;
  justify-content: center;
  background: var(--background-color);
  transition: all 0.2s ease-in-out;
  transition-property: box-shadow, background-color;
  ${conditional(
    "hasResults",
    css`
      padding: 8px 12px;
      ${AppText} {
        display: none;
      }
      ${AppLogo} {
        height: 50px;
        margin-right: 20px;
      }
      ${AppInput} {
        font-size: calc(6px + 2vmin);
        background: none;
        box-shadow: none;
        flex: 1;
      }
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    `,
    css`
      min-height: 100vh;
      font-size: calc(10px + 2vmin);
      color: white;
      ${InfoLink} {
        display: none;
      }
      ${HeaderContent} {
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    `
  )}
`;

const AppResults = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

type WordResult = {
  word: string;
  score: number;
  tags: string[];
};

const App: React.FC = () => {
  const [search, setSearch] = useState("");
  const { data, loading, error } = useFetch<WordResult[]>(
    `https://api.datamuse.com/words?ml=${search}`
  );
  const hasResult: boolean = !!(data && data.length);
  const handleChange = useCallback(e => setSearch(e.target.value), []);
  return (
    <AppContainer>
      <Sticky>
        {({ style, distanceFromTop }) => {
          console.log({ distanceFromTop });
          return (
            // @ts-ignore
            <AppHeader
              // @ts-ignore
              hasResults={hasResult}
              style={{
                ...style,
                ...(distanceFromTop !== 0
                  ? {}
                  : { background: "transparent", boxShadow: "none" })
              }}
            >
              <HeaderContent>
                <AppLogo src={logo} />
                <AppText>Find your next package name</AppText>
                <AppInput
                  type="text"
                  placeholder="Start typing..."
                  value={search}
                  onChange={handleChange}
                />
                <InfoLink href="https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages">
                  ℹ️
                </InfoLink>
              </HeaderContent>
            </AppHeader>
          );
        }}
      </Sticky>
      <AppResults>
        {data &&
          !!data.length &&
          [{ word: search }, ...data].map(({ word }) => (
            <Result key={word} word={word} />
          ))}
      </AppResults>
    </AppContainer>
  );
};

export default App;
