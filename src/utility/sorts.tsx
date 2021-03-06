// used to sort Provider's Location Data
export function locationsSort(sortInput: number, data: any) {
  let sortedData;
  switch (sortInput) {
    case 2:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return obj2["Population"] - obj1["Population"];
      });
      break;
    case 1:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return obj1.State.localeCompare(obj2.State);
      });
      break;
  }
  return sortedData;
}

// used to sort out Covid Data
export function covidSort(sortInput: number, reverse: number, data: any) {
  let sortedData;
  switch (sortInput) {
    case 1:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * obj1.country[0].localeCompare(obj2.country[0]);
      });
      break;
    case 2:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return (
          reverse * obj1.country_code[0].localeCompare(obj2.country_code[0])
        );
      });
      break;
    case 3:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.new_cases - obj2.new_cases);
      });
      break;
    case 4:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.total_cases - obj2.total_cases);
      });
      break;
    case 5:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.new_deaths - obj2.new_deaths);
      });
      break;
    case 6:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.total_deaths - obj2.total_deaths);
      });
      break;
  }
  return sortedData;
}

// used to sort our Airport Data
export function airportSort(sortInput: number, reverse: number, data: any) {
  let sortedData;
  switch (Math.abs(sortInput)) {
    case 1:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return (
          reverse * obj1.airport_name[0].localeCompare(obj2.airport_name[0])
        );
      });
      break;
    case 2:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * obj1.iata_code[0].localeCompare(obj2.iata_code[0]);
      });
      break;
    case 3:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * obj1.city_name[0].localeCompare(obj2.city_name[0]);
      });
      break;
    case 4:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return (
          reverse * obj1.country_name[0].localeCompare(obj2.country_name[0])
        );
      });
      break;
    case 5:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.latitude - obj2.latitude);
      });
      break;
    case 6:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.longitude - obj2.longitude);
      });
      break;
    case 7:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * obj1.time_offset[0].localeCompare(obj2.time_offset[0]);
      });
      break;
  }
  return sortedData;
}

// used to sort our City Data
export function citySort(sortInput: number, reverse: number, data: any) {
  let sortedData;
  switch (Math.abs(sortInput)) {
    case 1:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * obj1.name[0].localeCompare(obj2.name[0]);
      });
      break;
    case 2:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * obj1.country[0].localeCompare(obj2.country[0]);
      });
      break;
    case 3:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * obj1.region[0].localeCompare(obj2.region[0]);
      });
      break;
    case 4:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.overall - obj2.overall);
      });
      break;
    case 5:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.lgbtq - obj2.lgbtq);
      });
      break;
    case 6:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.medical - obj2.medical);
      });
      break;

    case 7:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.physical - obj2.physical);
      });
      break;
    case 8:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.political - obj2.political);
      });
      break;
    case 9:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.theft - obj2.theft);
      });
      break;
    case 10:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj1.women - obj2.women);
      });
      break;
  }
  return sortedData;
}
