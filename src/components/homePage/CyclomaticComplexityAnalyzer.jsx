import React, { useState } from "react";

const calculateCyclomaticComplexity = (code) => {
  // Regular expression to match conditional statements and function declarations
  const complexityRegex =
    /(if|else\s+if|else|for|while|switch|\bfunction\b|[a-zA-Z_$][\w$]*)/g;

  // Extract complexity elements from the code
  const complexityMatches = code.match(complexityRegex) || [];
  const complexity = complexityMatches.length;

  return complexity;
};

const getBigOComplexity = (code) => {
  // Simplified logic for demonstration purposes
  const complexityKeywords = ["for", "while", "if", "else", "switch", "case"];

  const lines = code.split("\n");
  let complexity = 1; // Default complexity

  lines.forEach((line) => {
    complexityKeywords.forEach((keyword) => {
      if (line.includes(keyword)) {
        // Increase complexity for each occurrence of a complexity keyword
        complexity++;
      }
    });
  });

  return complexity;
};

const CodeAnalyzer = () => {
  const [code, setCode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [consoleErrors, setConsoleErrors] = useState("");
  const [consoleWarning, setConsoleWarning] = useState("");
  const [complexity, setComplexity] = useState(null);
  const [bigoNotation, setBigoNotation] = useState(null);

  const analyzeCode = () => {
    const calculatedComplexity = calculateCyclomaticComplexity(code);
    const calculatedBioNotation = getBigOComplexity(code);
    setComplexity(calculatedComplexity);
    setBigoNotation(calculatedBioNotation);
  };

  const runCode = () => {
    try {
      // Clear previous console output
      setConsoleOutput("");
      setConsoleErrors("");
      setConsoleWarning("");

      // Override console.log to capture the output
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarning = console.warn;

      console.log = (...args) =>
        setConsoleOutput((prev) => prev + args.join(" ") + "\n");
      console.error = (error) =>
        setConsoleErrors((prev) => prev + `Error: ${error}\n`);
      console.warn = (warn) =>
        setConsoleWarning((prev) => prev + `Warning: ${warn}\n`);

      // Run the code
      eval(code);

      // Restore the original console.log
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarning;
    } catch (error) {
      // Handle errors during code execution
      setConsoleErrors(`Runtime Error: ${error.message}`);
    }
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <button
        onClick={() => {
          analyzeCode();
          runCode();
        }}>
        Analyze Complexity
      </button>
      <br />
      {complexity !== null && <div>Cyclomatic Complexity: {complexity}</div>}
      {bigoNotation !== null && <div>Big O Notation: O(n^{bigoNotation})</div>}
      <div>
        <strong>Console Output:</strong>
        <textarea readOnly value={consoleOutput} rows={10} cols={50} />
      </div>
      <div>
        <strong>Console Errors:</strong>
        <textarea readOnly value={consoleErrors} rows={5} cols={50} />
      </div>
      <div>
        <strong>Console Warning:</strong>
        <textarea readOnly value={consoleWarning} rows={5} cols={50} />
      </div>
    </div>
  );
};

export default CodeAnalyzer;
