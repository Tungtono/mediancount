import { useState } from "react";

function App() {
  const [isSentence, setIsSentence] = useState(true);
  const [character, setCharacter] = useState("");
  const [textInput, setTextInput] = useState("");
  const [medianCount, setMedianCount] = useState(0);

  const splitDoc = (str, isSentence) => {
    if (isSentence) return str.split(/\r?\n|[.]/);
    return str.split(/\r?\n/);
  };

  const splitIntoWords = (str) => {
    return str.split(" ");
  };

  const charCountFromArr = (arr, a) => {
    const tempArr = arr.filter((item) => item.includes(a));
    return tempArr.length;
  };

  function median(arr) {
    const half = Math.floor(arr.length / 2);
    arr.sort((a, b) => a - b);
    if (arr.length % 2) return arr[half];
    return (arr[half - 1] + arr[half]) / 2;
  }

  const findMedianCount = (inputDoc, a, sentence) => {
    const resultArr = [];
    const countUnit = splitDoc(inputDoc, sentence);
    countUnit.forEach((item) => {
      const wordArr = splitIntoWords(item);
      const count = charCountFromArr(wordArr, a);
      if (count) {
        resultArr.push(count);
      }
    });
    return median(resultArr);
  };

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleRangeChange = () => {
    setIsSentence((prevState) => !prevState);
  };

  const handleCharacterChange = (e) => {
    setCharacter(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMedianCount = findMedianCount(textInput, character, isSentence);
    setMedianCount(newMedianCount);
  };

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          rows={5}
          onChange={(e) => handleTextChange(e)}
          required
        ></textarea>
        <label htmlFor="character">
          Target Character
          <input
            name="character"
            type="text"
            onChange={(e) => handleCharacterChange(e)}
            required
          ></input>
        </label>
        <label htmlFor="isSentence">
          Check on sentence?
          <input
            name="isSentence"
            type="checkbox"
            defaultChecked={isSentence}
            onChange={() => handleRangeChange()}
          ></input>
        </label>
        <button type="submit">Check</button>
      </form>
      <div>The Median Count is: {medianCount}</div>
    </div>
  );
}

export default App;