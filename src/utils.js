const removeLocalUserProfiles = () => {
  localStorage.removeItem("questions");
  localStorage.removeItem("currentQuestionIdx");
  localStorage.removeItem("currentCoverQuestionIdx");
  localStorage.removeItem("currentCoverQuestionIdx");
  localStorage.removeItem("activeColor");
  localStorage.removeItem("template");
  localStorage.removeItem("currentQuestion");
  localStorage.removeItem("resumeOptionModalShown");
};

export { removeLocalUserProfiles };
