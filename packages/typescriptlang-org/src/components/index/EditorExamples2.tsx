import React, { useState } from "react";

import { indexCopy } from "../../copy/en/index2";
import { createInternational } from "../../lib/createInternational";
import { useIntl } from "react-intl";
import { Code as ShowErrorsExample } from "./twoslash/generated/showErrors";
import { Code as ReactExample } from "./twoslash/generated/react";
import { Code as TypeDefinitionsExample } from "./twoslash/generated/typeDefinitions";
import { Code as InterfaceExample } from "./twoslash/generated/interface";

export const EditorExamples = () => {
  const i = createInternational<typeof indexCopy>(useIntl());

  // Controls which story we should show
  const [index, setIndex] = useState(0);

  console.log({ index })

  const explanations = [
    "TypeScript validates your JavaScript ahead of time",
    "Provides auto-complete for untyped libraries",
    "Describe the shape of objects and functions",
    "Supports rich type-checking in JSX environments like React",
  ];

  const loadIndex = (index: number) => { setIndex(index);  return false };

  const next = (e) => {
    if (index + 1 === explanations.length) loadIndex(0);
    else loadIndex(index + 1);

    e.preventDefault();
    return false;
  };

  const goto = (index: number) => (e) => {
    
     loadIndex(index);

    e.preventDefault();
    return false;
  };

  const Tabs = () => (
    <ul className="editor-tabs"> 
      <li className={index === 0 ? "selected" : ""} ><a href="#" onClick={() => goto(0)  }>{i("index_2_tab_1")}</a></li>
      <li className={index === 1 ? "selected" : ""} ><a href="#" onClick={() => goto(1)  }>{i("index_2_tab_2")}</a></li>
      <li className={index === 2 ? "selected" : ""} ><a href="#" onClick={() => goto(2)  }>{i("index_2_tab_3")}</a></li>
      <li className={index === 3 ? "selected" : ""} ><a href="#" onClick={() => goto(3)  }>{i("index_2_tab_4")}</a></li>
      <li className={index === 4 ? "selected" : ""} ><a href="#" onClick={() => goto(4)  }>{i("index_2_tab_5")}</a></li>
    </ul>
  )

   return (
    <div className="headline-diagram">
      <div className="slides">

      <div className="editor ts front">
        <Tabs />
        <div className="content">
            <div className="text">
            {{
              0: (
                <ShowErrorsExample />
              ),
              1: (
                <TypeDefinitionsExample />
              ),
              2: (
                <InterfaceExample />
              ),
              3: (
              <ReactExample />
              ),
            }[index]}
            </div>
          </div>
        </div>

      </div>
      <div className="button-container">
        <a
          className="next-headline-button"
          href="#"
          onClick={next}
          role="presentation"
        >
          <div className="message">{explanations[index]}</div>
          <div className="next">
            <p>Next</p>
            <p style={{ margin: 0 }}>
              <svg
                width="11"
                height="15"
                viewBox="0 0 11 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 14.5V0.5L10.5 7L0 14.5Z" fill="white" />
              </svg>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};
