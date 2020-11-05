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
        return reverse * (obj2.latitude - obj1.latitude);
      });
      break;
    case 6:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj2.longitude - obj1.longitude);
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
        return reverse * (obj2.overall - obj1.overall);
      });
      break;
    case 5:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj2.lgbtq - obj1.lgbtq);
      });
      break;
    case 6:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj2.medical - obj1.medical);
      });
      break;

    case 7:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj2.physical - obj1.physical);
      });
      break;
    case 8:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj2.political - obj1.political);
      });
      break;
    case 9:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj2.theft - obj1.theft);
      });
      break;
    case 10:
      sortedData = data.sort((obj1: any, obj2: any) => {
        return reverse * (obj2.women - obj1.women);
      });
      break;
  }
  return sortedData;
}
