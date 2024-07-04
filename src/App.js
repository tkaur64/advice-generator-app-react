import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [advice, setAdvice] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async function () {
    try {
      setIsLoading(true);
      const result = await fetch("https://api.adviceslip.com/advice");
      const data = await result.json();
      setAdvice({ ...data.slip });
    } catch {
      setAdvice({ id: 0, advice: "No advice could be generated." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(function () {
    fetchData();
  }, []);
  return (
    <div className="advice-generator-container">
      {isLoading ? (
        <div className="advice-generator--advice">Loading...</div>
      ) : (
        <>
          <p className="advice-generator--header">{`ADVICE #${advice.id}`}</p>
          <p className="advice-generator--advice">{`"${advice.advice}"`}</p>
          <div className="pattern-divider-icon--container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 444 16">
              <g fill="none" fill-rule="evenodd">
                <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
                <g transform="translate(212)" fill="#CEE3E9">
                  <rect width="6" height="16" rx="3" />
                  <rect x="14" width="6" height="16" rx="3" />
                </g>
              </g>
            </svg>
          </div>
          <div className="dice-icon--container" onClick={() => fetchData()}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                fill="#202733"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
