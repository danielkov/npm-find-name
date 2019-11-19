import React from "react";
import useFetch from "./useFetch";
import styled, { css } from "styled-components";
import conditional from "./conditional";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type PackageResult = {
  package: {
    name: string;
    flags: { unstable: boolean };
    highlight: string;
    author: { name: string; email: string; username: string };
    date: string;
    description: string;
    links: {
      homepage: string;
      npm: string;
      repository: string;
    };
    maintainers: { username: string; email: string }[];
    publisher: { username: string; email: string };
    scope: string;
    version: string;
  };
  score: {
    detail: {
      maintenance: number;
      popularity: number;
      quality: number;
    };
    final: number;
  };
  searchScore: number;
};

const ResultContainer = styled.article`
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 240px;
  background: var(--content-background-color);
  padding: 12px 20px;
  margin-bottom: 20px;
  border-radius: 6px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const PackageName = styled.h2`
  ${conditional(
    "available",
    css`
      color: #00c642;
    `,
    css`
      color: #cb3837;
    `
  )}
`;

const PackageDescription = styled.p`
  hyphens: auto;
`;

const Bar = ({ score, name }: { score: number; name: string }) => (
  <CircularProgressbar
    value={score}
    maxValue={1}
    text={name}
    styles={buildStyles({
      pathColor: `rgba(203, 56, 55, ${score / 1})`,
      textColor: "var(--text-color)",
      trailColor: "transparent"
    })}
  />
);

const BarContainer = styled.div`
  height: 50px;
  display: flex;
`;

const Result = ({ word }: { word: string }) => {
  const packageName = word.replace(" ", "-");
  const { data, loading, error } = useFetch<PackageResult[]>(
    `https://api.npms.io/v2/search/suggestions?q=${packageName}&size=1`
  );

  if (error || loading || !data) {
    return (
      <ResultContainer>
        <h2>{packageName}</h2>
      </ResultContainer>
    );
  }

  const available =
    !loading && !!data && (!data.length || data[0].package.name !== word);

  if (available) {
    return (
      <ResultContainer>
        {/* 
  // @ts-ignore */}
        <PackageName available>{packageName} ✅</PackageName>
      </ResultContainer>
    );
  }
  const {
    package: { name, description },
    score: {
      detail: { quality, popularity, maintenance },
      final
    }
  } = data![0];
  return (
    <ResultContainer>
      <PackageName>{name}</PackageName>
      <PackageDescription>{description}</PackageDescription>
      {!available && data && data[0].score && (
        <BarContainer>
          <Bar score={maintenance} name="M" />
          <Bar score={popularity} name="P" />
          <Bar score={quality} name="Q" />
          <Bar score={final} name="F" />
        </BarContainer>
      )}
    </ResultContainer>
  );
};

export default Result;
