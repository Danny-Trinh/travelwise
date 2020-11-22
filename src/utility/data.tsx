import React from "react";
import Danny from "../images/Danny.jpg";
import Mitchell from "../images/Mitchell.jpg";
import Max from "../images/Maximus.jpg";
import Jesse from "../images/Jesse.jpg";
import Adam from "../images/Adam.jpg";
import dockerIcon from "../images/dockerIcon.png";
import postmanIcon from "../images/postmanIcon.png";
import reactIcon from "../images/reactIcon.png";
import bootstrapIcon from "../images/bootstrapIcon.png";
import yarnIcon from "../images/yarnIcon.jpg";
import gitlabIcon from "../images/gitlabIcon.png";
import slackIcon from "../images/slackIcon.png";
import amplifyIcon from "../images/amplifyIcon.png";
import { FaCity, FaHeartbeat, FaPlane, FaGlobe } from "react-icons/fa";

// used to render members list on about page
export const members = [
  {
    name: "Mitchell Watkins",
    gitlab: "mitchellwatkins125",
    image: Mitchell,
    desc: "You can't code away all your problems in life ~_~",
    jobs: "Back-End Developer",
    tests: 0,
    email: "mitchellwatkins125@gmail.com",
    linkedin: "https://www.linkedin.com/in/mawatkins99",
  },
  {
    name: "Dung Trinh",
    gitlab: "Danny-Trinh",
    image: Danny,
    desc:
      "Danny started out wanting to do advanced AI research, he now cries on every React project he works on.",
    jobs: "Project Lead",
    tests: 0,
    email: "dtrinh403@yahoo.com",
    linkedin: "https://www.linkedin.com/in/dan-trinh/",
  },
  {
    name: "Jesse Huang",
    gitlab: "jessehuang",
    image: Jesse,
    desc:
      "Jesse also started out interested in Ai, he now would like to make cool phone games.",
    jobs: "Back-End Developer",
    tests: 0,
    email: "jesse17huang@gmail.com",
    linkedin: "https://www.linkedin.com/in/jesse-huang-a1877b192/",
  },
  {
    name: "Maximus Chu",
    gitlab: "maximuschu",
    image: Max,
    desc:
      "Maximus is a 3rd Year CS Major and is a valuable member to have on any team.",
    jobs: "Front-End Developer",
    tests: 0,
    email: "maximuschu@utexas.edu",
    linkedin: "https://www.linkedin.com/in/maximuschu/",
  },
  {
    name: "Adam Gluch",
    gitlab: "amgluch",
    image: Adam,
    desc:
      "Hi! I'm a senior. I find joy in the little things like cleaning, basking in fresh air, or 12-hour debugging sessions.",
    jobs: "Back-End Developer",
    tests: 0,
    email: "adammgluch@gmail.com",
    linkedin: "",
  },
];

export const apiSources = [
  {
    icon: <FaCity className="mr-2 t-teal-700" />,
    header: "City Names",
    link:
      "https://rapidapi.com/wirefreethought/api/geodb-cities?endpoint=5990a0b4e4b075a0d1d6da26",
  },
  {
    icon: <FaHeartbeat className="mr-2 t-teal-700" />,
    header: "Safety Stats",
    link:
      "https://developers.amadeus.com/self-service/category/destination-content/api-doc/safe-place-api/api-reference",
  },
  {
    icon: <FaGlobe className="mr-2 t-teal-700" />,
    header: "CO-VID 19 Stats",
    link: "https://documenter.getpostman.com/view/10808728/SzS8rjbc",
  },
  {
    icon: <FaPlane className="mr-2 t-teal-700" />,
    header: "Flight Information",
    link:
      "https://developers.amadeus.com/self-service/category/air/api-doc/flight-offers-search/api-reference",
  },
];

