//ALINHAR IMAGEM DO FINALISTA

import {
  createRankEntities,
  createTeamsEntities,
  setPlaces,
  setRandomWinners,
  setRoundOf8Phase,
  setSemifinal,
  setFinal,
  setChampion,
  checkFields,
  setAllRandomWinners,
  shareResults,
  campaign,
} from "./Scripts/Functions.js";

const teamContainerEntities = createTeamsEntities();
const rankContainerEntities = createRankEntities();

setInterval(function () {
  checkFields();
  shareResults();
}, 500);

teamContainerEntities.forEach((team) => {
  team.inputs.forEach(function (input) {
    input.addEventListener("click", function (ev) {
      setPlaces(teamContainerEntities, rankContainerEntities, team, input);
    });
  });
});

document.querySelectorAll(".group-container").forEach(function (group) {
  group.querySelectorAll(".random-winners-btn").forEach(function (button) {
    button.addEventListener("click", function (ev) {
      setRandomWinners(teamContainerEntities, rankContainerEntities, group);
    });
  });
});

document.querySelectorAll(".flag-img-playoffs-16").forEach(function (img) {
  img.addEventListener("click", function (ev) {
    setRoundOf8Phase(img);
  });
});
document.querySelectorAll(".flag-img-playoffs-8").forEach(function (img) {
  img.addEventListener("click", function (ev) {
    setSemifinal(img);
  });
});
document.querySelectorAll(".flag-img-playoffs-4").forEach(function (img) {
  img.addEventListener("click", function (ev) {
    setFinal(img);
  });
});
document.querySelectorAll(".flag-img-playoffs-2").forEach(function (img) {
  img.addEventListener("click", function (ev) {
    setChampion(img, teamContainerEntities);
  });
});

document.getElementById("restart").addEventListener("click", function () {
  window.location.reload();
});

document.getElementById("fill").addEventListener("click", function () {
  setAllRandomWinners(teamContainerEntities, rankContainerEntities);
});

document.getElementById("share").addEventListener("click", function () {
  campaign(teamContainerEntities);
});
