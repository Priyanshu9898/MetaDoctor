import React from "react";
import Heading from "../../components/Heading";
import ConversationPage from "./components/ConversationPage";

const CareCompanion = () => {
  return (
    <>
      <Heading
        imageIcon={"/Images/Sidebar/bot.png"}
        title={"Care Companion Bot"}
        description={"Chat with our advanced Medical Bot and plan out your health routine."}
      />

      <ConversationPage />

    </>
  );
};

export default CareCompanion;