// used to list apps on about page
export const apps = [
  {
    link: "https://www.docker.com/",
    pic: dockerIcon,
    header: "Docker",
    text:
      ": Creates a docker image that packages our tool-chain and" +
      " dependencies into one container.",
  },
  {
    link: "https://www.postman.com/",
    pic: postmanIcon,
    header: "Postman",
    text: ": Streamlines the creation and management of our API's",
  },
  {
    link: "https://reactjs.org/",
    pic: reactIcon,
    header: "React",
    text:
      ": Javascript Library developed by Facebook that modernizes website rendering.",
  },
  {
    link: "https://getbootstrap.com/",
    pic: bootstrapIcon,
    header: "Bootstrap",
    text:
      ": Bootstrap is a extensive CSS framework and is used as our primary CSS data.",
  },
  {
    link: "https://classic.yarnpkg.com/en/",
    pic: yarnIcon,
    header: "Yarn",
    text:
      ": Yarn makes documenting and installing our dependencies streamlined.",
  },
  {
    link: "https://gitlab.com/",
    pic: gitlabIcon,
    header: "GitLab",
    text:
      ": GitLab is a web-based DevOps lifecycle tool that provides a Git-repository manager",
  },
  {
    link: "https://slack.com/",
    pic: slackIcon,
    header: "Slack",
    text:
      ": We've integrated slack to our GitLab repo, for communication purposes and issue tracking.",
  },
  {
    link: "https://aws.amazon.com/amplify/",
    pic: amplifyIcon,
    header: "AWS Amplify",
    text:
      ": AWS Amplify allows us to host websites by simply committing and pushing code to our Git Repository.",
  },
];

export const pageViewOptions = [
  // used for page rendering
  { value: 3, text: "3" },
  { value: 9, label: "9" },
  { value: 18, label: "18" },
  { value: 36, label: "36" },
  { value: 72, label: "72" },
];

export const citySortOptions = [
  // used for sorting
  { value: 1, label: "City" },
  { value: 2, label: "Country" },
  { value: 3, label: "Region" },
  { value: 4, label: "Overall" },
  { value: 5, label: "LGBTQ" },
  { value: 6, label: "Medical" },
  { value: 7, label: "Physical Harm" },
  { value: 8, label: "Political Freedom" },
  { value: 9, label: "Theft" },
  { value: 10, label: "Women" },
];

export const cityOrderOptions = [
  // used for ordering sorting
  { value: 1, label: "Ascending" },
  { value: -1, label: "Descending" },
];

