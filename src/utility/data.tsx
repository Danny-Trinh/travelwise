export const pageViewOptions = [
  // used for page rendering
  { value: 3, label: "3" },
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
  { value: 1, label: "null" },
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
  { value: "Columbia", label: "Columbia" },
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
  { value: "COLUMBIA", label: "Columbia" },
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

const sortOptions = [
  // used for sort
  { value: 1, label: "Country" },
  { value: 2, label: "Country Code" },
  { value: 3, label: "New Cases" },
  { value: 4, label: "Total Cases" },
  { value: 5, label: "New Deaths" },
  { value: 6, label: "Total Deaths" },
];

const orderOptions = [
  // used for ordering sort
  { value: 1, label: "Ascending" },
  { value: -1, label: "Descending" },
];

const filterOptions = [
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
