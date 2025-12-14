const _handleFilters = function (filters, allJobs) {
  console.log(filters);
  const { dept, exp, country } = filters;
  return allJobs.filter((job) => {
    // 1) Department
    if (dept && dept !== "All Departments") {
      if (job.department.id != dept) return false;
    }

    // 2) Experience
    if (exp && exp !== "Experience") {
      if (!job.experienceLevel.label.includes(exp)) return false;
    }

    // 3) Country
    if (country && country !== "Country") {
      if (!job.location.country.includes(country)) return false;
    }

    return true;
  });

  /*
Logica: 
1. 
get a a key and a value (string separated by space) -> 
-> transform that string in a string separated by "-" ->
-> check if the key exists in the url params ->
-> if the value is All Departments for that key, then delete the parameter ->
-> if the value is something else, then change the key to that value and update the parameter ->
-> if the key is not in the url, add the key to the url 

2. read the url ->
-> identify the value ->
-> filter the list if based on that value ->
-> return the updated list ->
-> if the value is empty return all the items from the list

  */
};

export { _handleFilters };