export const cityFilterOptions = [
  // used for filtering
  { value: "Argentina", label: "Argentina" },
  { value: "Brazil", label: "Brazil" },
  { value: "Canada", label: "Canada" },
  { value: "Colombia", label: "Colombia" },
  { value: "Egypt", label: "Egypt" },
  { value: "Ethiopia", label: "Ethiopia" },
  { value: "France", label: "France" },
  { value: "Germany", label: "Germany" },
  { value: "India", label: "India" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Iran", label: "Iran" },
  { value: "Italy", label: "Italy" },
  { value: "Japan", label: "Japan" },
  { value: "Mexico", label: "Mexico" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "People's Republic of China", label: "People's Republic of China" },
  { value: "Philippines", label: "Philippines" },
  { value: "Russia", label: "Russia" },
  { value: "South Africa", label: "South Africa" },
  { value: "South Korea", label: "South Korea" },
  { value: "Spain", label: "Spain" },
  { value: "Thailand", label: "Thailand" },
  { value: "Turkey", label: "Turkey" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States of America", label: "United States of America" },
  { value: "Vietnam", label: "Vietnam" },
];

export const airportSortOptions = [
  //used for sort
  { value: 1, label: "Airport" },
  { value: 2, label: "Airport Code" },
  { value: 3, label: "City" },
  { value: 4, label: "Country" },
  { value: 5, label: "Latitude" },
  { value: 6, label: "Longitude" },
  { value: 7, label: "Timezone" },
];

export const airportOrderOptions = [
  // used for ordering sort
  { value: 1, label: "Ascending" },
  { value: -1, label: "Descending" },
];

export const airportFilterOptions = [
  //used for filtering
  { value: "ARGENTINA", label: "Argentina" },
  { value: "BAHAMAS", label: "Bahamas" },
  { value: "BRAZIL", label: "Brazil" },
  { value: "CAMBODIA", label: "Cambodia" },
  { value: "CANADA", label: "Canada" },
  { value: "CHILE", label: "Chile" },
  { value: "CHINA", label: "China" },
  { value: "COLOMBIA", label: "Colombia" },
  { value: "COSTA RICA", label: "Costa Rica" },
  { value: "CUBA", label: "Cuba" },
  { value: "EGYPT", label: "Egypt" },
  { value: "EL SALVADOR", label: "El Salvador" },
  { value: "ETHIOPIA", label: "Ethiopia" },
  { value: "FRANCE", label: "France" },
  { value: "GERMANY", label: "Germany" },
  { value: "GREECE", label: "Greece" },
  { value: "INDIA", label: "India" },
  { value: "INDONESIA", label: "Indonesia" },
  { value: "IRAN", label: "Iran" },
  { value: "ITALY", label: "Italy" },
  { value: "JAPAN", label: "Japan" },
  { value: "MALAYSIA", label: "Malaysia" },
  { value: "MEXICO", label: "Mexico" },
  { value: "NEW ZEALAND", label: "New Zealand" },
  { value: "NIGERIA", label: "Nigeria" },
  { value: "PAKISTAN", label: "Pakistan" },
  { value: "PAPUA NEW GUINEA", label: "Papua New Guinea" },
  { value: "PHILIPPINES", label: "Philippines" },
  { value: "RUSSIA", label: "Russia" },
  { value: "SAUDI ARABIA", label: "Saudi Arabia" },
  { value: "SOUTH AFRICA", label: "South Africa" },
  { value: "KOREA REPUBLIC OF", label: "South Korea" },
  { value: "SPAIN", label: "Spain" },
  { value: "THAILAND", label: "Thailand" },
  { value: "TURKEY", label: "Turkey" },
  { value: "UKRAINE", label: "Ukraine" },
  { value: "UNITED KINGDOM", label: "United Kingdom" },
  { value: "UNITED STATES OF AMERICA", label: "United States of America" },
  { value: "VENEZUELA", label: "Venezuela" },
  { value: "VIETNAM", label: "Vietnam" },
];

export const covidSortOptions = [
  // used for sort
  { value: 1, label: "Country" },
  { value: 2, label: "Country Code" },
  { value: 3, label: "New Cases" },
  { value: 4, label: "Total Cases" },
  { value: 5, label: "New Deaths" },
  { value: 6, label: "Total Deaths" },
];

export const covidOrderOptions = [
  // used for ordering sort
  { value: 1, label: "Ascending" },
  { value: -1, label: "Descending" },
];

export const covidFilterOptions = [
  //used for filtering
  { value: ["new_cases", 0], label: "New Cases > 0" },
  { value: ["new_cases", 100], label: "New Cases > 100" },
  { value: ["new_cases", 100], label: "New Cases > 1000" },
  { value: ["new_deaths", 0], label: "New Deaths > 0" },
  { value: ["new_deaths", 100], label: "New Deaths > 100" },
  { value: ["total_cases", 0], label: "Total Cases > 0" },
  { value: ["total_cases", 100], label: "Total Cases > 100" },
  { value: ["total_cases", 1000], label: "Total Cases > 1000" },
  { value: ["total_cases", 10000], label: "Total Cases > 10000" },
  { value: ["total_cases", 100000], label: "Total Cases > 100000" },
  { value: ["total_deaths", 0], label: "Total Deaths > 0" },
  { value: ["total_deaths", 100], label: "Total Deaths > 100" },
  { value: ["total_deaths", 1000], label: "Total Deaths > 1000" },
  { value: ["total_deaths", 10000], label: "Total Deaths > 10000" },
  { value: ["total_deaths", 100000], label: "Total Deaths > 100000" },
];
